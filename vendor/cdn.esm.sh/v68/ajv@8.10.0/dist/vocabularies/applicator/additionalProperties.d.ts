import type { CodeKeywordDefinition, AddedKeywordDefinition, ErrorObject, AnySchema } from "../../types/index.d.ts";
export declare type AdditionalPropertiesError = ErrorObject<"additionalProperties", {
    additionalProperty: string;
}, AnySchema>;
declare const def: CodeKeywordDefinition & AddedKeywordDefinition;
export default def;
