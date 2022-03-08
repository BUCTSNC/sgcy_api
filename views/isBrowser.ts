const isBrowser = () => !("Deno" in globalThis);

export default isBrowser;
