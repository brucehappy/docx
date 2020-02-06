import { IMediaData } from "file/media";
import { HyperlinkRef } from "file/paragraph";
import { XmlComponent } from "file/xml-components";
import { ChildNonVisualProperties } from "./child-non-visual-pic-properties/child-non-visual-pic-properties";
import { NonVisualProperties } from "./non-visual-properties/non-visual-properties";

export class NonVisualPicProperties extends XmlComponent {
    constructor(mediaData: IMediaData, hyperlinkOnClick?: HyperlinkRef) {
        super("pic:nvPicPr");

        this.root.push(new NonVisualProperties(mediaData, hyperlinkOnClick));
        this.root.push(new ChildNonVisualProperties());
    }
}
