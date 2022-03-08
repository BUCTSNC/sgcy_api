import Ajv, { JTDSchemaType } from "Ajv_jtd";

export const ajv = new Ajv({ parseDate: true });

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

export type PostSend = Omit<Post, "directory">;

export const PostSendSchema: JTDSchemaType<PostSend> = {
    properties: {
        ...metaSchema.properties, uuid: { type: "string" }, timestamp: { type: "timestamp" }
    }
};

export const postSendSerializer = ajv.compileSerializer(PostSendSchema);
export const postSendParser = ajv.compileParser(PostSendSchema);
