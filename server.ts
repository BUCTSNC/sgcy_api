import "./init.ts"
import { listen } from "./constant.ts";
import { httpServe } from "./deps/std.ts";
import main from "./main.ts";

httpServe(main, {
    port: listen,
});
