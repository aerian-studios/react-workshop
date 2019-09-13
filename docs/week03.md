# ⚛️ React next steps ⚛️

## Week 01 - the cycle of life

### Natural reaction

We've learned about React components and when and how to make components. We've
learned about `props` and `useState`, how these `states` flow downward to child
components, and how React uses these to refresh your components automatically.
In this lesson we'll be looking at the "nature" of the React component function
or render function as well as the tools that React provides us to work with it;
hooks.

A render function is just a normal JavaScript function; it runs in order from
top to bottom and is always executed in the same way. It's purpose is to spit
out some UI as efficiently as possible. The function could be run in exactly the
same way many times per second or only once per session (when `state` or `props`
change), so it must not be reliant on expensive operations like fetching data,
etc and it can't keep variables as memory state. Clearly we need to do things
like get data somehow and keep track of state progress... and that is why react
provides us with a set of tools for each of these purposes.

### Hooks

[The hooks API reference](https://reactjs.org/docs/hooks-reference.html).

For simplicity we are going to focus on:

-   useState: used for remembering state from one function call (render) to the
    next
-   useEffect: used for expensive tasks, asynchronous tasks (like data
    fetching), or generally affecting things outside of the render flow
-   useCallback: used for wrapping function dependencies so that they don't
    cause rerenders (don't worry more on this later!)

Bearing in mind that render functions are normal JavaScript fuctions and
therefore execute just like them, let's setup a component render function so
that we can see the effect of these tools.

```javascript=
export const Lifecycle = () => {
    console.log(`1) Starting Lifecycle, count is ${count}`);

    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log(`2) count is ${count}`);
    }, [count]);

    console.log(`3) count is ${count}`);

    const increment = useCallback(() => {
        console.log(`4) Callback::count is ${count}`);

        setCount(count + 1);

        console.log(`5) Callback::count is ${count}`);
    }, [count]);

    console.log(`6) count is ${count}`);

    return <p>count is {count}</p>;

/* Logs:
 * 1) Starting Lifecycle, count is undefined
 * 3) count is 0
 * 6) count is 0
 * 2) count is 0
 */
```

DON'T PANIC! This is all very normal, let's break it up and make some
observations.

1. **Normal execution order:** Notice that 1, 3 and 6 are the only console logs
   that are not in a hook? They are logged in the order they are written from
   top to bottom, exactly as one would expect. But what happened to 2, 4 and 5?
   Also notice that `count` is `undefined` at 1 because `count` is used before
   it is declared.
2. **Effects are asynchronous:** console log 2 is in the `useEffect` _callback_;
   even though useEffect is executed in the right order, React doesn't execute
   the function you pass `useEffect` until later - remember that the purpose of
   the render function is to spit out UI, so that is prioritised over the code
   in a `useEffect` because you are effectively saying that that code is either
   expensive or has nothing to do with the render. That is why 2 ends up logging
   out after the function has run.
3. **Callbacks are just functions with controls:** Notice that nothing is
   calling our `increment` function, so it isn't executed. So no 4 and 5

Okay, assuming that we are happy with the logic there, let's see what happens
when the function gets called again. We can do that by adjusting `props` or
`state`, so let's add a click handler to use our `increment` function.

```javascript=
import React, { useState, useEffect, useCallback } from "react";

export const Lifecycle = () => {
    console.log(`1) Starting Lifecycle, count is ${count}`);

    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log(`2) count is ${count}`);
    }, [count]);

    console.log(`3) count is ${count}`);

    const increment = useCallback(() => {
        console.log(`4) Callback::count is ${count}`);

        setCount(count + 1);

        console.log(`5) Callback::count is ${count}`);
    }, [count]);

    console.log(`6) count is ${count}`);

    return <p onClick={increment}>count is {count}</p>;
};
```

If I click the text twice I get the following:

```bash
1) Starting Lifecycle, count is undefined
3) count is 0
6) count is 0
2) count is 0

4) Callback::count is 0
5) Callback::count is 0

1) Starting Lifecycle, count is undefined
3) count is 1
6) count is 1
2) count is 1

4) Callback::count is 1
5) Callback::count is 1

1) Starting Lifecycle, count is undefined
3) count is 2
6) count is 2
2) count is 2

```

### Observations:

1. Okay, first thing to notice is the console logs happen in exactly the same
   order each time; 1, 3, 6, 2. The click calls our `increment` callback
   function and 4 and 5 are executed in the order that they occur in the code
2. Notice that our `count` state is always `undefined` when the function runs
   until we call React's `useState` at which point React sets our component
   render function's state to the value React has kindly remembered for us. This
   allows us to effectively remember state across renders
3. Finally, notice the subtlety that the `count` state is the same value for
   both 4 and 5, despite having called `setState` between the logs. This is
   deliberate and gives React flexibility over render, but it can be confusing.
   There are multiple ways of dealing with this, but for the time being, just
   remember it.

The final thing to address about the above code is why we used `useCallback` for
our `increment` function. In fact, in this particular case, it is unnecessary,
but if we are going to use the function anywhere else in our code (like passing
it to another component or to a hook), there are 2 very good reasons to use it:

1. In JavaScript, `() =>{} !== () => {}`. Because any 2 functions are completely
   unique, if we didn't use `useCallback`, that would mean that every time our
   component rendered `increment` would effectively be a new function.
   Consequently if another component recieved it as `props` or a hook recieved
   it as a dependency, they would essentially need to re-run themselves.
2. By using `useCallback` not only does React hold the first version of our
   function for reference, but React also gives us a way to decide if we want it
   to run... dependencies, which we'll look at a bit more after making something
   happen.

## Effective hounds

Armed with out knowledge of what each of our hook tools are for, let's find out
about some [dogs](https://dog.ceo/dog-api/documentation/)!

```javascript=
import React, { useState, useEffect, useCallback } from "react";

const fetchADog = async () => {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const json = await response.json();

    return json;
};
export const Lifecycle = () => {
    const [count, setCount] = useState(0);

    const getADogImage = async () => {
        const breeds = await fetchADog();
        console.log(breeds.message);
    };

    useEffect(() => {
        getADogImage();
    }, [count]);

    const increment = useCallback(() => {
        setCount(count + 1);
    }, [count]);

    return <p onClick={increment}>count is {count}</p>;
};
```

Great, now that we are using effects to get random dog images, the world is our
mixed metaphor!

### First task

How do we get the image to show once we have retrieved the URL for it? Consider
what causes components to render...

```javascript=
import React, { useState, useEffect, useCallback } from "react";

const fetchADog = async () => {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const json = await response.json();

    return json;
};
export const Lifecycle = () => {
    const [count, setCount] = useState(0);
    const [dogImage, setDogImage] = useState(null);

    const getADogImage = async () => {
        const breeds = await fetchADog();

        setDogImage(breeds.message);
    };

    useEffect(() => {
        getADogImage();
    }, [count]);

    const increment = useCallback(() => {
        setCount(count + 1);
    }, [count]);

    return (
        <button onClick={increment}>
            count is {count}
            <br />
            {dogImage ? <img src={dogImage} alt="" /> : "Waiting for doggot..."}
        </button>
    );
};
```

We use state to cause a render once we have retrieved the dog... now try tapping
the count text...

Notice that the image is replaced by a new image? This is entirely by mistake
and is a result of the `[count]` dependency in our `useEffect`; because count
changes on button click, that effect callback is called, triggering `getADog`...

## It all depends

The sneaky little array at the end of th e`useEffect` and `useCallback` calls,
has a very big effect on the render and execution. It is an array of any
variables from within the component that is used in the function we pass to
these React functions. React won't renew the function with new reference values
and in some cases (`useEffect`) won't even call the function again if the
dependencies don't change.

We can test this by tweaking the dependencies. Let's start by removing the
dependency in `useEffect`:

```javascript=
import React, { useState, useEffect, useCallback } from "react";

export const Lifecycle = () => {
    console.log(`1) Starting Lifecycle, count is ${count}`);

    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log(`2) count is ${count}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log(`3) count is ${count}`);

    const increment = useCallback(() => {
        console.log(`4) Callback::count is ${count}`);

        setCount(count + 1);

        console.log(`5) Callback::count is ${count}`);
    }, [count]);

    console.log(`6) count is ${count}`);

    return <p onClick={increment}>count is {count}</p>;
};

/* Logs:
1) Starting Lifecycle, count is undefined
3) count is 0
6) count is 0
2) count is 0

4) Callback::count is 0
5) Callback::count is 0

1) Starting Lifecycle, count is undefined
3) count is 1
6) count is 1

4) Callback::count is 1
5) Callback::count is 1

1) Starting Lifecycle, count is undefined
3) count is 2
6) count is 2
 * /
```

Notice that by ommiting the dependency from the `useEffect`, console log 2 is
only ever called one time at first render despite `count` changing everywhere
else in the function? We have eslint rules to prevent this happening (hence the
eslint disable line). In fact, there are use cases for having a `useEffect` that
we only call the first time a component renders, but the eslint rule forces us
to do that consciously.

If we look at what happens when we remove the dependency from the `increment`
callback and replace the one for `useEffect`, we might get an insight into why
this is the case.

```javascript=
import React, { useState, useEffect, useCallback } from "react";

export const Lifecycle = () => {
    console.log(`1) Starting Lifecycle, count is ${count}`);

    const [count, setCount] = useState(0);

    useEffect(() => {
        console.log(`2) count is ${count}`);
    }, [count]);

    console.log(`3) count is ${count}`);

    const increment = useCallback(() => {
        console.log(`4) Callback::count is ${count}`);

        setCount(count + 1);

        console.log(`5) Callback::count is ${count}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    console.log(`6) count is ${count}`);

    return <p onClick={increment}>count is {count}</p>;
};

/* I click 4 times and get these logs:
1) Starting Lifecycle, count is undefined
3) count is 0
6) count is 0
2) count is 0

4) Callback::count is 0
5) Callback::count is 0

1) Starting Lifecycle, count is undefined
3) count is 1
6) count is 1
2) count is 1

4) Callback::count is 0
5) Callback::count is 0

1) Starting Lifecycle, count is undefined
3) count is 1
6) count is 1

4) Callback::count is 0
5) Callback::count is 0

4) Callback::count is 0
5) Callback::count is 0
*/
```

WHAAA!? :scream:. Again, DON'T PANIC... this odd behaviour is er... perfectly
reasonable...

1. **We still have execution order:** 1, 3, 6; it is the stuff in the hooks that
   becomes confusing. This is our first clue.
2. **What the effect?** The effect (console log 2) is executed once on first
   render, when `count` is 0 and once more when it changes to 1, after that it
   simply doesn't fire. This is because `count`, its only dependency, doesn't
   change after that (which we can see from the third render). This behaviour is
   exactly the same as the behaviour we saw above when we removed the dependency
   from the `useEffect`; effectively the effect with no dependencies gets
   initiated (called once) and doesn't get called again because its dependencies
   don't change.
3. **Callbacks don't change:** Very telling is that the `count` is always 0 in
   the Callback logs. It gives us clues about what React does with the callbacks
   and the dependencies; simplistically, when the callback is taken over by
   React, all the dynamic values inside it are stuck in time (in this case
   `count` is 0 and stays 0). React then uses the dependency array to check if
   any of those values have changed. This is why we both need to be careful to
   include dependencies and also to make the dependencies something that can be
   evaluated with `===` corretly (remmber `() => {} !== ( => {}`).
4. **Why's it rendering... or not?** Finally, we have an interesting puzzle, why
   is it rendering sometimes and not others? i. First render initialises our
   hooks: `count` transitions from undefined to 0 ii. Second render occurs
   because clicking transitions`count` from 0 to 1 iii. Third render... `count`
   doesn't change despite click number 2. I really am not sure why it renders;
   the `useEffect` doesn't call. iv. Clicks 3 and 4 don't change `count` so no
   render is correct

### Second task

Output a new dog image when the user clicks the button, but only when they click
the button. Imagine the user is on a slow network.

```javascript=
import React, { useState, useEffect, useCallback } from "react";

const fetchADog = async () => {
    const response = await fetch("https://dog.ceo/api/breeds/image/random");
    const json = await response.json();

    return json;
};

export const Lifecycle = () => {
    const [dogImage, setDogImage] = useState(null);

    const getADogImage = async () => {
        const breeds = await fetchADog();

        setDogImage(breeds.message);
    };

    useEffect(() => {
        if (dogImage === undefined) {
            getADogImage();
        }
    }, [dogImage]);

    const increment = useCallback(() => {
        setDogImage(undefined);
    }, []);

    return (
        <button onClick={increment}>
            {dogImage ? <img src={dogImage} alt="" /> : "Waiting for doggot..."}
        </button>
    );
};
```

We have stuck to the principle of letting long running tasks happen in
`useEffect` where it might have been tempting to `setDogImage` in increment, but
that would mean that our render function was waiting an unknown amount of time
for the image to load without outputting some UI!

### Final task

Make a select dropdown of [all the breeds](https://dog.ceo/api/breeds/list/all)
and get an image of that breed when a user selects one.

```javascript=
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
```

## In summary

**useState** is to remember a value between renders

**useEffect** is for doing something either long running tasks or anything
outside of the direct render of your UI. We should always put our long running
tasks and side effects in one of these. It will always run once, when the
component first runs, but will only run again if a dependency changes

**useCallback** is a way of keeping a reference to the callback passed in to the
method so that it always has a reference to the exact same function. The reason
it exists is because in javascript even identical functions are not equal, so if
we did not do this, each time the render function ran, it would create a new
function (albeit exactly the same as the last render) which would show up as a
changed dependency in hooks or a changed prop in components.
