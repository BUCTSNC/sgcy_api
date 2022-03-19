/* esm.sh - esbuild bundle(react-router-dom@6.2.2/server) deno development */
import * as __react_router_dom$ from "/v70/react-router-dom@6.2.2/deno/react-router-dom.development.js";
import * as __history$ from "/v70/history@5.3.0/deno/history.development.js";
import __react$ from "/v70/react@17.0.2/deno/react.development.js";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __reExport = (target, module, copyDefault, desc) => {
  if (module && typeof module === "object" || typeof module === "function") {
    for (let key of __getOwnPropNames(module))
      if (!__hasOwnProp.call(target, key) && (copyDefault || key !== "default"))
        __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
  }
  return target;
};
var __toESM = (module, isNodeMode) => {
  return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", !isNodeMode && module && module.__esModule ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
};

// esm-build-64d61b844a1545d669f8a011fabb0c0f9e161a27-ba9aea05/node_modules/react-router-dom/server.js
var require_server = __commonJS({
  "esm-build-64d61b844a1545d669f8a011fabb0c0f9e161a27-ba9aea05/node_modules/react-router-dom/server.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var React = __react$;
    var history = __history$;
    var reactRouterDom = __react_router_dom$;
    function StaticRouter2({
      basename,
      children,
      location: locationProp = "/"
    }) {
      if (typeof locationProp === "string") {
        locationProp = history.parsePath(locationProp);
      }
      let action = history.Action.Pop;
      let location = {
        pathname: locationProp.pathname || "/",
        search: locationProp.search || "",
        hash: locationProp.hash || "",
        state: locationProp.state || null,
        key: locationProp.key || "default"
      };
      let staticNavigator = {
        createHref(to) {
          return typeof to === "string" ? to : history.createPath(to);
        },
        push(to) {
          throw new Error(`You cannot use navigator.push() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${JSON.stringify(to)})\` somewhere in your app.`);
        },
        replace(to) {
          throw new Error(`You cannot use navigator.replace() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${JSON.stringify(to)}, { replace: true })\` somewhere in your app.`);
        },
        go(delta) {
          throw new Error(`You cannot use navigator.go() on the server because it is a stateless environment. This error was probably triggered when you did a \`navigate(${delta})\` somewhere in your app.`);
        },
        back() {
          throw new Error(`You cannot use navigator.back() on the server because it is a stateless environment.`);
        },
        forward() {
          throw new Error(`You cannot use navigator.forward() on the server because it is a stateless environment.`);
        }
      };
      return /* @__PURE__ */ React.createElement(reactRouterDom.Router, {
        basename,
        children,
        location,
        navigationType: action,
        navigator: staticNavigator,
        static: true
      });
    }
    exports.StaticRouter = StaticRouter2;
  }
});

// esm-build-64d61b844a1545d669f8a011fabb0c0f9e161a27-ba9aea05/mod.js
var import_server = __toESM(require_server());
var $module = __toESM(require_server());
var { __esModule, StaticRouter } = $module;
var { default: $def, ...$rest } = $module;
var mod_default = import_server.default ?? $def ?? $rest;
export {
  StaticRouter,
  __esModule,
  mod_default as default
};
