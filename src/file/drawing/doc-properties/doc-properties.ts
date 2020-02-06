import { File } from "file";
import { IMediaData } from "file/media";
import { HyperlinkRef } from "file/paragraph";
import { IXmlableObject, XmlComponent } from "file/xml-components";
import { DocPropertiesAttributes } from "./doc-properties-attributes";

export class DocProperties extends XmlComponent {
    constructor(mediaData: IMediaData, hyperlinkOnClick?: HyperlinkRef) {
        super("wp:docPr");

        this.root.push(
            new DocPropertiesAttributes({
                id: "uId{wp:docPr}",
                name: mediaData.name,
                descr: mediaData.description,
            }),
        );

        if (hyperlinkOnClick) {
            this.root.push(hyperlinkOnClick);
        }
    }

    public prepForXml(file?: File): IXmlableObject | undefined {
        if (file) {
            this.root.forEach((element, index) => {
                if (element instanceof HyperlinkRef) {
                    this.root[index] = file.HyperlinkCache[element.id];
                }
            });
        }

        return super.prepForXml(file);
    }
}
