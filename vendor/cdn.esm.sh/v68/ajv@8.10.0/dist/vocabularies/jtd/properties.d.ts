import type { CodeKeywordDefinition, ErrorObject, KeywordErrorDefinition, SchemaObject } from "../../types/index.d.ts";
import type { KeywordCxt } from "../../compile/validate/index.d.ts";
import { _JTDTypeError } from "./error.d.ts";
declare enum PropError {
    Additional = "additional",
    Missing = "missing"
}
declare type PropKeyword = "properties" | "optionalProperties";
declare type PropSchema = {
    [P in string]?: SchemaObject;
};
export declare type JTDPropertiesError = _JTDTypeError<PropKeyword, "object", PropSchema> | ErrorObject<PropKeyword, {
    error: PropError.Additional;
    additionalProperty: string;
}, PropSchema> | ErrorObject<PropKeyword, {
    error: PropError.Missing;
    missingProperty: string;
}, PropSchema>;
export declare const error: KeywordErrorDefinition;
declare const def: CodeKeywordDefinition;
export declare function validateProperties(cxt: KeywordCxt): void;
export default def;
