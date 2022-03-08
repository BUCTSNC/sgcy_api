import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import React from "react";

ReactDOM.hydrate(
    <BrowserRouter>
        <App hotList={{ daily: [], weekly: [], monthly: [], yearly: [] }} />
    </BrowserRouter>,
    // @ts-ignore: this file will not use in deno.
    document.getElementById("App"),
);
