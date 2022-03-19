import type { CodeKeywordDefinition, ErrorObject } from "../../types/index.d.ts";
export declare type PatternError = ErrorObject<"pattern", {
    pattern: string;
}, string | {
    $data: string;
}>;
declare const def: CodeKeywordDefinition;
export default def;