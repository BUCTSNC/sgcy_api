import {join} from "https://deno.land/std@0.129.0/path/mod.ts";
import YAML from "https://esm.sh/yamljs";

async function scanDir(target: string) {
    for await (const entry of Deno.readDir(target)) {
        if(entry.name === "meta.yml") yaml2Json(target)
        else if(entry.isDirectory) {
            scanDir(join(target, entry.name))
        }
    }
}

async function yaml2Json(target: string) {
    const content = await Deno.readTextFile(join(target, "meta.yml"))
    const json = YAML.parse(content)
    await Deno.writeTextFile(join(target, "meta.json"), JSON.stringify(json))
}

scanDir("./docs")