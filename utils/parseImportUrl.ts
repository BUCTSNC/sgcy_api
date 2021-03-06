import { composeFn } from "../deps/freesia.ts";
import { path } from "../deps/std.ts";

export const __filename = path.fromFileUrl;
export const __dirname = composeFn(__filename)
    .next(path.dirname).fn;

export const __root = path.join(__dirname(import.meta.url), "..");
