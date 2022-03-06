const isBrowser = () => globalThis.Deno === undefined;

export default isBrowser;
