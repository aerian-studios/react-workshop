import React, { useState } from "react";
import { DogImage } from "./DogPicture";
import { DogPicker } from "./DogPicker";

export const App = () => {
    const [breed, setBreed] = useState();
    return (
        <main>
            <DogPicker onChange={setBreed} />
            <DogImage breed={breed} />
        </main>
    );
};
