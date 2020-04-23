import { ConcreteNumbering } from "file";
import * as xml from "xml";

export class NumberingReplacer {
    public replace(xmlData: string, concreteNumberings: ConcreteNumbering[]): string {
        let currentXmlData = xmlData;
        const escapeRegExp = (s) => s.replace(/[.*+\-?^${}()|[\]\\]/g, "\\$&");

        for (const concreteNumbering of concreteNumberings) {
            if (!concreteNumbering.reference) {
                continue;
            }

            // Must use RegExp to replace all instances of the string.
            currentXmlData = currentXmlData.replace(
                new RegExp(escapeRegExp(`"{${xml(concreteNumbering.reference)}}"`), "g"),
                `"${concreteNumbering.id.toString()}"`,
            );
        }

        return currentXmlData;
    }
}
