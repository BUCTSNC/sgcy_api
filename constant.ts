import { path } from "./deps/std.ts";
const { join } = path;

export const staticRoot = join(Deno.cwd(), "static");
export const root = join(Deno.cwd(), "docs");
export const listen = 8000;
