import { Ajv, JTDSchemaType } from "../deps/ajvJTD.ts";
import YAML from "../deps/YAML.ts";

export const ajv = new Ajv({ parseDate: true, int32range: false });

const metaSchema: JTDSchemaType<PostMetaInYAML> = {
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
        category: {
            elements: { type: "string" },
        },
    },
    optionalProperties: {
        headerImage: { type: "string" },
    },
};

const metaChecker = ajv.compile(metaSchema);
export const metaParser = (content: string) => {
    const json = YAML.parse(content);
    if (metaChecker(json)) {
        return json;
    } else {
        return undefined;
    }
};

export type PostMetaInYAML = {
    title: string;
    intro: string;
    authors: string[];
    category: string[];
    tags: string[];
    editors: string[];
    headerImage?: string;
};

export type PostMetaInFS = {
    uuid: string;
    target: string[];
    timestamp: Date;
};

export type PostVisitLog = Record<string, number>;

const visitLogSchema: JTDSchemaType<PostVisitLog> = {
    values: {
        type: "uint32",
    },
};

export const visitLogParser = ajv.compileParser(visitLogSchema);
export const visitLogSerializer = ajv.compileSerializer(visitLogSchema);

export type PostInDB = PostMetaInFS & PostMetaInYAML & {
    visited: PostVisitLog;
};

export type PostSend = PostMetaInFS & PostMetaInYAML & { amount: number; };

export const PostSchema: JTDSchemaType<PostSend> = {
    properties: {
        ...metaSchema.properties,
        uuid: { type: "string" },
        timestamp: { type: "timestamp" },
        amount: { type: "uint32" },
        target: {
            elements: { type: "string" }
        }
    },
    optionalProperties: {
        ...metaSchema.optionalProperties,
    },
};

export const postSendSerializer = ajv.compileSerializer(PostSchema);
export const postSendParser = ajv.compileParser(PostSchema);

export const PostArraySchema: JTDSchemaType<PostSend[]> = {
    elements: PostSchema,
};

export const postArraySerializer = ajv.compileSerializer(PostArraySchema);
export const postArrayParser = ajv.compileParser(PostArraySchema);
