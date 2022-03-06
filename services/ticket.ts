// @deno-types="https://deno.land/x/fast_base64@v0.1.7/types/index.d.ts"
import {
    toBase64,
    toBytes,
} from "https://deno.land/x/fast_base64@v0.1.7/dist/base64-wasm.js";

export const toBase64Url = async (bytes: Uint8Array) =>
    encodeURIComponent(await toBase64(bytes));
export const toBytesFromUrl = (url: string) => toBytes(decodeURIComponent(url));

const serverKey = await crypto.subtle.generateKey(
    { name: "HMAC", hash: { name: "SHA-512" } },
    true,
    ["sign", "verify"],
);

export const sign = async (secret: Uint8Array, date: string) =>
    new Uint8Array(
        await crypto.subtle.sign(
            { name: "HMAC", hash: { name: "SHA-512" } },
            serverKey,
            await (new Blob([secret, date]).arrayBuffer()),
        ),
    );

export const validate = async (secret: string, signature: string) => {
    const validatedSign = await sign(
        await toBytesFromUrl(secret),
        new Date().toDateString(),
    );
    return await toBase64Url(validatedSign) === signature;
};
