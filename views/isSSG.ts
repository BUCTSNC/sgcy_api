import { useEffect } from "../deps/react.ts";
import { createProxy } from "../deps/freesia.ts";

export const isSSG = () => Boolean(Number(sessionStorage.getItem("ssg")));

export const useNonSSGEffect = createProxy<typeof useEffect>(
    (effect, deps) =>
        isSSG() ? [[effect, deps], (result) => result] : [null, () => void (0)],
)(useEffect);
