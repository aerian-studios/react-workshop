# Integration testing

Integration tests are like a controlled real-life use cases; where unit tests
try to test your code in isolation, integration tests are tests of a subset of
your code and the links between that code. What this means in reality is that
you are testing your application in a closer way to the way an actual user will
use it... and you don't have to worry too much about mocking things... again
with the quotes from Kent C. Dodds

> The line between integration and unit tests is a little bit fuzzy. Regardless,
> I think the biggest thing you can do to write more integration tests is to
> stop mocking so much stuff. When you mock something you’re removing all
> confidence in the integration between what you’re testing and what’s being
> mocked.

An important point is that, by testing your code as it is used and by removing
the artificiality of the mocked links between your code, you can actually gain
confidence in the tested code...

> It doesn’t matter if your component `<A />` renders component `<B />` with
> props `c` and `d` if component `<B />` actually breaks if prop `e` is not
> supplied. So while having some unit tests to verify these pieces work in
> isolation isn’t a bad thing, it doesn’t do you any good if you don’t also
> verify that they work together properly. And you’ll find that by testing that
> they work together properly, you often don’t need to bother testing them in
> isolation. Integration tests strike a great balance on the trade-offs between
> confidence and speed/expense. This is why it’s advisable to spend most (not
> all, mind you) of your effort there.

Let's look at an example of what this means by writing a React component to use
the code we made in the unit testing lesson...

## Testing React components

We can test React components individually as well as when they are composed
together into more complicated components. Nevertheless, by iteslf, a component
hides a whole bunch of functionality and complexity that we have delegated to
React. If we tried to unit test this (in pure theory) we might consider trying
to mock some of the stuff React does(!)... but that would entirely defeat the
point of using React. Jest provides us with a nice way of testing React
components and we can augment this by using the excellent
`@testing-library/react`
(`yarn add -D @testing-library/react @testing-library/jest-dom`), which gives us
an opinionated way of interacting with our components.

```javascript=
import "../__mocks__/fetch"; // we don't really have an API!
import React, { useState, useEffect, useCallback } from "react";
import { extractDataByOwner, getData } from "./lib/dataModel";

export const outPutList = (owners) => {
    const list = Object.keys(owners);

    return list.map((owner) => {
        const elements = owners[owner];

        return (
            <tr key={owner}>
                <td data-testid="owner">{owner}:</td>
                <td>
                    {elements.map((element) => (
                        <span key={element}>{element}</span>
                    ))}
                </td>
            </tr>
        );
    });
};

export const OwnersList = () => {
    const [owners, setOwners] = useState(null);

    const getOwnerData = useCallback(async () => {
        const owners = await getData();
        setOwners(extractDataByOwner(owners));
    }, []);

    useEffect(() => {
        getOwnerData();
    }, [getOwnerData]);

    return owners ? (
        <table>
            <thead>
                <tr>
                    <th>Owner</th>
                    <th>Elements</th>
                </tr>
            </thead>
            <tbody>{outPutList(owners)}</tbody>
        </table>
    ) : (
        <p>No data</p>
    );
};
```

With integration tests, we can approch the test in the same way as unit tests
because this method of declaring/ decribing what the function does is actually
closer to how we make integration tests.

So let's try to declare what that function does... _"OwnersList mounts and then
tries to fetch data from an API, once it does it will get the ordered, arranged
data and change internal state. If the internal state changes it will re-render
based on the new state. If there is state it will convert that into a table to
display..."_. This is not particularly contrived; the point is that a lot of
stuff happens.

You could argue that you don't need to know a lot of that stuff, but equally you
could argue that if you don't understand what is happening, you may get strange
results, which will become evident... Here's a test using jest and the
testing-library. The testing-library is a creation of Kent C. Dodds, and so
follows his philosophy of "write fewer tests, mostly integration" - it focusses
on testing as if you were a user rather than someone who knows the way things
are built, so it provided queries for things that a user can see rather than
implementation details, like class names, etc. For the purposes of this lesson,
we'll use the jest method, `matchSnapshot` and the testing-library query,
`findByText` (i.e a user would look for some text on the page). And because we
are approaching this test as a user, all we are interested in is that there is a
table of data on the page...

```javascript=
import * as React from "react";

import { render, cleanup } from "@testing-library/react";

import { OwnersList } from "./OwnersList";

describe("OwnersList", () => {
    afterEach(cleanup);

    it("renders table correctly", () => {
        const { container } = render(<OwnersList />);
        expect(container).toMatchSnapshot();
    });
});
```

Probably you are seeing a big red warning in the test console... something about
`act`. What is more, let's look at our snapshot:

```javascript=
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`OwnersList renders table correctly 1`] = `
<div>
  <p>
    No data
  </p>
</div>
`;
```

No data!? The clues are all in the (complex version of) test declaration
above... and in the test warning
`When testing, code that causes React state updates should be wrapped into act(...)`
luckily, with the testing library we can gloss over this because it will
automatically add the `act` if we write our test expecting an change, that is to
say, we _wait_ for it to change:

```javascript=
describe("OwnersList", () => {
    afterEach(cleanup);

    it("renders table correctly", async () => {
        const { container, findByText } = render(<OwnersList />);
        expect(container).toMatchSnapshot();

        await findByText("Owner");

        expect(container).toMatchSnapshot();
    });
});
```

We've added `async/await` and `findByText` telling the testing-library to wait
for the text, "Owner" to appear. Now if you look at our snapshot, you'll see
there are actually 2, one caught before the data changes and one after. We have
been able to test all the spiel with the state changing... and if we look
closer, we can see that actually we have captured all the stuff about ordered
lists and tables and everything! This one test covers a great deal of detail, we
have even exercised a lot of the `dataModel`.

```javascript=
// Jest Snapshot v1, https://goo.gl/fbAQLP

exports[`OwnersList renders table correctly 1`] = `
<div>
  <p>
    No data
  </p>
</div>
`;

exports[`OwnersList renders table correctly 2`] = `
<div>
  <table>
    <thead>
      <tr>
        <th>
          Owner
        </th>
        <th>
          Elements
        </th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          bob
          :
        </td>
        <td>
          <span>
            first_element
            , 
          </span>
          <span>
            third_element
            , 
          </span>
        </td>
      </tr>
      <tr>
        <td>
          fred
          :
        </td>
        <td>
          <span>
            feedback
            , 
          </span>
          <span>
            fifth_element
            , 
          </span>
        </td>
      </tr>
      <tr>
        <td>
          kevin
          :
        </td>
        <td>
          <span>
            fourth_element
            , 
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</div>
`;
```

If we change anyting in the display, these tests will fail and we will have to
agree to rewriting the snapshot.

It is easy to gloss over this snapshot, but let us look at it in the light of
our unit tests. We can see the expected list of owners, ordered alphabetically;
we can see the expected elements they own; we can even see that no unexpected
owners are in the table and that the getData functions are providing data... In
effect, we have exercised all our "business logic" code as well as the component
code!

So why bother with all those unit tests, coz frankly, it was quicker to write
that one test than all that other kerfuffle...?

Well, I'm glad you asked... let's look at some pros and cons

Pros:

1. We are testing the application as it will be used, so increasing confidence
2. We are testing in a more similar way to the way we think about testing - the
   hot tap example
3. That one test exercised a lot of code
4. Less fragile - this code doesn't care how you got the data to be correctly
   formatted, as long as it arrives right, so you can change all of the business
   logic as long as it provides the correct data and this test will pass.

Cons:

1. With snapshots, you are a step in the process - you have to look at the
   snapshot and reason about it. It is worth noting that the test will fail if
   the render doesn't work for reasons other than snapshots; snapshots are just
   a good way to get more benefits from the test.
   [More on snapshots](https://benmccormick.org/2016/09/19/testing-with-jest-snapshots-first-impressions/)
2. If something goes wrong, you will get an error in a single test; you don't
   have the granularity that highlights where something has gone wrong

So what is the answer? Well, I'd say unit test code that is designed to be unit
tested - business logic is a good example of that sort - but write integration
tests where you find yourself mocking something or for UI and code that has side
effects.

You will probably still need to mock some things - e.g. you might not want to
hit a payment api with your tests or you might be in an environment that doesn't
have access to some parts referenced in your code.

### Task

Okay, the task is to add a mouse interaction to our table headers to toggle
ascending/descending order on the column and to reason about what to test and
how. We'll start with declaring the test, TDD style, so that we can see how to
write user interactions in tests
(https://testing-library.com/docs/react-testing-library/cheatsheet).

```javascript=
import { render, fireEvent, getByText } from '@testing-library/react'

describe("OwnersList", () => {
    afterEach(cleanup);

    it("renders table correctly", async () => {
        ...
    });

    it("clicking on table headings reverses the order of the table", async () => {
        const { container, findByText } = render(<OwnersList />);

        await findByText("Owner");

        // check the order is expected here
        expect(container).toMatchSnapshot();

        // Note we don't have a good way to access these elements like a user, so the testing-library provides us with one
        let owners = getAllByTestId(container, "owner");

        expect(container).toMatchSnapshot();

        fireEvent.click(getByText(container, "Owner"));

        // check the order is exected here. NOTE: you will need to await the render.

        owners = getAllByTestId(container, "owner");

        expect(container).toMatchSnapshot();
    });
});
```

We can just test this with a snapshot, but you will notice that our test doesn't
fail after we have accepted the new snapshot... so we need to add some tests...
some tests that look suspisciously like unit tests, albeit performed against the
output of a React component.

```javascript=
import { render, fireEvent, getByText, getAllByTestId } from '@testing-library/react'

describe("OwnersList", () => {
    afterEach(cleanup);

    it("renders table correctly", async () => {
        ...
    });

    it("clicking on table headings reverses the order of the table", async () => {
        const { container, findByText } = render(<OwnersList />);

        await findByText("Owner");

        // check the order is expected here
        expect(container).toMatchSnapshot();

        // Note we don't have a good way to access these elements like a user, so the testing-library provides us with one
        let owners = getAllByTestId(container, "owner");

        expect(container).toMatchSnapshot();
        expect(owners.length).toBe(3);
        expect(owners[0].textContent).toBe("bob:");
        expect(owners[1].textContent).toBe("fred:");
        expect(owners[2].textContent).toBe("kevin:");

        fireEvent.click(getByText(container, "Owner"));

        // check the order is exected here. NOTE: you will need to await the render.

        owners = getAllByTestId(container, "owner");

        expect(container).toMatchSnapshot();
        expect(owners.length).toBe(3);
        expect(owners[0].textContent).toBe("kevin:");
        expect(owners[1].textContent).toBe("fred:");
        expect(owners[2].textContent).toBe("bob:");
    });
});
```

Now we have failing tests! As a side note that we didn't have a good way to get
access to the owner elements, but the testing-library provides the idea of a
testing id, using the HTML `data-` attribute. This is not really in the spirit
of the library, but equally sometimes we need a way of programatically accessing
things! We need to alter our component to use this `data-testid`, simultaneously
giving us an opportunity to check the snapshot functionality.

The following is the complete functionality in the component.

```javascript=
import "../__mocks__/fetch"; // we don't really have an API!
import React, { useState, useEffect, useCallback } from "react";
import { extractDataByOwner, getData } from "./dataModel";

export const generateList = (owners, reverse) => {
    const items = Object.keys(owners);
    if (reverse) {
        items.reverse();
    }
    return items.map((owner) => {
        const elements = owners[owner];
        return (
            <tr key={owner}>
                <td data-testid="owner">{owner}:</td>
                <td>
                    {elements.map((element) => (
                        <span key={element}>{element}</span>
                    ))}
                </td>
            </tr>
        );
    });
};

export const OwnersList = () => {
    const [owners, setOwners] = useState(null);

    const [reversed, setReversed] = useState(false);

    const clickedHeader = useCallback(() => setReversed((r) => !r), []);

    useEffect(() => {
        const getOwnerData = async () => {
            const owners = await getData();
            setOwners(extractDataByOwner(owners));
        };
        getOwnerData();
    }, []);

    return owners ? (
        <table>
            <thead>
                <tr>
                    <th onClick={clickedHeader}>Owner</th>
                    <th>Elements</th>
                </tr>
            </thead>
            <tbody>{generateList(owners, reversed)}</tbody>
        </table>
    ) : (
        <p>Loading...</p>
    );
};
```

At this point We can see our tests start passing... and we need to perform the
final stage of test writing; seeing how we can break our function, checking for
holes in our assumptions.

1. We're covering the situation where there is no data - it displays
   `<p>Loading...</p>`
2. We aren't covering (here - we have a bunch of unit tests for that!) the
   situation where the data is malformed, which would break `generateList`.

If we didn't have a bunch of unit tests testing the data and making sure that we
had consistent returns, we would need to consider writing a unit test for
`generateList` and making any changes necessary to make them pass. You might
even choose to change the return from it so that it is easier to test... but
that is the only situation I can think of that isn't covered by these
integration tests with their unit counterparts.

## Summary

Writing your test by making a "declaration" is testing preference agnostic - you
can make the declaration about either about existing functionality or desired
functionality (TDD). The idea is to make it fit your workflow.

With new tooling it is evidently much easier to write integration tests than it
used to be, and given that they cover a lot of code and give a lot of confidence
in that code, we can agree with Kent C. Dodds' moto, "write fewer tests, mostly
integration". Then we can write unit tests for the things that are easy to write
unit tests for, like functional business logic that really is made up of units
or where we need granular coverage of particular parts of the application.
