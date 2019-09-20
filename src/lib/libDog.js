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

export const fetchAllTheDogs = async () => {
    const response = await fetch("https://dog.ceo/api/breeds/list/all");
    return response.json();
};

export const useDogBreeds = () => {
    const [dogBreeds, setDogBreeds] = useState([]);

    useEffect(() => {
        const getAllTheDogs = async () => {
            const breeds = await fetchAllTheDogs();
            setDogBreeds(Object.keys(breeds.message));
        };
        getAllTheDogs();
    }, []);
    return dogBreeds;
};

export const useDogSubBreeds = () => {
    const [dogBreeds, setDogBreeds] = useState({});

    useEffect(() => {
        const getAllTheDogs = async () => {
            const breeds = await fetchAllTheDogs();
            setDogBreeds(breeds.message);
        };
        getAllTheDogs();
    }, []);
    return dogBreeds;
};
