import { httpServe, path } from "./deps/std.ts";
import { lookup } from "./deps/mediaTypes.ts";

httpServe(async (req) => {
    const pathname = decodeURI(new URL(req.url).pathname);
    const stat = await Deno.stat(path.join(Deno.cwd(), "ssg", pathname)).catch(
        () => null,
    );
    if (stat === null) return new Response(null, { status: 404 });
    const fullpath = stat.isDirectory
        ? path.join(Deno.cwd(), "ssg", pathname, "index.html")
        : path.join(Deno.cwd(), "ssg", pathname);
    const file = await Deno.readFile(fullpath).catch(() => null);
    if (file === null) return new Response(null, { status: 404 });
    return new Response(file, {
        status: 200,
        headers: {
            "Content-Type": lookup(path.extname(fullpath)) ??
                "application/octect-stream",
        },
    });
}, { port: 7000 });
