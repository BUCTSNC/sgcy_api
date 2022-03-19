import type { CodeKeywordDefinition, ErrorObject } from "../../types/index.d.ts";
import { DependenciesErrorParams, PropertyDependencies } from "../applicator/dependencies.d.ts";
export declare type DependentRequiredError = ErrorObject<"dependentRequired", DependenciesErrorParams, PropertyDependencies>;
declare const def: CodeKeywordDefinition;
export default def;
