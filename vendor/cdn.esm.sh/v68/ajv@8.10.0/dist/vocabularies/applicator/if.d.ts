import type { CodeKeywordDefinition, ErrorObject, AnySchema } from "../../types/index.d.ts";
export declare type IfKeywordError = ErrorObject<"if", {
    failingKeyword: string;
}, AnySchema>;
declare const def: CodeKeywordDefinition;
export default def;
