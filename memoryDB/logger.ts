import { isVoid } from "https://deno.land/x/freesia@v1.0.6/mod.ts";

type Inner = { uuid: string, visited: number[]; }[];
type Outer = { uuid: string, visited: number; }[];

const inner: Inner = [];
export let outerDaily: Outer = generateForDays(1);
export let outerWeekly: Outer = generateForDays(7);
export let outerMonthly: Outer = generateForDays(30);
export let outerYearly: Outer = generateForDays(365);


function newDay() {
    inner.forEach(post => {
        post.visited = [0, ...post.visited];
    });
}

export function logVisit(uuid: string) {
    const post = inner.find(post => post.uuid === uuid);
    if (isVoid(post)) {
        inner.push({ uuid, visited: [1] });
    } else {
        post.visited[0] += 1;
    }
}

function generateForDays(days: number, amount = 50) {
    return inner.map(post => {
        return { uuid: post.uuid, visited: post.visited.slice(0, days).reduce((a, b) => a + b, 0) };
    }).sort((a, b) => a.visited - b.visited)
        .slice(0, amount);
}

export function startUpdate(interval: number) {
    return setInterval(() => {
        outerDaily = generateForDays(1);
        outerWeekly = generateForDays(7);
        outerMonthly = generateForDays(30);
        outerYearly = generateForDays(365);
    }, interval);
}

setTimeout(() => {
    setInterval(() => newDay(), 24 * 60 * 60 * 1000);
}, new Date(
    new Date().toDateString()
).getTime() + 24 * 60 * 60 * 1000 - new Date().getTime());
