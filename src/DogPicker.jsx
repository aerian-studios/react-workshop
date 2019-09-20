import React, { useCallback } from "react";
import { useDogBreeds } from "./lib/libDog";

export const DogPicker = ({ onChange }) => {
    const breeds = useDogBreeds();
    const handleChange = useCallback(
        (event) => {
            onChange && onChange(event.target.value);
        },
        [onChange]
    );

    return (
        <select onChange={handleChange}>
            <option value="">Choose a breed...</option>
            {breeds &&
                breeds.map((breed) => (
                    <option key={breed} value={breed}>
                        {breed}
                    </option>
                ))}
        </select>
    );
};
