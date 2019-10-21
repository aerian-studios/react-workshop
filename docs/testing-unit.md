# Testing; JavaScript and React

This lesson is about writing tests and general to approaches it. It isn't about
which testing framework to use, though you will use different frameworks for
different types of test (we use [Jest](https://jestjs.io/) for most types, and
[SmashTest](https://smashtest.io/) for some). It also isn't about whether TDD is
better than BDD, etc. +\_+

## Types of test and why

Firstly, as this is a lesson about testing in this day and age, a quote from
Kent C Dodds...

> Often I find myself saving time when I put time in to write tests. It may or
> may not take longer to implement what I'm building, but I (and others) will
> almost definitely save time maintaining it.

That is the most likely reason that you would want to test, but there are other,
more subtle reasons to write tests that we will go into, but first let's talk
about what is a test and types of test.

### What makes a test?

The structure of **any test** is fairly consistent, though there may be
intermediate steps. When testing, it is a good idea to keep each part of the
test separate at least in your mind, if not physically.

1. Preparation for testing
2. Setup for a test
3. **Action to test**
4. **Assertion**
5. Clean up

The core of any test is 3 and 4; run an action and then check that it conforms
to expectation. The other steps arise in more complex scenarios. To help
delinneate the phases of the test we'll label them phases and keep them separate
in our tests.

### Types of test

To keep things simple, we are going to say there are 3 types of _automated_
tests: Unit, Integration and End to End - I know this is debatable with modern
tooling... There are any number of other tests that we can run, such as
acceptance testing, user testing, load testing, smoke testing...etc. We will
focus on those first 3 in this course.

To illustrate the qualities of these tests, we'll use a quotidian example,
washing the dishes.

Let us say our purpose is to wash dishes for an upcoming party. An "End to End"
(E2E) test would be to do a dry run and wash some dishes. In this way, we test
the purpose of our scenario and "exercise" all parts of the process _as it will
be used_, albeit in a controlled way. This type of test will highlight if
something somewhere in the complex system has broken.

An integration test would be more granular, like checking for hot water - turn
on a tap, hold hand under water, if temperature changes, the water is hot. This
test is more granular than the E2E test, but it still exercises a number of
parts of the system. This type of test can help understanding how discrete parts
of a system work together and for modelling as a person might use a part of the
system. These tests provide more granular and reasonable errors than E2E tests.

Unit tests test "units" of code **in isolation**. So in the example of the hot
water integration test above, that would be split up into. Tap turns; Tap turns
in one direction; Tap doesn't turn in the other direction; Water is present; Hot
water is turned on.... etc. As you can see this is NOT how we'll be using the
system to wash the dishes, but it tries to exercies all of the parts of that
system in isolation. This type of test will highlight the exact part of the
system that stops working.

In this lesson, we'll be looking in more detail at unit tests...

### Unit tests

The specifics of unit tests are:

1. **They test "units" of code in isolation**.
2. **They should be quick and easy to write**.
3. **They assert 1 thing at a time**.
4. **They are reliant on code being written to be testable as units** (funtional
   programming methodology works really well for unit tests because each
   function is a standalone unit of functionality and has consistent
   input/output). A function that does multiple things and has side-effects is
   very hard to unit test - e.g. checks a DOM element and then scrolls another
   element and then runs a third party module against that element.
5. As they are simple, **they behave as a very readable documentation** for the
   purpose and use of your code

Let's look at what some of this means with a unit test for an ideal function:

```javascript=
// function.js
/**
 * Adds 1 to any number passed in
 * @param {number} n - a number to add 1 to
 * @returns {number}
 */
const addOne = (n) => n + 1;

// function.test.js
describe("addOne", () => {
    test("adds 1 to any number passed", () => {
        // act
        const two = addOne(1);
        const ten = addOne(9);
        ... // any number of actions

        // assert
        expect(two).toEqual(2);
        expect(ten).toEqual(10);
        ... // any number of assertions
    });
})
```

As you can see, great things about this unit test are:

1. It is quick and easy to write.
2. It only tests one thing at a time.
3. We can see how to use our function and what it does.
4. It will fail if we change the function intention by outputing, e.g. a string
   of the number + 1.
5. Because of the above, we can now rely on the function to add 1 to a number
   even if we refactor the code in the function.

With that under out belt, let's look at some of the down sides and hard things
about unit tests.

Unit testing and to some degree, all testing, is not our natural way of thinking
about things:

1. We normally make check **if** something true rather than **that** something
   is true. "If" has a context - e.g. if the temperature of the water changes...
   then it is the hot water tap. Whereas "that" is just checking a thing - I am
   checking that this is the hot tap, so I need to check that the water
   temperature changes...
2. Related to this, we need to get used to splitting up our assumptions and
   assetations like this
3. Furthermore we need to think about the things that we haven't been thinking
   about; what are our assumptions? In a way unit tests help with this, if we
   write them well.

As an example, can you see what we failed to test above..? What happens if a
user calls our function without a number, or with "9" instead of 9, or with
`NaN`? It is good to be intentional about things like that (that said, that kind
of thing is an order of error that can be almost entirely wiped out by _correct_
use of tools such as TypeScript and ESLint).

Another quote from Kent...

> The thing you should be thinking about when writing tests is how much
> confidence they bring you that your project is free of bugs. Static typing and
> linting tools like TypeScript and ESLint can get you a remarkable amount of
> confidence, and if you're not using these tools I highly suggest you give them
> a look. That said, even a strongly typed language should have tests. Typing
> and linting can't ensure your business logic is free of bugs. So you can still
> seriously increase your confidence with a good test suite.

One thing to remember is that it takes practice to make assertions... and you
get used to it.

Recently I have started adressing the above difficulties by changing the way I
write unit tests. I used to try to try make lots of simple assertions about my
functions; it worked but it was hard. Also given the use case of the tests as
documentation in conjunction with the granularity of assertions. I have started
a new practice that has 3 steps to get to a good test for a function.

1. Making an explicit description of _exactly what the function under test does_
   as the "test statement" - the text in the
   `test("test statement here", () => {})`
2. Then deconstruct that statement in the test as much as possible in to single
   assertions. Well written functions will have only a handful of possible
   assertions...
3. Once the expected behaviour has been delinneated and tested, that gives me a
   way to deliberately think of what could happen that I haven't covered in my
   test statement and then test that; test the broken function.

The better the code is written, the easier to test. So let's look at the
difference between writing tests for "ideal" code and writing tests for
dependant code and the tools/patterns for dealing with them (and while we're at
it we can look a little closer at the anatomy of a test).

This code is a common use case for unit tests, modelling data:

```javascript=
// dataModel.js

/**
 *  Order and deduplicate data arranged by ownership and remove owners with no property
 * @param {object} data - data in ownership relationship
 * @returns {object} - tidied data
 */
export const tidyDataById = (data) => {
    const sortedOwnerIds = Object.keys(data).sort();
    const sortedOwners = {};

    for (const owner of sortedOwnerIds) {
        const elementList = [...new Set(data[owner].sort())];

        if (!elementList.length) {
            continue;
        }

        sortedOwners[owner] = elementList;
    }

    return sortedOwners;
};

/**
 * Create a consistent set of data for owners and elements
 * @param {object} data - raw data returned from API
 * @returns {object} - raw data arranged per owner
 */
export const extractDataByOwner = (data) => {
    const owners = {};

    data.elements.forEach((element) => {
        element.put.forEach((owner) => {
            if (typeof owners[owner] === "undefined") {
                owners[owner] = [];
            }

            owners[owner].push(element.id);
        });
    });

    data.owners.forEach((owner) => {
        if (!owners.hasOwnProperty(owner)) {
            owners[owner] = [];
        }
    });

    return tidyDataById(owners);
};
```

Okay, let's look at `extractDataByOwner`. It follows 2 of my 3 primary rules for
good functions: it is named (as a verb) clearly after what it does; it does one
thing; but it is not 7 lines or fewer. It does, nevertheless also fulfill 2 of
my 3 secondary rules for better functions: it has a consistent return; it always
returns the same, given the same input (assuming `tidyDataById` does); and that
shows why this 3rd rule exists - ~~it has no side effects or external
dependancies~~ because it relies on `tidyDataById` (this is not necessarily an
issue as long as the dependency is itself dependable as `tidyDataById` is, but
have a look at the trouble it gives us below).

Neither `tidyDataById` nor `extractDataByOwner` meet thes 7 line rule; we could
make them with some further abstractions, but let's not optimise too early and
get on with some working, tested code before we try that.

So how to test these functions? Let's start by stating what we want to test in
the function, `extractDataByOwner` by explicitly describing what it does:

```javascript=
// dataModel.test.js
import { extractDataByOwner } from "./dataModel"

describe("dataModel", () => {// the describe block should tell us the context

    test("extractDataByOwner parses raw data into a list ordered by owner", () => {
        // test should describe what we want to test as explicitly as possible
    ...
    })

})
```

We declare a test as explicitly as possible, _"extractDataByOwner parses raw
data into a list ordered by owner"_; notice that, like the hot tap test, there
are lots of implicit as well as explicit expectations?

Let's break them down:

```javascript=
// dataModel.test.js
import { extractDataByOwner } from "./dataModel";

describe("dataModel", () => {
    // the describe block should tell us the context

    test("extractDataByOwner parses raw data into a list ordered by owner", () => {
        // the function returns something
        // given the input, the return contains 3 somethings (owners)
        // given the input, there are specific owners and nothing else
        // the owners are listed alphabetically
        // the correct ownership to be represented
    });
});
```

okay so let's write those tests

```javascript=
// dataModel.test.js
import { extractDataByOwner } from "./dataModel";

describe("dataModel", () => {
    test("extractDataByOwner parses raw data into a list ordered by owner", () => {
        // act
        const producers = extractDataByOwner(mockAPIResponse);
        const ids = Object.keys(producers);

        // the function returns something
        // given the input, the return contains 3 somethings (owners)
        expect(ids.length).toBe(3);

        // given the input, there are specific owners and nothing else
        expect(producers.fred).toBeDefined();
        expect(producers.kevin).toBeDefined();
        expect(producers["bob"]).toBeDefined();
        expect(producers["persona-non-grata"]).not.toBeDefined();

        // the owners are listed alphabetically
        expect(producers.fred).toEqual(producers[ids[1]]);
        expect(producers.kevin).toEqual(producers[ids[2]]);
        expect(producers.bob).toEqual(producers[ids[0]]);

        // the correct ownership to be represented
        expect(producers.fred.length).toEqual(2);
        expect(producers.kevin.length).toEqual(1);
        expect(producers["bob"].length).toEqual(2);
    });
});
```

Notice that essentially we are implicityly testing the output of `tidyDataById`?
Although `tidyDataById` is exercised by this call, it would be better to be
explicit in our test and test our code units in isolation, not least because it
may highlight some of our assumptions. So let's rewrite our test to be a bit
more explicit:

```javascript=
// dataModel.test.js
import { extractDataByOwner, tidyDataById } from "./dataModel";
import { mockAPIResponse, mockExtractedData } from "../libs/fixtures";

describe("dataModel", () => {
    // the describe block should tell us the context

    // first: adjust the test statement to only describe what `extractDataByOwner` does
    test("extractDataByOwner parses raw data into a list arranged by owner", () => {
        // act
        const owners = extractDataByOwner(mockAPIResponse);
        const ids = Object.keys(owners);

        // the function returns something
        // given the input, the return contains 3 somethings (owners)
        expect(ids.length).toBe(3);

        // given the input, there are specific owners
        expect(owners.fred).toBeDefined();
        expect(owners.kevin).toBeDefined();
        expect(owners["bob"]).toBeDefined();
        // we specifically don't test against invalid owners here as it is part of tidyDataById

        // the correct ownership to be represented
        expect(owners.fred.length).toEqual(2);
        expect(owners.kevin.length).toEqual(1);
        expect(owners["bob"].length).toEqual(2);
    });

    test("tidyDataById orders, deduplicates and removes empty owners and atrributions from arranged data", () => {
        // setup test:: In order to test this we can make a fixture from the output of `extractDataByOwner` but before tidy is called

        // act
        const tidy = tidyDataById(mockExtractedData);
        // setup test
        const ids = Object.keys(tidy);

        // Only expected owners are present
        expect(ids.length).toBe(3);
        expect(tidy.fred).toBeDefined();
        expect(tidy.kevin).toBeDefined();
        expect(tidy["bob"]).toBeDefined();
        expect(tidy["persona-non-grata"]).not.toBeDefined();

        // owners are alphabetically ordered
        expect(tidy.fred).toEqual(tidy[ids[1]]);
        expect(tidy.kevin).toEqual(tidy[ids[2]]);
        expect(tidy.bob).toEqual(tidy[ids[0]]);

        // the correct ownership to be represented
        expect(tidy.fred.length).toEqual(2);
        expect(tidy.kevin.length).toEqual(1);
        expect(tidy.bob.length).toEqual(2);
    });
});
```

We have been more clear about which piece of code is responsible for what, which
means that we can be more specific about where errors are occurring.

We were more explicit about what we were testing in the test description and
explicityly test our expectations for `tidyDataById` and `extractDataByOwner`
separately; many of the tests seem to be repetition, but they are testing
different code.

Finally, having delinneated the happy path and written tests, we must examine
our assumptions and test the broken function... e.g. the situation where
`extractDataByOwner` and `tidyDataById` are passed no data...

The best option is to hark back to the rules for functions and ensure consistent
returns but we'll do a couple of things for the sake of coverage of solutions.
Let's try TDD and write the tests first...

```javascript
// dataModel.test.js
...
    test("extractDataByOwner returns a useful data structure if there is no data or unexpected data", () => {
        // act
        const empty = extractDataByOwner();// NOTE: this will fail because the code will throw an error
        const wrong = extractDataByOwner(["hellow"])
const empty = extractDataByOwner(); // NOTE: this will fail because the code will throw a TypeError
        const wrong = extractDataByOwner(["hellow"]); // NOTE: this should also fail
        const wrongString = extractDataByOwner("hellow"); // NOTE: this should also fail

        // assert
        // the return is an object & there are the expected number of parameters
        expect(Object.keys(empty).length).toEqual(0); // This will fail if passed `undefined`
        expect(Object.keys(wrong).length).toEqual(0); // This will fail if passed `undefined`
        expect(Object.keys(wrongString).length).toEqual(0); // This will fail if passed `undefined`
    });

    test("tidyDataById throws an error if there is no data or unexpected data", () => {
        // to be true TDD we need it to fail first so we'd do this:
        // const empty = tidyDataById();
        // const wrong = tidyDataById(["hellow"]);
        // But jest gives us this method to test errors
        // act & assert
        // Tidy throws
        expect(() => {
            tidyDataById();
        }).toThrow();

        expect(() => {
            tidyDataById(["hellow"]);
        }).toThrow("Error: tidyDataById must be called with a valid object");
        expect(() => {
            tidyDataById([]);
        }).toThrow("Error: tidyDataById must be called with a valid object");
        expect(() => {
            tidyDataById(null);
        }).toThrow("Error: tidyDataById must be called with a valid object");
        expect(() => {
            tidyDataById(21);
        }).toThrow("Error: tidyDataById must be called with a valid object");
        expect(() => {
            tidyDataById("hellow");
        }).toThrow("Error: tidyDataById must be called with a valid object");
    });

...


// dataModel.js
/**
 * Order and deduplicate data arranged by ownership
 * @param {object} data - data in ownership relationship
 * @returns {object} - sorted, deduped ownerhip relationship
 */
export const tidyDataById = (data) => {
    // even though this would throw as soon as it hit the Object.keys line, we are being intentional about this...
    if (!data || data !== Object(data) || typeof data.length !== "undefined") {
        throw new Error(
            "Error: tidyDataById must be called with a valid object"
        );
    }

    const sortedOwnerIds = Object.keys(data).sort();
    const sortedOwners = {};

    for (const owner of sortedOwnerIds) {
        const elementList = [...new Set(data[owner].sort())];

        // remove owners with no attribution
        if (!elementList.length) {
            continue;
        }

        sortedOwners[owner] = elementList;
    }

    return sortedOwners;
};

/**
 * Create a consistent set of data for owners and elements
 * @param {object} data - raw data returned from API
 * @returns {object} - raw data arranged per owner
 */
export const extractDataByOwner = (data) => {
    const owners = {};

    if (!data || !data.owners || !data.elements) {
        return owners;
    }

    data.elements.forEach((element) => {
        element.put.forEach((owner) => {
            if (typeof owners[owner] === "undefined") {
                owners[owner] = [];
            }

            owners[owner].push(element.id);
        });
    });

    data.owners.forEach((owner) => {
        if (!owners.hasOwnProperty(owner)) {
            owners[owner] = [];
        }
    });

    return tidyDataById(owners);
};

```

As you can see the unexpected test cases are almost as prevalent as the
expected! It is very important to test these and to allow your tests to fail.

Even though there was some tie in, this code was realy simple, but what to do
when your code uses 3rd party libraries or has side effects?

#### Spys and Mocks

Most testing libraries realise that the isolation requirement is a hard problem,
so they provide utilities to manage isolation.

The most common is the
[mock fuction or spy](https://jestjs.io/docs/en/mock-functions.html). It allows
you to test the links between code by replacing the actual implementation of the
mocked/spied functions with a test utility that allows you to return what you
want from the function, check how many times it is called and with what.
Integration tests allow us to mock less, because we want to test the actual
links between our code.

By example of this principle, in our `dataModel.js`, let's add the actual call
to the data because that would represent some side effect.

```javascript
// dataModel.js
const API_URL = "/api/latest/getdata";

export const fetchData = async () => {
    try {
        const response = await fetch(`${API_URL}`);
        return response.json();
    } catch (err) {
        throw new Error("Couldn't fetch the data");
    }
};

// Utility to help with consistent returns
export const emptyElementAPI = {
    owners: [],
    elements: [],
};

export const getData = async () => {
    try {
        const dataResp = await fetchData();

        if (dataResp && dataResp.constructor === Object) {
            return dataResp;
        }
        return emptyElementAPI;
    } catch (error) {
        console.warn("There was an error fetching the data.", error);
        return emptyElementAPI;
    }
};
```

If we look at `getData`, firstly note that it has a consistent return, which
makes testing it easier. We've deliberately not included the actual connection
to the data in this function (that is in `fetchData`); it's sole function is to
ensure consistent returns from attempts to hit the API. So test statement for it
should be quite simple: "getData attempts to fetch the data and returns an
expected structure".

```javascript=
// dataModel.test.js
import { extractDataByOwner, tidyDataById, getData } from "./dataModel";

describe("dataModel", () => {
    // We can use `async/await` in jest tests
    test("getData attempts to fetch the data and returns an expected structure", async () => {
        // act
        const data = await getData();

        // assertion
        expect(data.owners).toBeDefined();
        expect(data.elements).toBeDefined();
    });
});
```

You'll see we get a big warning along the lines
of`There was an error fetching the data. Error: Couldn't fetch the data`. The
test is actually trying to hit our API! This would be slow and contingent on any
number of external things like network connection, etc, whereas unit tests are
supposed to be fast and tested in isolation... We are not trying to test that
fetch works, we're trying to test the output from our function. Enter Mocks.

It is really common that we need to mock the global `fetch` function, so let's
make a simple one specific to our needs, we need a new file
`/__mocks__/fetch.js`.

```javascript=
import { API_URL } from "../src/lib/dataModel.js";
import { mockAPIResponse } from "../src/lib/fixture.js"; // extract this out

const fetch = async (url) => {
    if (url === API_URL) {
        return Promise.resolve({
            json: () => Promise.resolve(mockAPIResponse),
        });
    }
};

// eslint-disable-next-line no-undef
global.fetch = fetch;

export default fetch;
```

This is a very simple mock, that could be made better, but in the spirit of
YAGNI, we have this.In our case we set our mock fetch function to be the
`global` fetch with this module. Now we just need to make sure that it is
imported before our function that uses it in our test file.

```javascript=
// dataModel.test.js
import "../../__mocks__/fetch";
import { extractDataByOwner, tidyDataById, getData } from "./dataModel";
```

et voila, our warnings vanish. Generally you'd want fetch mocked for all unit
tests and jest has ways to do this, but we can handle that in later lessons.
Furthermore we could write this so that we could control if a fetch failed or
not so that we could test unexpected paths.

## Summary

Unit testing is great for code that is written well to be unit tested because it
is quick, granular and allows us to address assumptions in our code, not just
the happy path. A suite of well written unit tests will help with confidence
refactoring code and with a kind of documentation of the code purpose. The
appropriate use of mocks can help us keep our units isolated.

But code is not really isolated, and some situations don't allow us to isolate
the code, this is where integration tests come into play.
