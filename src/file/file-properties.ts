import { IDocumentTemplate } from "../import-dotx";
import { Styles } from "./styles";

export interface IFileProperties {
    readonly template?: IDocumentTemplate;
    readonly styles?: Styles;
}

// Needed because of: https://github.com/s-panferov/awesome-typescript-loader/issues/432
/**
 * @ignore
 */
export const WORKAROUND = "";
