import {
    toBase64,
    toBytes,
} from "https://deno.land/x/fast_base64@v0.1.7/mod.ts";
import { Empty, resJson } from "https://deno.land/x/freesia@v1.0.8/mod.ts";

const toBase64Url = async (bytes: Uint8Array) =>
    encodeURIComponent(await toBase64(bytes));
const toBytesFromUrl = (url: string) => toBytes(decodeURIComponent(url));

const serverKey = await crypto.subtle.generateKey(
    { name: "HMAC", hash: { name: "SHA-512" } },
    true,
    ["sign", "verify"],
);

const sign = async (secret: Uint8Array, date: string) =>
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

const ticketHandler = async (_: Empty) => {
    const secret = crypto.getRandomValues(new Uint8Array(8));
    const date = new Date().toDateString();
    const signature = await sign(secret, date);
    return resJson(
        {
            secret: await toBase64Url(secret),
            signature: await toBase64Url(signature),
        },
    );
};

export default ticketHandler;
