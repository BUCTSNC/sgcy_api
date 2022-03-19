import type { CodeKeywordDefinition, ErrorObject, AnySchema } from "../../types/index.d.ts";
export declare type PropertyNamesError = ErrorObject<"propertyNames", {
    propertyName: string;
}, AnySchema>;
declare const def: CodeKeywordDefinition;
export default def;
