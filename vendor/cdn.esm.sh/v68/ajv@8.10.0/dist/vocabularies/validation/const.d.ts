import type { CodeKeywordDefinition, ErrorObject } from "../../types/index.d.ts";
export declare type ConstError = ErrorObject<"const", {
    allowedValue: any;
}>;
declare const def: CodeKeywordDefinition;
export default def;
