// @ts-check
import { addOne } from "./function";

describe("the addOne function", () => {
    test("adds one to any number that is passed to it", () => {
        // act
        const two = addOne(1);
        const ten = addOne(9);
        const nan = addOne();
        // assert
        expect(two).toEqual(2);
        expect(ten).toEqual(10);
        expect(isNaN(nan)).toBeTruthy();
    });
});
