import { Empty, resJson } from "https://deno.land/x/freesia@v1.0.8/mod.ts";
import { sign, toBase64Url } from "../services/ticket.ts";

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
