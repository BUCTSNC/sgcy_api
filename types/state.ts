import { JTDSchemaType } from "../deps/ajvJTD.ts";
import { PostArraySchema, PostSchema, PostSend, ajv } from "./post.ts";

export type State = {
    hotList: PostSend[];
    post?: {
        meta: PostSend;
        indexMD: string;
    };
    searchResults?: PostSend[];
    tagPosts?: PostSend[];
    categoryPosts?: PostSend[];
};

const StateSchema: JTDSchemaType<State> = {
    properties: {
        hotList: PostArraySchema,
    },
    optionalProperties: {
        searchResults: PostArraySchema,
        tagPosts: PostArraySchema,
        categoryPosts: PostArraySchema,
        post: {
            properties: {
                meta: PostSchema,
                indexMD: { type: "string" },
            },
        },
    },
};

export const StateSerializer = ajv.compileSerializer(StateSchema);
export const StateParser = ajv.compileParser(StateSchema);
