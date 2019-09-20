import React from "react";
import { useDogImage } from "./lib/libDog";
export const DogImage = ({ breed }) => {
    const dogImage = useDogImage(breed);

    return dogImage ? (
        <img src={dogImage} alt={breed || "Dog"} />
    ) : (
        "Waiting for doggo"
    );
};
