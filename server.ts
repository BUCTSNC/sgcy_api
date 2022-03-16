import "./global.d.ts"
import { listen } from "./constant.ts";
import { httpServe } from "./deps/std.ts";
import init from "./init.ts";
import main from "./main.ts";

init();
httpServe(main, {
    port: listen,
});
