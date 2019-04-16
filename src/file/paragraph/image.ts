import { HyperlinkOnClick } from "file/drawing/links";
import { IDrawingOptions } from "../drawing";
import { IMediaData } from "../media";
import { Paragraph } from "./paragraph";
import { PictureRun } from "./run";

export class ImageParagraph extends Paragraph {
    private readonly pictureRun: PictureRun;

    constructor(imageData: IMediaData, drawingOptions?: IDrawingOptions) {
        super();
        this.pictureRun = new PictureRun(imageData, drawingOptions);
        this.root.push(this.pictureRun);
    }

    public addHyperlinkOnClick(hyperlinkOnClick: HyperlinkOnClick): void {
        this.pictureRun.addHyperlinkOnClick(hyperlinkOnClick);
    }

    public scale(factorX: number, factorY?: number): void {
        this.pictureRun.scale(factorX, factorY);
    }

    public get Run(): PictureRun {
        return this.pictureRun;
    }
}
