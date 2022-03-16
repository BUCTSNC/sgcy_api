import { Ajv, JTDSchemaType } from "../deps/ajvJTD.ts";
import YAML from "../deps/YAML.ts"

export const ajv = new Ajv({ parseDate: true });

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
    },
    optionalProperties: {
        headerImage: { type: "string" },
    },
};

const metaChecker = ajv.compile(metaSchema);
export const metaParser = (content: string) => {
    const json = YAML.parse(content);
    if (metaChecker(json)) {
        return json
    } else {
        return undefined
    }
}

export type PostMetaInYAML = {
    title: string;
    intro: string;
    authors: string[];
    tags: string[];
    editors: string[];
    headerImage?: string;
};

export type PostMetaInFS = {
    uuid: string;
    category: string[];
    timestamp: Date;
};

export type Post = PostMetaInFS & PostMetaInYAML;

export const PostSchema: JTDSchemaType<Post> = {
    properties: {
        ...metaSchema.properties,
        uuid: { type: "string" },
        category: {
            elements: { type: "string" },
        },
        timestamp: { type: "timestamp" },
    },
    optionalProperties: metaSchema.optionalProperties,
};

export const postSendSerializer = ajv.compileSerializer(PostSchema);
export const postSendParser = ajv.compileParser(PostSchema);
