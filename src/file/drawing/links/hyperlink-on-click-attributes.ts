import { XmlAttributeComponent } from "file/xml-components";

export interface IHyperlinkOnClickAttributesProperties {
    readonly id?: string;
    readonly xmlns?: string;
}

export class HyperlinkOnClickAttributes extends XmlAttributeComponent<IHyperlinkOnClickAttributesProperties> {
    protected readonly xmlKeys = {
        id: "r:id",
        xmlns: "xmlns:a",
    };
}
