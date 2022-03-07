import { isVoid } from "freesia";
import Ajv, { JTDSchemaType } from "Ajv_jtd";

const ajv = new Ajv({
    int32range: false,
    parseDate: true,
});

const schema: JTDSchemaType<DataOnFs> = {
    properties: {
        date: { type: "timestamp" },
        inner: {
            elements: {
                properties: {
                    uuid: { type: "string" },
                    visited: {
                        elements: {
                            type: "uint32",
                        },
                    },
                },
            },
        },
    },
};

export const visitLogSerializer = ajv.compileSerializer(schema);
export const visitLogParser = ajv.compileParser(schema);

type Inner = { uuid: string; visited: number[] }[];
type Outer = { uuid: string; visited: number }[];
type DataOnFs = {
    date: Date;
    inner: Inner;
};

export let inner: Inner = [];
export let outerDaily: Outer = generateForDays(1);
export let outerWeekly: Outer = generateForDays(7);
export let outerMonthly: Outer = generateForDays(30);
export let outerYearly: Outer = generateForDays(365);

export function logVisit(uuid: string) {
    const post = inner.find((post) => post.uuid === uuid);
    if (isVoid(post)) {
        inner.push({ uuid, visited: [1] });
    } else {
        post.visited[0] += 1;
    }
}

function generateForDays(days: number, amount = 50) {
    return inner.map((post) => {
        return {
            uuid: post.uuid,
            visited: post.visited.slice(0, days).reduce((a, b) => a + b, 0),
        };
    }).sort((a, b) => a.visited - b.visited)
        .slice(0, amount);
}

export function updateAll() {
    outerDaily = generateForDays(1);
    outerWeekly = generateForDays(7);
    outerMonthly = generateForDays(30);
    outerYearly = generateForDays(365);
}

export function newDay() {
    // 最多保持1000天的记录
    inner.forEach((post) => {
        post.visited = [0, ...post.visited.slice(0, 1000)];
    });
}

export function msToNext24() {
    return new Date(
        new Date().toDateString(),
    ).getTime() + 24 * 60 * 60 * 1000 - new Date().getTime();
}

export function updateInner(newInner: Inner) {
    inner = newInner;
}
