import React, { useCallback } from "react";
import { useDogSubBreeds } from "./lib/libDog";

export const DogPicker = ({ onChange }) => {
    const breeds = useDogSubBreeds();
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
                Object.keys(breeds).map((breed) => {
                    return breeds[breed].length ? (
                        <>
                            <optgroup label={breed}>
                                <option key={breed} value={breed}>
                                    Any {breed}
                                </option>
                                {breeds[breed].map((subbreed) => (
                                    <option
                                        key={subbreed}
                                        value={`${breed}/${subbreed}`}
                                    >
                                        {subbreed} {breed}
                                    </option>
                                ))}
                            </optgroup>
                        </>
                    ) : (
                        <option key={breed} value={breed}>
                            {breed}
                        </option>
                    );
                })}
        </select>
    );
};
