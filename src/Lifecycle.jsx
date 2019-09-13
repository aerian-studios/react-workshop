import React, { useState, useEffect, useCallback } from "react";

const fetchADog = async () => {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    return response.json();
};

export const Lifecycle = () => {
    const [count, setCount] = useState(0);

    const [dogImg, setDogImg] = useState(null);
    const getADog = async () => {
        const dog = await fetchADog();
        setDogImg(dog.message);
        console.log(dog);
    };

    useEffect(() => {
        getADog();
    }, []);

    const increment = useCallback(() => {
        setCount(count + 1);
    }, [count]);

    return (
        <button onClick={increment}>
            {dogImg ? <img src={dogImg} alt="Dog" /> : "Waiting for dog..."}
        </button>
    );
};
