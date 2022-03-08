import { React, ReactDOM, BrowserRouter } from "../deps/react.ts";
import App from "./App.tsx";

ReactDOM.hydrate(
    <BrowserRouter>
        <App hotList={{ daily: [], weekly: [], monthly: [], yearly: [] }} />
    </BrowserRouter>,
    // @ts-ignore: this file will not use in deno.
    document.getElementById("App"),
);
