import React, { useState, useEffect, useCallback } from "react";

const fetchADog = async (breed) => {
    const response = await fetch(
        `https://dog.ceo/api/breed/${breed}/images/random`
    );
    const json = await response.json();

    return json;
};
const fetchAllTheDogs = async () => {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    const json = await response.json();

    return json;
};

export const Lifecycle = () => {
    const [dogImage, setDogImage] = useState(null);
    const [dogBreeds, setDogBreeds] = useState(null);

    const getADogImage = async (breed) => {
        const breeds = await fetchADog(breed);

        setDogImage(breeds.message);
    };

    const getAllTheDogs = async () => {
        const breeds = await fetchAllTheDogs();
        setDogBreeds(Object.keys(breeds.message));
    };

    useEffect(() => {
        getAllTheDogs();
    }, []);

    const handleChange = useCallback((event) => {
        setDogImage(null);
        getADogImage(event.target.value);
    }, []);

    return (
        <>
            <select onChange={handleChange}>
                {dogBreeds &&
                    dogBreeds.map((breed) => (
                        <option key={breed}>{breed}</option>
                    ))}
            </select>
            {dogImage ? <img src={dogImage} alt="" /> : "Waiting for doggot..."}
        </>
    );
};
