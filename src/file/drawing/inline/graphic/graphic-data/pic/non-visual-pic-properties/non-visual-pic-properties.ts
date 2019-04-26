import { IMediaData } from "file/media";
import { XmlComponent } from "file/xml-components";
import { ChildNonVisualProperties } from "./child-non-visual-pic-properties/child-non-visual-pic-properties";
import { NonVisualProperties } from "./non-visual-properties/non-visual-properties";

export class NonVisualPicProperties extends XmlComponent {
    constructor(mediaData: IMediaData) {
        super("pic:nvPicPr");

        this.root.push(new NonVisualProperties(mediaData));
        this.root.push(new ChildNonVisualProperties());
    }
}
