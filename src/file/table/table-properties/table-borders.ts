import { BorderStyle } from "file/styles/border";
import { IXmlableObject, XmlAttributeComponent, XmlComponent } from "file/xml-components";

export class TableBorders extends XmlComponent {
    constructor() {
        super("w:tblBorders");
    }

    public prepForXml(): IXmlableObject | undefined {
        if (this.root.length > 0) {
            return super.prepForXml();
        }
    }

    public addTopBorder(style: BorderStyle, size: number, space: number, color: string): void {
        this.root.push(new TableBordersElement("w:top", style, size, space, color));
    }

    public addLeftBorder(style: BorderStyle, size: number, space: number, color: string): void {
        this.root.push(new TableBordersElement("w:left", style, size, space, color));
    }

    public addBottomBorder(style: BorderStyle, size: number, space: number, color: string): void {
        this.root.push(new TableBordersElement("w:bottom", style, size, space, color));
    }

    public addRightBorder(style: BorderStyle, size: number, space: number, color: string): void {
        this.root.push(new TableBordersElement("w:right", style, size, space, color));
    }

    public addInsideHBorder(style: BorderStyle, size: number, space: number, color: string): void {
        this.root.push(new TableBordersElement("w:insideH", style, size, space, color));
    }

    public addInsideVBorder(style: BorderStyle, size: number, space: number, color: string): void {
        this.root.push(new TableBordersElement("w:insideV", style, size, space, color));
    }
}

class TableBordersElement extends XmlComponent {
    constructor(elementName: string, style: BorderStyle, size: number, space: number, color: string) {
        super(elementName);
        this.root.push(
            new TableBordersAttributes({
                style,
                size,
                space,
                color,
            }),
        );
    }
}

class TableBordersAttributes extends XmlAttributeComponent<{
    readonly style: BorderStyle;
    readonly size: number;
    readonly space: number;
    readonly color: string;
}> {
    protected readonly xmlKeys = {
        style: "w:val",
        size: "w:sz",
        space: "w:space",
        color: "w:color",
    };
}
