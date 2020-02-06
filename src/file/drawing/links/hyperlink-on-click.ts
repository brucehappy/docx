import { XmlComponent } from "file/xml-components";
import { HyperlinkOnClickAttributes, IHyperlinkOnClickAttributesProperties } from "./hyperlink-on-click-attributes";

export class HyperlinkOnClick extends XmlComponent {
    public readonly linkId: string;

    constructor(relationshipId: string) {
        super("a:hlinkClick");

        this.linkId = relationshipId;

        const props: IHyperlinkOnClickAttributesProperties = {
            id: `rId${this.linkId}`,
            xmlns: "http://schemas.openxmlformats.org/drawingml/2006/main",
        };

        const attributes = new HyperlinkOnClickAttributes(props);
        this.root.push(attributes);
    }
}
