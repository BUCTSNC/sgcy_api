import type { CodeKeywordDefinition, ErrorObject, AnySchema } from "../../types/index.d.ts";
export declare type UnevaluatedPropertiesError = ErrorObject<"unevaluatedProperties", {
    unevaluatedProperty: string;
}, AnySchema>;
declare const def: CodeKeywordDefinition;
export default def;
