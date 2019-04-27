import { HyperlinkOnClick } from "file/drawing/links";
import { IMediaData } from "file/media";
import { XmlComponent } from "file/xml-components";
import { ChildNonVisualProperties } from "./child-non-visual-pic-properties/child-non-visual-pic-properties";
import { NonVisualProperties } from "./non-visual-properties/non-visual-properties";

export class NonVisualPicProperties extends XmlComponent {
    private readonly nonVisualProperties: NonVisualProperties;

    constructor(mediaData: IMediaData) {
        super("pic:nvPicPr");

        this.nonVisualProperties = new NonVisualProperties(mediaData);

        this.root.push(this.nonVisualProperties);
        this.root.push(new ChildNonVisualProperties());
    }

    public addHyperlinkOnClick(hyperlinkOnClick: HyperlinkOnClick): void {
        this.nonVisualProperties.addHyperlinkOnClick(hyperlinkOnClick);
    }
}
