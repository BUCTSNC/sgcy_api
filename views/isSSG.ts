import { useEffect } from "../deps/react.ts";
import { createWrapper } from "../deps/freesia.ts";

export const isSSG = () => Boolean(Number(sessionStorage.getItem("ssg")));

export const useNonSSGEffect = createWrapper<typeof useEffect>(
    (effect, deps) => [[() => isSSG() ? () => {} : effect(), deps]],
)(useEffect);
