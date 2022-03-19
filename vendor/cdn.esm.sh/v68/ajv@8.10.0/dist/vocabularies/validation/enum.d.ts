import type { CodeKeywordDefinition, ErrorObject } from "../../types/index.d.ts";
export declare type EnumError = ErrorObject<"enum", {
    allowedValues: any[];
}, any[] | {
    $data: string;
}>;
declare const def: CodeKeywordDefinition;
export default def;
