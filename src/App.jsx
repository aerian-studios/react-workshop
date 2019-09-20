import React from "react";
import { DogImage } from "./DogPicture";

export const App = () => (
    <main>
        <DogImage breed="whippet" />
        <DogImage breed="beagle" />
        <DogImage />
    </main>
);
