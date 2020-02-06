export interface IMediaDataDimensions {
    readonly pixels: {
        readonly x: number;
        readonly y: number;
    };
    readonly emus: {
        readonly x: number;
        readonly y: number;
    };
}

export interface IMediaData {
    readonly data: Buffer | Uint8Array | ArrayBuffer | string;
    readonly name?: string;
    readonly description?: string;
    readonly fileName: string;
    readonly dimensions: IMediaDataDimensions;
}

// Needed because of: https://github.com/s-panferov/awesome-typescript-loader/issues/432
/**
 * @ignore
 */
export const WORKAROUND2 = "";
