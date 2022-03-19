import type { CodeKeywordDefinition } from "../../types/index.d.ts";
import { _JTDTypeError } from "./error.d.ts";
import { DiscrError, DiscrErrorObj } from "../discriminator/types.d.ts";
export declare type JTDDiscriminatorError = _JTDTypeError<"discriminator", "object", string> | DiscrErrorObj<DiscrError.Tag> | DiscrErrorObj<DiscrError.Mapping>;
declare const def: CodeKeywordDefinition;
export default def;
