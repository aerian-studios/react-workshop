import React from "react";

import { Incrementor } from "./Incrementor";

const emojis = ["🌕", "🌖", "🌗", "🌘", "🌑", "🌒", "🌓", "🌔"];

export const App = () => (
    <main>
        <Incrementor emojis={emojis} />
    </main>
);
