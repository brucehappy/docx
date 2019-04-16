import { HyperlinkOnClick } from "file/drawing/links";
import { IMediaData } from "file/media";
import { XmlComponent } from "file/xml-components";
import { Anchor } from "./anchor";
import { IFloating } from "./floating";
import { Inline } from "./inline";

export interface IDistance {
    readonly distT?: number;
    readonly distB?: number;
    readonly distL?: number;
    readonly distR?: number;
}

export interface IDrawingOptions {
    readonly floating?: IFloating;
}

export class Drawing extends XmlComponent {
    private readonly inline?: Inline;
    private readonly anchor?: Anchor;

    constructor(imageData: IMediaData, drawingOptions: IDrawingOptions = {}) {
        super("w:drawing");

        if (!drawingOptions.floating) {
            this.inline = new Inline(imageData, imageData.dimensions);
            this.root.push(this.inline);
        } else {
            this.anchor = new Anchor(imageData, imageData.dimensions, drawingOptions);
            this.root.push(this.anchor);
        }
    }

    public addHyperlinkOnClick(hyperlinkOnClick: HyperlinkOnClick): void {
        if (this.inline) {
            this.inline.addHyperlinkOnClick(hyperlinkOnClick);
        } else if (this.anchor) {
            this.anchor.addHyperlinkOnClick(hyperlinkOnClick);
        }
    }

    public scale(factorX: number, factorY: number): void {
        if (this.inline) {
            this.inline.scale(factorX, factorY);
        }
    }
}
