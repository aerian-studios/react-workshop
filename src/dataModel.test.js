import { extractDataByOwner, tidyDataById } from "./dataModel";
import { mockAPIResponse, mockExtractedData } from "./lib/fixtures";

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

    test("extractDataByOwner returns a useful data structure if there is no data or unexpected data", () => {
        // act
        const empty = extractDataByOwner(); // NOTE: this will fail because the code will throw a TypeError
        const wrong = extractDataByOwner(["hellow"]); // NOTE: this should also fail
        const wrongString = extractDataByOwner("hellow"); // NOTE: this should also fail

        // assert
        // the return is an object & there are the expected number of parameters
        expect(Object.keys(empty).length).toEqual(0); // This will fail if passed `undefined`
        expect(Object.keys(wrong).length).toEqual(0); // This will fail if passed `undefined`
        expect(Object.keys(wrongString).length).toEqual(0); // This will fail if passed `undefined`
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

    test("tidyDataById throws an error if there is no data or the wrong format data", () => {
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
});
