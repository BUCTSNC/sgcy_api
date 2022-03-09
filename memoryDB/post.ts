import { Ajv, JTDSchemaType } from "../deps/ajvJTD.ts";

export const ajv = new Ajv({ parseDate: true });

const metaSchema: JTDSchemaType<PostMetaInJSON> = {
    properties: {
        title: { type: "string" },
        intro: { type: "string" },
        authors: {
            elements: { type: "string" },
        },
        tags: {
            elements: { type: "string" },
        },
        editors: {
            elements: { type: "string" },
        },
    },
    optionalProperties: {
        headerImage: { type: "string" },
    },
};

export const metaParser = ajv.compileParser(metaSchema);

export type PostMetaInJSON = {
    title: string;
    intro: string;
    authors: string[];
    tags: string[];
    editors: string[];
    headerImage?: string;
};

export type PostMetaInFS = {
    uuid: string;
    directory: string[];
    timestamp: Date;
};

export type Post = PostMetaInFS & PostMetaInJSON;

export type PostSend = Omit<Post, "directory">;

export const PostSendSchema: JTDSchemaType<PostSend> = {
    properties: {
        ...metaSchema.properties,
        uuid: { type: "string" },
        timestamp: { type: "timestamp" },
    },
    optionalProperties: metaSchema.optionalProperties,
};

export const postSendSerializer = ajv.compileSerializer(PostSendSchema);
export const postSendParser = ajv.compileParser(PostSendSchema);
