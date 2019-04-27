import { HyperlinkOnClick } from "file/drawing/links";
import { IMediaData } from "file/media";
import { XmlComponent } from "file/xml-components";
import { NonVisualPropertiesAttributes } from "./non-visual-properties-attributes";

export class NonVisualProperties extends XmlComponent {
    constructor(mediaData: IMediaData) {
        super("pic:cNvPr");

        this.root.push(
            new NonVisualPropertiesAttributes({
                id: "uId{pic:cNvPr}",
                name: mediaData.name,
                descr: mediaData.description,
            }),
        );
    }

    public addHyperlinkOnClick(hyperlinkOnClick: HyperlinkOnClick): void {
        this.root.push(hyperlinkOnClick);
    }
}
