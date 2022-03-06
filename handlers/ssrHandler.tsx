import { createRes } from "https://deno.land/x/freesia@v1.0.8/mod.ts";
import { renderToString } from "https://esm.sh/react-dom@17.0.2/server";
import React, { Fragment } from "https://esm.sh/react@17.0.2";

export const ssrHandler = async (url: string, req: Request) => {
    return createRes(
        renderToString(
            <Fragment>
                <h1>hello, world</h1>
                <p>Render react jsx in deno</p>
                <p>You {req.method} {url}</p>
            </Fragment>
        ), [
        "Content-Type", "text/html; charset=UTF-8"
    ]
    );
};
