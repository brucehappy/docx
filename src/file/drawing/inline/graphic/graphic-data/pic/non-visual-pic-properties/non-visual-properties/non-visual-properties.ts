import { File } from "file";
import { IMediaData } from "file/media";
import { HyperlinkRef } from "file/paragraph";
import { IXmlableObject, XmlComponent } from "file/xml-components";
import { NonVisualPropertiesAttributes } from "./non-visual-properties-attributes";

export class NonVisualProperties extends XmlComponent {
    constructor(mediaData: IMediaData, hyperlinkOnClick?: HyperlinkRef) {
        super("pic:cNvPr");

        this.root.push(
            new NonVisualPropertiesAttributes({
                id: "uId{pic:cNvPr}",
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
