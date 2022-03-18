import { isVoid } from "../deps/freesia.ts";

export const throwIfNull = <T>(value: T) => {
    if (isVoid(value)) throw new Error("Can't be a void value");
    else return value as NonNullable<T>;
};
