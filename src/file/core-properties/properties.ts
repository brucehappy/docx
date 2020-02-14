import { XmlComponent } from "file/xml-components";

import { DocumentAttributes } from "../document/document-attributes";
import { INumberingOptions } from "../numbering";
import { HyperlinkType, IRunOptions, Paragraph } from "../paragraph";
import { IStylesOptions } from "../styles";
import { Created, Creator, Description, Keywords, LastModifiedBy, Modified, Revision, Subject, Title } from "./components";

export interface IInternalHyperlinkDefinition {
    readonly text?: string;
    readonly textOptions?: IRunOptions;
    readonly type: HyperlinkType.INTERNAL;
}

export interface IExternalHyperlinkDefinition {
    readonly link: string;
    readonly text?: string;
    readonly textOptions?: IRunOptions;
    readonly type: HyperlinkType.EXTERNAL;
}

export interface IExternalHyperlinkOnClickDefinition {
    readonly link: string;
    readonly type: HyperlinkType.EXTERNALCLICK;
}

export interface IPropertiesOptions {
    readonly title?: string;
    readonly subject?: string;
    readonly creator?: string;
    readonly created?: Date;
    readonly keywords?: string;
    readonly description?: string;
    readonly lastModifiedBy?: string;
    readonly lastModified?: Date;
    readonly revision?: string;
    readonly externalStyles?: string;
    readonly styles?: IStylesOptions;
    readonly numbering?: INumberingOptions;
    readonly footnotes?: Paragraph[];
    readonly hyperlinks?: {
        readonly [key: string]: IInternalHyperlinkDefinition | IExternalHyperlinkDefinition | IExternalHyperlinkOnClickDefinition;
    };
}

export class CoreProperties extends XmlComponent {
    constructor(options: IPropertiesOptions) {
        super("cp:coreProperties");
        this.root.push(
            new DocumentAttributes({
                cp: "http://schemas.openxmlformats.org/package/2006/metadata/core-properties",
                dc: "http://purl.org/dc/elements/1.1/",
                dcterms: "http://purl.org/dc/terms/",
                dcmitype: "http://purl.org/dc/dcmitype/",
                xsi: "http://www.w3.org/2001/XMLSchema-instance",
            }),
        );
        if (options.title) {
            this.root.push(new Title(options.title));
        }
        if (options.subject) {
            this.root.push(new Subject(options.subject));
        }
        if (options.creator) {
            this.root.push(new Creator(options.creator));
        }
        if (options.keywords) {
            this.root.push(new Keywords(options.keywords));
        }
        if (options.description) {
            this.root.push(new Description(options.description));
        }
        if (options.lastModifiedBy) {
            this.root.push(new LastModifiedBy(options.lastModifiedBy));
        }
        if (options.revision) {
            this.root.push(new Revision(options.revision));
        }
        this.root.push(new Created(options.created));
        this.root.push(new Modified(options.lastModified));
    }
}
