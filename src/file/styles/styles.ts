import { BaseXmlComponent, ImportedXmlComponent, XmlComponent } from "file/xml-components";
import { DocumentAttributes } from "../document/document-attributes";
import { CharacterStyle, ParagraphStyle } from "./style";
import { ICharacterStyleOptions } from "./style/character-style";
import { IParagraphStyleOptions } from "./style/paragraph-style";
export * from "./border";

export interface IStylesOptions {
    readonly initialStyles?: BaseXmlComponent;
    readonly paragraphStyles?: IParagraphStyleOptions[];
    readonly characterStyles?: ICharacterStyleOptions[];
    readonly importedStyles?: Array<XmlComponent | ParagraphStyle | CharacterStyle | ImportedXmlComponent>;
}

export class Styles extends XmlComponent {
    constructor(options: IStylesOptions) {
        super("w:styles");

        if (options.initialStyles) {
            this.root.push(options.initialStyles);
        } else {
            this.root.push(
                new DocumentAttributes({
                    mc: "http://schemas.openxmlformats.org/markup-compatibility/2006",
                    r: "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
                    w: "http://schemas.openxmlformats.org/wordprocessingml/2006/main",
                    w14: "http://schemas.microsoft.com/office/word/2010/wordml",
                    w15: "http://schemas.microsoft.com/office/word/2012/wordml",
                    Ignorable: "w14 w15",
                }),
            );
        }

        if (options.importedStyles) {
            for (const style of options.importedStyles) {
                this.root.push(style);
            }
        }

        if (options.paragraphStyles) {
            for (const style of options.paragraphStyles) {
                this.root.push(new ParagraphStyle(style));
            }
        }

        if (options.characterStyles) {
            for (const style of options.characterStyles) {
                this.root.push(new CharacterStyle(style));
            }
        }
    }
}
