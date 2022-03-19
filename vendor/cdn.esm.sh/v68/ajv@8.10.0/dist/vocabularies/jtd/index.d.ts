import type { Vocabulary } from "../../types/index.d.ts";
import { JTDTypeError } from "./type.d.ts";
import { JTDEnumError } from "./enum.d.ts";
import { JTDElementsError } from "./elements.d.ts";
import { JTDPropertiesError } from "./properties.d.ts";
import { JTDDiscriminatorError } from "./discriminator.d.ts";
import { JTDValuesError } from "./values.d.ts";
declare const jtdVocabulary: Vocabulary;
export default jtdVocabulary;
export declare type JTDErrorObject = JTDTypeError | JTDEnumError | JTDElementsError | JTDPropertiesError | JTDDiscriminatorError | JTDValuesError;