import { HyperlinkRef } from "file/paragraph";
import { IDrawingOptions } from "../drawing";
import { IMediaData } from "../media";
import { Paragraph } from "./paragraph";
import { IRunOptions, PictureRun } from "./run";

export class ImageParagraph extends Paragraph {
    private readonly pictureRun: PictureRun;

    constructor(imageData: IMediaData, drawingOptions?: IDrawingOptions, hyperlinkOnClick?: HyperlinkRef, runOptions?: IRunOptions) {
        super({});
        this.pictureRun = new PictureRun(imageData, drawingOptions, hyperlinkOnClick, runOptions);
        this.root.push(this.pictureRun);
    }

    public scale(factorX: number, factorY?: number): void {
        this.pictureRun.scale(factorX, factorY);
    }

    public get Run(): PictureRun {
        return this.pictureRun;
    }
}
