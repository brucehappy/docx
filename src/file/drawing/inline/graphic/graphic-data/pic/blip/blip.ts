import { IMediaData } from "file/media";
import { XmlAttributeComponent, XmlComponent } from "file/xml-components";

interface IBlipProperties {
    readonly embed?: string;
    readonly link?: string;
    readonly cstate?: string;
}

class BlipAttributes extends XmlAttributeComponent<IBlipProperties> {
    protected readonly xmlKeys = {
        embed: "r:embed",
        link: "r:link",
        cstate: "cstate",
    };
}

export class Blip extends XmlComponent {
    constructor(mediaData: IMediaData) {
        super("a:blip");
        this.root.push(
            typeof mediaData.data === "string"
                ? new BlipAttributes({
                      link: `rId{${mediaData.fileName}}`,
                  })
                : new BlipAttributes({
                      embed: `rId{${mediaData.fileName}}`,
                      cstate: "none",
                  }),
        );
    }
}
