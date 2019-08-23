## Week 2

Last week we learn how to create components that render HTML. This is fine if
you just want a static site, but most of the time we want pages that do things.
This week we will learn how to use events to do things in React, and how to use
state to make things change.

### The state we're in

If you want to do things on the web, you need to use events. React has a great
event handling system, which we can look at now. We'll create a new component to
try this out.

```jsx=
import React from "react";

export const Incrementor = () => {
    const handleClick = () => {
        console.log("I was clicked");
    };

    return (
        <div>
            <button onClick={handleClick}>Click me</button>
        </div>
    );
};
```

Now let's look at what happens when we use this to change some data.

```jsx=
import React from "react";

export const Incrementor = () => {
    let count = 0;

    const plusone = () => {
        console.log("I was clicked");
        count++;
    };

    return (
        <div>
            <button onClick={plusone}>Click me</button>
            <p>I was clicked {count} times</p>
        </div>
    );
};
```

If you try to run this, you'll see that it doesn't work. The reason for this is
that every time it updates the display, the component function is called again,
meaning it's reset to zero. What we need is "state" – a way of keeping track of
values.

We add state using a convenient function called `useState`.

```jsx
import React, { useState } from "react";

export const Incrementor = () => {
    const [count, setCount] = useState(0);

    const plusone = () => {
        setCount(count + 1);
    };

    return (
        <div>
            <button onClick={plusone}>Click me</button>
            <p>I was clicked {count} times</p>
        </div>
    );
};
```

The argument that we pass to `useState` gives the initial value. The function
returns an array of two items. The first is the actual value we're setting,
while the second item is a setter function. This slightly odd syntax is because
it allows us to give them any name we'd like.

### Data

So far we've seen how to display data inside components, but we can also create
components dynamically. The simplest example is conditionally rendering
components:

```jsx
import React, { useState } from "react";

const isEven = (num) => num % 2 === 0;

export const Incrementor = () => {
    const [count, setCount] = useState(0);

    const plusone = () => {
        setCount(count + 1);
    };

    return (
        <div>
            <button onClick={plusone}>Click me</button>
            <p>I was clicked {count} times</p>
            <p>
                That is an{" "}
                {isEven(count) ? <strong>even</strong> : <em>odd</em>} number
            </p>
        </div>
    );
};
```

We can also generate components based on data. We'll often have arrays of data
returned from an API call, for example. We can use that to generate a list of
results. Let's see this in action.

```jsx
import React, { useState } from "react";

const isEven = (num) => num % 2 === 0;

const emojis = ["🌕", "🌖", "🌗", "🌘", "🌑", "🌒", "🌓", "🌔"];

export const Incrementor = () => {
    const [count, setCount] = useState(0);

    const plusone = () => {
        setCount(count + 1);
    };

    return (
        <div>
            <button onClick={plusone}>Click me</button>
            <p>I was clicked {count} times</p>
            <p>
                That is an{" "}
                {isEven(count) ? <strong>even</strong> : <em>odd</em>} number
            </p>
            <ul>
                {emojis.map((moon) => (
                    <li key={moon}>{moon}</li>
                ))}
            </ul>
        </div>
    );
};
```

We have an array of data – here's it's emojis of the moon phases – and we use
this as a source to create components. We can do this by using `Array.map` to
generate an array of components, which we can then insert into the JSX. We can
then change this dynamically:

```jsx
import React, { useState } from "react";

const isEven = (num) => num % 2 === 0;

const emojis = ["🌕", "🌖", "🌗", "🌘", "🌑", "🌒", "🌓", "🌔"];

export const Incrementor = () => {
    const [count, setCount] = useState(0);

    const plusone = () => {
        setCount(count + 1);
    };

    return (
        <div>
            <button onClick={plusone}>Click me</button>
            <p>I was clicked {count} times</p>
            <p>
                That is an{" "}
                {isEven(count) ? <strong>even</strong> : <em>odd</em>} number
            </p>
            <ul>
                {emojis.slice(0, count).map((moon) => (
                    <li key={moon}>{moon}</li>
                ))}
            </ul>
        </div>
    );
};
```

### Exercise

Create a custom `Moon` component which, when clicked, changes to the next phase.
It should display the emoji, but also the name of the phase. You might want to
think about changing the array to have objects with the emoji and the name of
the phase. Keep the state outside the `Moon` component. You'll need to work out
how you can handle the click event.

```jsx
//Moon.jsx
import React from "react";

export const Moon = ({ emoji, name, onClick }) => (
    <figure onClick={onClick} style={{ cursor: "pointer" }}>
        <div role="img">{emoji}</div>
        <figcaption>{name}</figcaption>
    </figure>
);
```

```jsx
import React, { useState } from "react";
import { Moon } from "./Moon";

const phases = [
    { emoji: "🌕", phase: "Full" },
    { emoji: "🌖", phase: "Waning gibbous" },
    { emoji: "🌗", phase: "First quarter" },
    { emoji: "🌘", phase: "Waning crescent" },
    { emoji: "🌑", phase: "New" },
    { emoji: "🌒", phase: "Waxing crescent" },
    { emoji: "🌓", phase: "Last quarter" },
    { emoji: "🌔", phase: "Waxing gibbous" },
];

export const Incrementor = () => {
    const [count, setCount] = useState(0);

    const plusone = () => {
        setCount((count + 1) % 8);
    };

    return (
        <div>
            <p>{count}</p>
            <Moon
                name={phases[count].phase}
                emoji={phases[count].emoji}
                onClick={plusone}
            />
        </div>
    );
};
```
