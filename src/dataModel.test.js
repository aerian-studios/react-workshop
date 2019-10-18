import { mockAPIResponse } from "./lib/fixtures";
import { extractDataByOwner } from "./dataModel";

describe("dataModel", () => {
    test("extractDataByOwner parses raw data into a list ordered by owner", () => {
        const producers = extractDataByOwner(mockAPIResponse);
        const ids = Object.keys(producers);

        expect(ids.length).toBe(3);

        expect(producers.fred).toBeDefined();
        expect(producers.kevin).toBeDefined();
        expect(producers["bob"]).toBeDefined();

        expect(producers["persona-non-grata"]).not.toBeDefined();

        expect(producers.fred).toEqual(producers[ids[1]]);
    });
});
