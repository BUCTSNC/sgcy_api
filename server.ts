import { listen } from "./constant.ts";
import { serve } from "std/http/server.ts";
import init from "./init.ts";
import main from "./main.ts";

init();
serve(main, {
    port: listen,
});
