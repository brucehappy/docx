import { HyperlinkRef } from "file/paragraph";
import { Drawing } from "../../drawing";
import { IDrawingOptions } from "../../drawing/drawing";
import { IMediaData } from "../../media/data";
import { Run } from "../run";

export class PictureRun extends Run {
    private readonly drawing: Drawing;

    constructor(imageData: IMediaData, drawingOptions?: IDrawingOptions, hyperlinkOnClick?: HyperlinkRef) {
        super({});

        this.drawing = new Drawing(imageData, drawingOptions, hyperlinkOnClick);

        this.root.push(this.drawing);
    }

    public scale(factorX: number = 1, factorY: number = factorX): void {
        this.drawing.scale(factorX, factorY);
    }
}
