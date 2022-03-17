import { React, useState } from "../../deps/react.ts";
import {memoryCache} from "../../deps/freesia.ts"

const fib: (index: bigint) => bigint = memoryCache(index => {
    if(index === 0n) return 1n
    if(index === 1n) return 1n
    else return fib(index - 1n) + fib(index - 2n)
})

export function HomePage(props: { count: bigint }) {
    const [count, setCount] = useState(props.count);
    return (
        <div>
            <p>fib of {String(count)} is {String(fib(count))}</p>
            <button onClick={() => setCount(count + 1n)}>
                +1
            </button>
        </div>
    );
}
