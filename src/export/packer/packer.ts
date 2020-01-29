import { File } from "file";
import { Readable } from "stream";
import { Compiler } from "./next-compiler";

export class Packer {
    public static async toStream(file: File, prettify?: boolean): Promise<Readable> {
        const zip = this.compiler.compile(file, prettify);
        const zipData = (await zip.generateNodeStream({
            mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        })) as Readable;

        return zipData;
    }

    public static async toBuffer(file: File, prettify?: boolean): Promise<Buffer> {
        const zip = this.compiler.compile(file, prettify);
        const zipData = (await zip.generateAsync({
            type: "nodebuffer",
            mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        })) as Buffer;

        return zipData;
    }

    public static async toBase64String(file: File, prettify?: boolean): Promise<string> {
        const zip = this.compiler.compile(file, prettify);
        const zipData = (await zip.generateAsync({
            type: "base64",
            mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        })) as string;

        return zipData;
    }

    public static async toBlob(file: File, prettify?: boolean): Promise<Blob> {
        const zip = this.compiler.compile(file, prettify);
        const zipData = (await zip.generateAsync({
            type: "blob",
            mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        })) as Blob;

        return zipData;
    }

    private static readonly compiler = new Compiler();
}
