# ⚛️ React ⚛️

## Week 1

React is a very intuitive way of making interactive interfaces. There are some
simple rules (API) to learn and you can be writing React in next to no time. See
for yourself:

```javascript=
// Header.jsx
import React from "react";

export const Header = () => {
    return (
        <header>
            <h1>Hello react</h1>
        </header>
    );
};
```

that outputs this HTML:

```htmlmixed=
<header>
    <h1>
    Hello react
    </h1>
</header>
```

We call a React function a "component" if it outputs some markup like this (or
if it outputs something that outputs markup). You use a component as if it is
just a new HTML tag in your markup, like this:

```javascript=
// App.jsx
import React from "react";
import {Header} from "./Header.jsx";

export cont App = () => {
    return (
        <main>
            <Header />
        </main>
    );
}
```

as you may suspect, that outputs this in the browser:

```htmlmixed=
<main>
    <header>
        <h1>
        Hello react
        </h1>
    </header>
</main>
```

You can re-use components as much as you like, but, apart from that, what's the
point? After all, you can write that HTML in a normal html file right? Good
point, but hold your horses, we'll have a look at that after we get our React
into our page.

### Puttin' on the React :tophat:

Now that you can see the simple form that React uses, let's put it in our html
document.

To do this, we use the ReactDOM library, whose role is interacting with the DOM.

```javascript=
//index.tsx
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const elementToPlaceReactApp = document.querySelector(".app-root");

ReactDOM.render(<App />, elementToPlaceReactApp);
```

Above, we select a DOM element in our HTML that we want to populate with our
react app,
`const elementToPlaceReactApp = document.querySelector('.app-root');`. Then we
tell ReactDOM to render our `App` component into it.

### Summary so far

There are a few of things that are worth noting so far:

1. A react "component" is just a normal javascript function that returns
   something that looks like "DOM element/s". You will see, they are a bit more
   than DOM elements, but we can think of them as such.
2. A component is a nice way of wrapping up some structure or functionality and
   it can be used as many times as you want.
3. **React shouldn't touch the DOM/HTML.** So much so, they made a separate
   library to do that.

### Reacting to changes

Okay let's start making changes happen in our components so that we can see the
main value that React provides.

Let's update our `Header` component; Let's say that we want to add a different
emoji to the `h1`, but we don't know it ahead of time.

```javascript=
// Header.jsx
import React from "react";

export const Header = (props) => {
    return (
        <header>
            <h1>Hello react {props.emoji}</h1>
        </header>
    );
};
```

Notice that our component function is expecting to be called with an object,
which is called `props` by convention. This is the first aspect of the React API
to learn; the component function is always passed a `props` object as a
parameter; in this case it would look something like this:

```javascript=
{
    ... // other properties
    emoji: ⚛️
}
```

The other thing to notice is the syntax when outputing javascript values in the
text, `{}` - e.g. `Hello react {props.emoji}`. We'll see more of this later.

Now we are going to learn how to populate the `props` parameter. In our code
above we are expecting it to have an `emoji` property and we pass it to the
Component like so:

```javascript=
// App.jsx
import React from "react";
import {Header} from "./Header.jsx";

export const App = () => {
    return (
        <main>
            <Header emoji={⚛️} />
        </main>
    );
}
```

You can put almost anything you like as a property on a component and it will
turn up in that `props` argument of our component's function.

This becomes very useful when you need to provide a calculated value.

### Don't overreact!

I said almost anything and I mean it, you can pass functions, objects, even
other Components. The limitation is what you name things because there are some
property names that have a conventional meaning, let's have a look at some:

```javascript=
// App.jsx
import React from "react";
import {Header} from "./Header.jsx";

export cont App = () => {
    return (
        <main>
            <Header emoji={⚛️} className="a-css-class-name" style={{color: "red"}}>
                <h2 className="another-css-class-name">Hi!</h2>
                <p>Who am I?</p>
            </Header>
        </main>
    );
}


// Header.jsx
import React from "react";

export const Header = (props) => {
    return (
        <header className={props.className} style={props.style}>
            {props.children} {props.emoji}
        </header>
    )
}
```

all of the above comes out like this:

```htmlmixed=
<main>
    <header class="a-css-class-name" style="color: red;">
        <h2 class="another-css-class-name">
            Hi! ⚛️
        </h2>
        <p>Who am I?</p>
    </header>
</main>
```

Some really quite cool things here, and some not so cool...

-   The really cool thing is that you can use your `<Header>` component just
    like some other DOM elements, passing in content, etc. Notice that the
    content is passed in on the `props` object and is called `children` when we
    use it in the component. So if you pass a property in called `children`, it
    will replace this...
-   The other things we do above are add a `className` and `style`. `className`
    is javascript for the HTML `class` attribute; we have to use `className`
    because `class` already exists as a term in javascript.
-   It can be a little confusing that you have to use `className` and the other
    thing that might be a gotcha is that you can overwrite these conventional
    `props`, but this also gives us a LOT of power and there a some interesting
    patterns that people have come up with over the years that take advantage of
    this power.

## The Challenge

Make an accessible, componentised search form that we can use later to search
the movie database. Here is some markup for you.

```htmlmixed=
<main>
    <header>
        <h1>
           ⚛️ Movies! Movies! Movies! ⚛️
        </h1>
        <form>
            <div class="input-group">
                <label for="movie-search">Search for movies: <input type="search" id="movie-search" placeholder="Type movie name here..." /></label>
                <button type="submit" aria-label="Submit search">
                    <svg width="17" height="18" class="search-icon">
                        <!-- This icon is a free icon from fontawesome (https://fontawesome.com) -->
                        <title>Search</title>
                        <path
                            d="M10.246 11.113c.883-.884 1.325-1.946 1.325-3.184 0-1.24-.44-2.299-1.32-3.18-.881-.88-1.94-1.32-3.18-1.32-1.238 0-2.298.44-3.179 1.32-.88.881-1.32 1.94-1.32 3.18 0 1.238.44 2.298 1.32 3.179.88.88 1.94 1.32 3.18 1.32 1.238 0 2.296-.438 3.174-1.315zm6.468 5.173c0 .348-.127.65-.381.904a1.236 1.236 0 0 1-.904.381c-.362 0-.663-.127-.904-.381l-3.446-3.436A6.878 6.878 0 0 1 7.071 15a6.948 6.948 0 0 1-2.747-.557 7.07 7.07 0 0 1-2.26-1.507 7.07 7.07 0 0 1-1.507-2.26A6.948 6.948 0 0 1 0 7.929C0 6.97.186 6.055.557 5.18a7.07 7.07 0 0 1 1.507-2.26 7.07 7.07 0 0 1 2.26-1.506A6.948 6.948 0 0 1 7.071.857c.958 0 1.874.186 2.748.558a7.07 7.07 0 0 1 2.26 1.506 7.07 7.07 0 0 1 1.506 2.26c.372.874.558 1.79.558 2.748 0 1.473-.415 2.809-1.246 4.007l3.446 3.446c.247.247.371.549.371.904z"
                            fill=""
                            fillRule="evenodd"
                        />
                    </svg>
                </button>
            </div>
        </form>
    </header>
</main>
```

### Step 1:

The quickest way to get this html output is to copy and paste it into `App.jsx`
and then fix the `class` attributes to `className` properties (and a couple of
other reserved words). That will work, it won't give us a useful component that
we can re-use, nevertheless let's start there.

Once you've done that you'll notice that you get another error on the `for`
attribute in the `<label>` - the eslint rules in the project will be helpful in
instances like this - it is another occurrence of a reserved word in JavaScript
needing a different term, so `for` becomes `htmlFor` .

### Step 2:

So far there is no difference from just putting the html directly in the page...
in fact it is worse than doing that because html is parsed sooner and you are
delivering a massive JavaScript file before anything shows on the page... so
there needs to be a value to using React or Preact.

The value comes with reactivity and with re-usability. We can start with the
second of these. In order to think about re-use we need to think about the types
of things that we might want to reuse and equally what we won't.

We are trying to avoid making Components for the
[sake of it](https://kentcdodds.com/blog/when-to-break-up-a-component-into-multiple-components);
for example it wouldn't make sense to make a `<Header>` if all it did was wrap
the html tag, `<header>` around some components. It isn't adding anything and it
isn't encapsulating any functionality or relationship that we would need to
reuse. On the other hand we might want to make a `<PageHeader>` component that
enshrines the use of an `<h1>` for the page title for SEO and accessibility and
also these areas often have specific design requirements. Now we can use the
same Component on every page and have built in SEO and accessibility!

```javascript=
// PageHeader.tsx

import React from "react";

export const PageHeader = ({ pageTitle, children }) => (
    <header className="page-title">
        <h1>{pageTitle}</h1>
        {children}
    </header>
);

// App.tsx becomes
import React from "react";
import { PageHeader } from "../PageHeader";

export const App = () => (
    <main>
        <PageHeader pageTitle="⚛️ Movies! Movies! Movies! ⚛️">
            <form>
                <div className="input-group">
                    <label htmlFor="movie-search">
                        Search for movies:{" "}
                        <input
                            type="search"
                            id="movie-search"
                            placeholder="Type movie name here..."
                        />
                    </label>
                    <button type="submit" aria-label="Submit search">
                        <svg width="17" height="18" className="search-icon">
                            <title>Search</title>
                            <desc>
                                This icon is a free maginfying glass icon from
                                fontawesome (https://fontawesome.com)
                            </desc>
                            <path
                                d="M10.246 11.113c.883-.884 1.325-1.946 1.325-3.184 0-1.24-.44-2.299-1.32-3.18-.881-.88-1.94-1.32-3.18-1.32-1.238 0-2.298.44-3.179 1.32-.88.881-1.32 1.94-1.32 3.18 0 1.238.44 2.298 1.32 3.179.88.88 1.94 1.32 3.18 1.32 1.238 0 2.296-.438 3.174-1.315zm6.468 5.173c0 .348-.127.65-.381.904a1.236 1.236 0 0 1-.904.381c-.362 0-.663-.127-.904-.381l-3.446-3.436A6.878 6.878 0 0 1 7.071 15a6.948 6.948 0 0 1-2.747-.557 7.07 7.07 0 0 1-2.26-1.507 7.07 7.07 0 0 1-1.507-2.26A6.948 6.948 0 0 1 0 7.929C0 6.97.186 6.055.557 5.18a7.07 7.07 0 0 1 1.507-2.26 7.07 7.07 0 0 1 2.26-1.506A6.948 6.948 0 0 1 7.071.857c.958 0 1.874.186 2.748.558a7.07 7.07 0 0 1 2.26 1.506 7.07 7.07 0 0 1 1.506 2.26c.372.874.558 1.79.558 2.748 0 1.473-.415 2.809-1.246 4.007l3.446 3.446c.247.247.371.549.371.904z"
                                fill=""
                                fillRule="evenodd"
                            />
                        </svg>
                    </button>
                </div>
            </form>
        </PageHeader>
    </main>
);
```

Another prime candidate for Componentising is that
`<div className="input-group">`, in this case it is a common (and best practice)
pattern where we need to group a label, an input and possibly some other
content. It actually belies the complexity of this pattern, but let's start with
the most basic approach for what we need _and only adjust it if the need
arises_.

Let's have a go at a first pass list of the things that we want to encapsulate:

1. A block context for grouping related form elements and content - this is the
   `<div className="input-group">`
2. Form elements are correctly accompanied by a label
3. Allow arbitrary "extra" content, such as the submit button in this case, or a
   help tooltip, etc

```javascript=
// InputGroup.jsx

import React from "react";

export const InputGroup = ({ children }) => (
    <div className="input-group">
        <label>
            Search:{" "}
            <input
                type="search"
                id="movie-search"
                placeholder="Type movie name here..."
            />
        </label>
        {children}
    </div>
);
```

Very quickly we can see we need to add some criteria:

4. We can set label text
5. We can set the id/name of the input
6. We can set the input type
7. We can set the input placeholder

```javascript=
// InputGroup.jsx

import React from "react";

export const InputGroup = ({
    labelText,
    inputId,
    inputType,
    placeholderText,
    children,
}) => (
    <div className="input-group">
        <label htmlFor={inputId}>
            {labelText}{" "}
            <input
                type={inputTyoe}
                id={inputId}
                placeholder={placeholderText}
            />
        </label>
        {children}
    </div>
);
```

Okay, so according to YAGNI, we should stop there.... but just to give you an
idea of just how complex this can get consider what you would need to do if you
wanted a textara or a select? What about elements like radio buttons where the
label and input are reversed (there is actually a very nice trick you can do
with that)?

Now we have:

```javascript=
// App.tsx
import React from "react";
import { PageHeader } from "../PageHeader";
import { InputGroup } from "../InputGroup";

export const App = () => (
    <main>
        <PageHeader pageTitle="⚛️ Movies! Movies! Movies! ⚛️">
            <form>
                <InputGroup
                    labelText="Search"
                    inputId="movie-search"
                    inputType="search"
                    placeholderText="Type movie name here..."
                >
                    <button type="submit" aria-label="Submit search">
                        <svg width="17" height="18" className="search-icon">
                            <title>Search</title>
                            <desc>
                                This icon is a free magnifying glass icon from
                                fontawesome (https://fontawesome.com)
                            </desc>
                            <path
                                d="M10.246 11.113c.883-.884 1.325-1.946 1.325-3.184 0-1.24-.44-2.299-1.32-3.18-.881-.88-1.94-1.32-3.18-1.32-1.238 0-2.298.44-3.179 1.32-.88.881-1.32 1.94-1.32 3.18 0 1.238.44 2.298 1.32 3.179.88.88 1.94 1.32 3.18 1.32 1.238 0 2.296-.438 3.174-1.315zm6.468 5.173c0 .348-.127.65-.381.904a1.236 1.236 0 0 1-.904.381c-.362 0-.663-.127-.904-.381l-3.446-3.436A6.878 6.878 0 0 1 7.071 15a6.948 6.948 0 0 1-2.747-.557 7.07 7.07 0 0 1-2.26-1.507 7.07 7.07 0 0 1-1.507-2.26A6.948 6.948 0 0 1 0 7.929C0 6.97.186 6.055.557 5.18a7.07 7.07 0 0 1 1.507-2.26 7.07 7.07 0 0 1 2.26-1.506A6.948 6.948 0 0 1 7.071.857c.958 0 1.874.186 2.748.558a7.07 7.07 0 0 1 2.26 1.506 7.07 7.07 0 0 1 1.506 2.26c.372.874.558 1.79.558 2.748 0 1.473-.415 2.809-1.246 4.007l3.446 3.446c.247.247.371.549.371.904z"
                                fill=""
                                fillRule="evenodd"
                            />
                        </svg>
                    </button>
                </InputGroup>
            </form>
        </PageHeader>
    </main>
);
```
