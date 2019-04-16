import { HyperlinkOnClick } from "file/drawing/links";
import { XmlComponent } from "file/xml-components";
import { NonVisualPropertiesAttributes } from "./non-visual-properties-attributes";

export class NonVisualProperties extends XmlComponent {
    constructor() {
        super("pic:cNvPr");

        this.root.push(
            new NonVisualPropertiesAttributes({
                id: 0,
                name: "",
                descr: "",
            }),
        );
    }

    public addHyperlinkOnClick(hyperlinkOnClick: HyperlinkOnClick): void {
        this.root.push(hyperlinkOnClick);
    }
}
