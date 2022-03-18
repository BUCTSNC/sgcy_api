import { path } from "./deps/std.ts";
import { __dirname, __root } from "./utils/parseImportUrl.ts";
const { join } = path;

export const staticRoot = join(__root, "static");
export const postRoot = join(__root, "docs");
export const listen = 8000;
