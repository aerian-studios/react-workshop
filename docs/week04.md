## Week 02

## Custom hooks

One of the great benefits of using hooks is that it makes it a lot easier to
reuse logic across components. You can do this by creating custom hooks. These
are simply functions that use hooks, and can be called by a component. By
convention the name always begins with `use`. We're big fans of dog images, but
we have had to leap through a few hoops to get the dog images in our component
last week. Let's wrap this up into a hook that can be reused.

First we will create a hook to get a single dog image. When complete, it will
allow us to forget about all of the async and useEffect handling, and call it
like this:

```jsx
const dogImage = useDogImage("whippet");
```

First, create a new file, `useDogImage.js`, to hold our functions, and copy
across the loader functions:

```javascript
export const fetchADog = async (breed) => {
    const response = await fetch(
        `https://dog.ceo/api/breed/${breed}/images/random`
    );
    return response.json();
};
```

We want it to return a random image if no breed is specified, so we need to
change the call slightly:

```javascript
export const fetchADog = async (breed) => {
    const response = await fetch(
        breed
            ? `https://dog.ceo/api/breed/${breed}/images/random`
            : `https://dog.ceo/api/breeds/image/random`
    );
    return response.json();
};
```

We can now start to create the custom hook:

```javascript
export const useDogImage = (breed) => {
    const [dogImage, setDogImage] = useState(null);

    return dogImage;
};
```

You can use hooks in the same way as in components, so we start by creating a
state variable for the image. We then add `useEffect` to load the image from the
API:

```javascript
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
```

By defining `getADogImage` inside the `useEffect` handler we avoid any
dependency issues. We add `breed` to the dependency list for useEffect, which
means it is re-run whenever `breed` changes.

This is now usable, so we can create a new component that uses it.

```jsx=
import React from "react";
import { useDogImage } from "./lib/dogCeo";

export const DogImage = ({ breed }) => {
    const image = useDogImage(breed);
    return image ? (
        <img src={image} alt={breed || "Dog"} />
    ) : (
        "Waiting for Doggo"
    );
};
```

In App.jsx, we can see how to use it:

```jsx
import React from "react";
import { DogImage } from "./DogImage";

export const App = () => (
    <main>
        <DogImage />
        <DogImage breed="whippet" />
    </main>
);
```

Now whenever you need an image of a dog, you can drop-in this hook.

For our exercise, create a custom hook that gets the list of breeds, and then
create a component that uses it.
