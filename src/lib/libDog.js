import { useState, useEffect } from "react";

export const fetchADog = async (breed) => {
    const response = await fetch(
        breed
            ? `https://dog.ceo/api/breed/${breed}/images/random`
            : `https://dog.ceo/api/breeds/image/random`
    );
    return response.json();
};

export const useDogImage = (breed) => {
    const [dogImage, setDogImage] = useState(null);

    useEffect(() => {
        const getADogImage = async () => {
            const response = await fetchADog(breed);
            setDogImage(response.message);
        };
        setDogImage(null);
        getADogImage();
    }, [breed]);

    return dogImage;
};
