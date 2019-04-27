import { HyperlinkOnClick } from "file/drawing/links";
import { IMediaData } from "file/media";
import { XmlComponent } from "file/xml-components";
import { DocPropertiesAttributes } from "./doc-properties-attributes";

export class DocProperties extends XmlComponent {
    constructor(mediaData: IMediaData) {
        super("wp:docPr");

        this.root.push(
            new DocPropertiesAttributes({
                id: "uId{wp:docPr}",
                name: mediaData.name,
                descr: mediaData.description,
            }),
        );
    }

    public addHyperlinkOnClick(hyperlinkOnClick: HyperlinkOnClick): void {
        this.root.push(hyperlinkOnClick);
    }
}
