import { join } from "https://deno.land/std@0.127.0/path/mod.ts";

export const root = join(Deno.cwd(), "docs");
export const listen = 8000;
