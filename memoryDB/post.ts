import Ajv, { JTDSchemaType } from "https://esm.sh/ajv@8.10.0/dist/jtd";

export const ajv = new Ajv();

const metaSchema: JTDSchemaType<PostMetaInJSON> = {
    properties: {
        title: { type: "string" },
        introduction: { type: "string" },
        authors: {
            elements: { type: "string" },
        },
        tags: {
            elements: { type: "string" },
        },
    },
};

export const metaParser = ajv.compileParser(metaSchema);

export type PostMetaInJSON = {
    title: string;
    introduction: string;
    authors: string[];
    tags: string[];
};

export type PostMetaInFS = {
    uuid: string;
    directory: string;
    timestamp: Date;
};

export type Post = PostMetaInFS & PostMetaInJSON;
