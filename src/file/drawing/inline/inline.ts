// http://officeopenxml.com/drwPicInline.php
import { HyperlinkOnClick } from "file/drawing/links";
import { IMediaData, IMediaDataDimensions } from "file/media";
import { XmlComponent } from "file/xml-components";
import { DocProperties } from "./../doc-properties/doc-properties";
import { EffectExtent } from "./../effect-extent/effect-extent";
import { Extent } from "./../extent/extent";
import { GraphicFrameProperties } from "./../graphic-frame/graphic-frame-properties";
import { Graphic } from "./../inline/graphic";
import { InlineAttributes } from "./inline-attributes";

export class Inline extends XmlComponent {
    private readonly extent: Extent;
    private readonly graphic: Graphic;
    private readonly docProperties: DocProperties;

    constructor(readonly mediaData: IMediaData, private readonly dimensions: IMediaDataDimensions) {
        super("wp:inline");

        this.root.push(
            new InlineAttributes({
                distT: 0,
                distB: 0,
                distL: 0,
                distR: 0,
            }),
        );

        this.extent = new Extent(dimensions.emus.x, dimensions.emus.y);
        this.graphic = new Graphic(mediaData, dimensions.emus.x, dimensions.emus.y);
        this.docProperties = new DocProperties(mediaData);

        this.root.push(this.extent);
        this.root.push(new EffectExtent());
        this.root.push(this.docProperties);
        this.root.push(new GraphicFrameProperties());
        this.root.push(this.graphic);
    }

    public addHyperlinkOnClick(hyperlinkOnClick: HyperlinkOnClick): void {
        this.docProperties.addHyperlinkOnClick(hyperlinkOnClick);
        this.graphic.addHyperlinkOnClick(hyperlinkOnClick);
    }

    public scale(factorX: number, factorY: number): void {
        const newX = Math.round(this.dimensions.emus.x * factorX);
        const newY = Math.round(this.dimensions.emus.y * factorY);

        this.extent.setXY(newX, newY);
        this.graphic.setXY(newX, newY);
    }
}
