import { path } from "./deps/std.ts";
import { __dirname } from "./utils/parseImportUrl.ts";
const { join } = path;

export const staticRoot = join(__dirname(import.meta.url), "static");
export const root = join(__dirname(import.meta.url), "docs");
export const listen = 8000;
