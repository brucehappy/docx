import { BaseXmlComponent, XmlComponent } from "file/xml-components";
import { DocumentAttributes } from "../document/document-attributes";
import { DocumentDefaults } from "./defaults";
import { CharacterStyle, ParagraphStyle } from "./style";
export * from "./border";

export class Styles extends XmlComponent {
    constructor(initialStyles?: BaseXmlComponent) {
        super("w:styles");
        if (initialStyles) {
            this.root.push(initialStyles);
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
    }

    public push(style: XmlComponent): Styles {
        this.root.push(style);
        return this;
    }

    public createDocumentDefaults(): DocumentDefaults {
        const defaults = new DocumentDefaults();
        this.push(defaults);
        return defaults;
    }

    public createParagraphStyle(styleId: string, name?: string): ParagraphStyle {
        const paragraphStyle = new ParagraphStyle(styleId, name);
        this.push(paragraphStyle);
        return paragraphStyle;
    }

    public createCharacterStyle(styleId: string, name?: string): CharacterStyle {
        const characterStyle = new CharacterStyle(styleId, name);
        this.push(characterStyle);
        return characterStyle;
    }
}
