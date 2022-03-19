import type { CodeKeywordDefinition, ErrorObject, AnySchema } from "../../types/index.d.ts";
export declare type OneOfError = ErrorObject<"oneOf", {
    passingSchemas: [number, number] | null;
}, AnySchema[]>;
declare const def: CodeKeywordDefinition;
export default def;
