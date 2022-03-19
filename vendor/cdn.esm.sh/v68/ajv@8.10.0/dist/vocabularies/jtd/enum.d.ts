import type { CodeKeywordDefinition, ErrorObject } from "../../types/index.d.ts";
export declare type JTDEnumError = ErrorObject<"enum", {
    allowedValues: string[];
}, string[]>;
declare const def: CodeKeywordDefinition;
export default def;
