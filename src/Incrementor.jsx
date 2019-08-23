import React, { useState } from "react";

const isEven = (num) => num % 2 === 0;

export const Incrementor = ({ emojis }) => {
    // const clickHandler = () => {
    //     console.log("Incremento!");
    // };

    const [value, setValue] = useState(0);

    const [visible, setVisible] = useState(true);

    const plusOne = () => {
        setValue(value + 1);
    };

    const odd = <strong>Odd</strong>;
    const even = <em>Even</em>;

    return (
        <>
            <div>
                {visible && <p>{value}</p>}
                <p>{isEven(value) ? even : odd}</p>
                <button onClick={plusOne}>Plus one</button>
                <button onClick={() => setVisible(!visible)}>Toggle</button>
            </div>
            <ul>
                {emojis.map((emoji) => (
                    <li key={emoji}>{emoji}</li>
                ))}
            </ul>
        </>
    );
};
