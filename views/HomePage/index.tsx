import { React, useState } from "../../deps/react.ts";

export function HomePage(props: { count: number }) {
    const fib = (index: number): [number, number] => {
        if (!Number.isInteger(index) || index < 0) {
            throw new Error("Must give an integer");
        }
        if (index === 0) return [0, 1];
        else {
            const [l2, l1] = fib(index - 1);
            return [l1, l2 + l1];
        }
    };
    const [count, setCount] = useState(props.count);
    return (
        <div>
            <p>fib of {count} is {fib(count)[1]}</p>
            <button onClick={() => setCount(count + 1)}>
                +1
            </button>
        </div>
    );
}
