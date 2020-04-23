import { IMediaData, Media } from "file/media";
import * as xml from "xml";

export class ImageReplacer {
    public replace(xmlData: string, mediaData: IMediaData[], offset: number): string {
        let currentXmlData = xmlData;
        const escapeRegExp = (s) => s.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&");

        mediaData.forEach((image, i) => {
            // Must use RegExp to replace all instances of the string.
            currentXmlData = currentXmlData.replace(
                new RegExp(escapeRegExp(`"rId{${xml(image.fileName)}}"`), "g"),
                `"rId${(offset + i).toString()}"`,
            );
        });

        return currentXmlData;
    }

    public getMediaData(xmlData: string, media: Media): IMediaData[] {
        return media.Array.filter((image) => xmlData.indexOf(`"rId{${xml(image.fileName)}}"`) !== -1);
    }
}
