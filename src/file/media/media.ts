import { IDrawingOptions } from "../drawing";
import { File } from "../file";
import { FooterWrapper } from "../footer-wrapper";
import { HeaderWrapper } from "../header-wrapper";
import { PictureRun } from "../paragraph";
import { IMediaData } from "./data";
// import { Image } from "./image";

export class Media {
    public static addImage(
        file: File | HeaderWrapper | FooterWrapper,
        data: Buffer | string | Uint8Array | ArrayBuffer,
        width?: number,
        height?: number,
        drawingOptions?: IDrawingOptions,
        name?: string,
        description?: string,
    ): PictureRun {
        // Workaround to expose id without exposing to API
        const mediaData = file.Media.addMedia(data, width, height, name, description);
        return new PictureRun(mediaData, drawingOptions);
    }

    public static addExternalImage(
        file: File | HeaderWrapper | FooterWrapper,
        externalUrl: string,
        width?: number,
        height?: number,
        drawingOptions?: IDrawingOptions,
        name?: string,
        description?: string,
    ): PictureRun {
        // Workaround to expose id without exposing to API
        const mediaData = file.Media.addExternalMedia(externalUrl, width, height, name, description);
        return new PictureRun(mediaData, drawingOptions);
    }

    private readonly map: Map<string, IMediaData>;
    private readonly mapKeys: string[];
    // tslint:disable-next-line:readonly-keyword
    private count: number = 0;

    constructor() {
        this.map = new Map<string, IMediaData>();
        this.mapKeys = [];
    }

    public getMedia(key: string): IMediaData {
        const data = this.map.get(key);

        if (data === undefined) {
            throw new Error(`Cannot find image with the key ${key}`);
        }

        return data;
    }

    public addMedia(
        data: Buffer | string | Uint8Array | ArrayBuffer,
        width: number = 100,
        height: number = 100,
        name?: string,
        description?: string,
    ): IMediaData {
        const newData = typeof data === "string" ? this.convertDataURIToBinary(data) : data;
        return this.createMedia(
            this.generateKey(name),
            {
                width: width,
                height: height,
            },
            newData,
            name,
            description,
        );
    }

    public addExternalMedia(
        externalUrl: string,
        width: number = 100,
        height: number = 100,
        name?: string,
        description?: string,
    ): IMediaData {
        return this.createMedia(
            this.generateKey(name),
            {
                width: width,
                height: height,
            },
            externalUrl,
            name,
            description,
        );
    }

    private generateKey(name?: string): string {
        return "image" + ++this.count + (((name && /[.][^.]+$/.exec(name)) || [])[0] || ".png");
    }

    private createMedia(
        key: string,
        dimensions: { readonly width: number; readonly height: number },
        data: Buffer | string | Uint8Array | ArrayBuffer,
        name?: string,
        description?: string,
    ): IMediaData {
        const imageData: IMediaData = {
            data: data,
            name: name,
            description: description,
            fileName: key,
            dimensions: {
                pixels: {
                    x: Math.round(dimensions.width),
                    y: Math.round(dimensions.height),
                },
                emus: {
                    x: Math.round(dimensions.width * 9525),
                    y: Math.round(dimensions.height * 9525),
                },
            },
        };

        const existingImageData = this.map.get(key);
        this.map.set(key, imageData);
        if (!existingImageData) {
            this.mapKeys.push(key);
        }

        return imageData;
    }

    public get Array(): IMediaData[] {
        // Cannot use a simple mapKeys.map() because of TS type inference
        // thinking the result would be Array<IMediaData | undefined>
        const array = new Array<IMediaData>();

        this.mapKeys.forEach((key) => {
            const mediaData = this.map.get(key);
            if (mediaData) {
                array.push(mediaData);
            }
        });

        return array;
    }

    private convertDataURIToBinary(dataURI: string): Uint8Array {
        // https://gist.github.com/borismus/1032746
        // https://github.com/mafintosh/base64-to-uint8array
        const BASE64_MARKER = ";base64,";

        const base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;

        if (typeof atob === "function") {
            return new Uint8Array(
                atob(dataURI.substring(base64Index))
                    .split("")
                    .map((c) => c.charCodeAt(0)),
            );
        } else {
            const b = require("buf" + "fer");
            return new b.Buffer(dataURI, "base64");
        }
    }
}
