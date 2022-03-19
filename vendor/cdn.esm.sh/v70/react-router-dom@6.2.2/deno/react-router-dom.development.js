/* esm.sh - esbuild bundle(react-router-dom@6.2.2) deno development */
// esm-build-230183bbb2585c54b0f5ad2a36e60a126c7165b9-1b3397af/node_modules/react-router-dom/index.js
import { useRef, useState, useLayoutEffect, createElement, forwardRef, useCallback, useMemo } from "/v70/react@17.0.2/deno/react.development.js";
import { createBrowserHistory, createHashHistory } from "/v70/history@5.3.0/deno/history.development.js";
import { Router, useHref, createPath, useLocation, useResolvedPath, useNavigate } from "/v70/react-router@6.2.2/deno/react-router.development.js";
import { MemoryRouter, Navigate, NavigationType, Outlet, Route, Router as Router2, Routes, UNSAFE_LocationContext, UNSAFE_NavigationContext, UNSAFE_RouteContext, createPath as createPath2, createRoutesFromChildren, generatePath, matchPath, matchRoutes, parsePath, renderMatches, resolvePath, useHref as useHref2, useInRouterContext, useLocation as useLocation2, useMatch, useNavigate as useNavigate2, useNavigationType, useOutlet, useOutletContext, useParams, useResolvedPath as useResolvedPath2, useRoutes } from "/v70/react-router@6.2.2/deno/react-router.development.js";
function _extends() {
  _extends = Object.assign || function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null)
    return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0)
      continue;
    target[key] = source[key];
  }
  return target;
}
var _excluded = ["onClick", "reloadDocument", "replace", "state", "target", "to"];
var _excluded2 = ["aria-current", "caseSensitive", "className", "end", "style", "to", "children"];
function warning(cond, message) {
  if (!cond) {
    if (typeof console !== "undefined")
      console.warn(message);
    try {
      throw new Error(message);
    } catch (e) {
    }
  }
}
function BrowserRouter(_ref) {
  let {
    basename,
    children,
    window
  } = _ref;
  let historyRef = useRef();
  if (historyRef.current == null) {
    historyRef.current = createBrowserHistory({
      window
    });
  }
  let history = historyRef.current;
  let [state, setState] = useState({
    action: history.action,
    location: history.location
  });
  useLayoutEffect(() => history.listen(setState), [history]);
  return /* @__PURE__ */ createElement(Router, {
    basename,
    children,
    location: state.location,
    navigationType: state.action,
    navigator: history
  });
}
function HashRouter(_ref2) {
  let {
    basename,
    children,
    window
  } = _ref2;
  let historyRef = useRef();
  if (historyRef.current == null) {
    historyRef.current = createHashHistory({
      window
    });
  }
  let history = historyRef.current;
  let [state, setState] = useState({
    action: history.action,
    location: history.location
  });
  useLayoutEffect(() => history.listen(setState), [history]);
  return /* @__PURE__ */ createElement(Router, {
    basename,
    children,
    location: state.location,
    navigationType: state.action,
    navigator: history
  });
}
function HistoryRouter(_ref3) {
  let {
    basename,
    children,
    history
  } = _ref3;
  const [state, setState] = useState({
    action: history.action,
    location: history.location
  });
  useLayoutEffect(() => history.listen(setState), [history]);
  return /* @__PURE__ */ createElement(Router, {
    basename,
    children,
    location: state.location,
    navigationType: state.action,
    navigator: history
  });
}
if (true) {
  HistoryRouter.displayName = "unstable_HistoryRouter";
}
function isModifiedEvent(event) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
var Link = /* @__PURE__ */ forwardRef(function LinkWithRef(_ref4, ref) {
  let {
    onClick,
    reloadDocument,
    replace = false,
    state,
    target,
    to
  } = _ref4, rest = _objectWithoutPropertiesLoose(_ref4, _excluded);
  let href = useHref(to);
  let internalOnClick = useLinkClickHandler(to, {
    replace,
    state,
    target
  });
  function handleClick(event) {
    if (onClick)
      onClick(event);
    if (!event.defaultPrevented && !reloadDocument) {
      internalOnClick(event);
    }
  }
  return /* @__PURE__ */ createElement("a", _extends({}, rest, {
    href,
    onClick: handleClick,
    ref,
    target
  }));
});
if (true) {
  Link.displayName = "Link";
}
var NavLink = /* @__PURE__ */ forwardRef(function NavLinkWithRef(_ref5, ref) {
  let {
    "aria-current": ariaCurrentProp = "page",
    caseSensitive = false,
    className: classNameProp = "",
    end = false,
    style: styleProp,
    to,
    children
  } = _ref5, rest = _objectWithoutPropertiesLoose(_ref5, _excluded2);
  let location = useLocation();
  let path = useResolvedPath(to);
  let locationPathname = location.pathname;
  let toPathname = path.pathname;
  if (!caseSensitive) {
    locationPathname = locationPathname.toLowerCase();
    toPathname = toPathname.toLowerCase();
  }
  let isActive = locationPathname === toPathname || !end && locationPathname.startsWith(toPathname) && locationPathname.charAt(toPathname.length) === "/";
  let ariaCurrent = isActive ? ariaCurrentProp : void 0;
  let className;
  if (typeof classNameProp === "function") {
    className = classNameProp({
      isActive
    });
  } else {
    className = [classNameProp, isActive ? "active" : null].filter(Boolean).join(" ");
  }
  let style = typeof styleProp === "function" ? styleProp({
    isActive
  }) : styleProp;
  return /* @__PURE__ */ createElement(Link, _extends({}, rest, {
    "aria-current": ariaCurrent,
    className,
    ref,
    style,
    to
  }), typeof children === "function" ? children({
    isActive
  }) : children);
});
if (true) {
  NavLink.displayName = "NavLink";
}
function useLinkClickHandler(to, _temp) {
  let {
    target,
    replace: replaceProp,
    state
  } = _temp === void 0 ? {} : _temp;
  let navigate = useNavigate();
  let location = useLocation();
  let path = useResolvedPath(to);
  return useCallback((event) => {
    if (event.button === 0 && (!target || target === "_self") && !isModifiedEvent(event)) {
      event.preventDefault();
      let replace = !!replaceProp || createPath(location) === createPath(path);
      navigate(to, {
        replace,
        state
      });
    }
  }, [location, navigate, path, replaceProp, state, target, to]);
}
function useSearchParams(defaultInit) {
  true ? warning(typeof URLSearchParams !== "undefined", "You cannot use the `useSearchParams` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params\n\nIf you're unsure how to load polyfills, we recommend you check out https://polyfill.io/v3/ which provides some recommendations about how to load polyfills only for users that need them, instead of for every user.") : void 0;
  let defaultSearchParamsRef = useRef(createSearchParams(defaultInit));
  let location = useLocation();
  let searchParams = useMemo(() => {
    let searchParams2 = createSearchParams(location.search);
    for (let key of defaultSearchParamsRef.current.keys()) {
      if (!searchParams2.has(key)) {
        defaultSearchParamsRef.current.getAll(key).forEach((value) => {
          searchParams2.append(key, value);
        });
      }
    }
    return searchParams2;
  }, [location.search]);
  let navigate = useNavigate();
  let setSearchParams = useCallback((nextInit, navigateOptions) => {
    navigate("?" + createSearchParams(nextInit), navigateOptions);
  }, [navigate]);
  return [searchParams, setSearchParams];
}
function createSearchParams(init) {
  if (init === void 0) {
    init = "";
  }
  return new URLSearchParams(typeof init === "string" || Array.isArray(init) || init instanceof URLSearchParams ? init : Object.keys(init).reduce((memo, key) => {
    let value = init[key];
    return memo.concat(Array.isArray(value) ? value.map((v) => [key, v]) : [[key, value]]);
  }, []));
}
export {
  BrowserRouter,
  HashRouter,
  Link,
  MemoryRouter,
  NavLink,
  Navigate,
  NavigationType,
  Outlet,
  Route,
  Router2 as Router,
  Routes,
  UNSAFE_LocationContext,
  UNSAFE_NavigationContext,
  UNSAFE_RouteContext,
  createPath2 as createPath,
  createRoutesFromChildren,
  createSearchParams,
  generatePath,
  matchPath,
  matchRoutes,
  parsePath,
  renderMatches,
  resolvePath,
  HistoryRouter as unstable_HistoryRouter,
  useHref2 as useHref,
  useInRouterContext,
  useLinkClickHandler,
  useLocation2 as useLocation,
  useMatch,
  useNavigate2 as useNavigate,
  useNavigationType,
  useOutlet,
  useOutletContext,
  useParams,
  useResolvedPath2 as useResolvedPath,
  useRoutes,
  useSearchParams
};
/**
 * React Router DOM v6.2.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
