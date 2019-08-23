import React, { useState } from "react";
import { Moon } from "./Moon";

const phases = [
    { emoji: "🌕", phase: "Full" },
    { emoji: "🌖", phase: "Waning gibbous" },
    { emoji: "🌗", phase: "First quarter" },
    { emoji: "🌘", phase: "Waning crescent" },
    { emoji: "🌑", phase: "New" },
    { emoji: "🌒", phase: "Waxing crescent" },
    { emoji: "🌓", phase: "Last quarter" },
    { emoji: "🌔", phase: "Waxing gibbous" },
];

export const Incrementor = () => {
    const [count, setCount] = useState(0);

    const plusone = () => {
        setCount((count + 1) % 8);
    };

    return (
        <div>
            <Moon
                name={phases[count].phase}
                emoji={phases[count].emoji}
                onClick={plusone}
            />
        </div>
    );
};
