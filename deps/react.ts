// 前端调试时，再所有URL末尾增加?dev参数来获得带有开发工具的文件。
// 所有的React相关库必须同时使用调试版本或非调试版本。
// 使用开发版本bundule并minified的main.js大约500kb，比最优化版本大200kb左右
// @ts-nocheck: "Bad types"

export {
    default as React,
    useEffect,
    useState,
} from "https://esm.sh/react@17.0.2?dev&pin=v70";
export { default as ReactDOM } from "https://esm.sh/react-dom@17.0.2?dev&pin=v70";
export { renderToString } from "https://esm.sh/react-dom@17.0.2/server?dev&pin=v70";
export {
    BrowserRouter,
    Outlet,
    Route,
    Routes,
    useLocation,
    useNavigate,
    useParams,
    useSearchParams,
} from "https://esm.sh/react-router-dom@6.2.2?dev&pin=v70";
export { StaticRouter } from "https://esm.sh/react-router-dom@6.2.2/server?dev&pin=v70";
