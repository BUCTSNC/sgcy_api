import ReactDOM from "https://esm.sh/react-dom@17.0.2";
import React from "./deps/react.ts";
import { BrowserRouter } from "./deps/react.ts";
import App from "./App.tsx";

ReactDOM.hydrate(
    <BrowserRouter>
        <App></App>
    </BrowserRouter>,
    // @ts-ignore: this file will not use in deno.
    document.getElementById("App"),
);
