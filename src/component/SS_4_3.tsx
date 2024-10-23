import React from 'react';
import "bootstrap/dist/css/bootstrap.css";

const useIncrement = (addAmount: number): [number, () => void] => {
    const [count, setCount] = React.useState(0);
    const increase = () => {
        setCount((count) => count + addAmount);
    };
    return [count, increase];
}
const Counter1 = () => {
    const [count, increase] = useIncrement(1);
    return (
        <>
            <h1>Count: {count}</h1>
            <button onClick={increase}>Add 1</button>
        </>
    );
}
const Counter2 = () => {
    const [count, increase] = useIncrement(2);
    return (
        <>
            <h1>Count: {count}</h1>
            <button onClick={increase}>Add 2</button>
        </>
    );
}
export {Counter1, Counter2};