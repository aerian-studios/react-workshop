import { API_URL } from "../src/dataModel";
import { mockAPIResponse } from "../src/lib/fixtures";

const fetch = async (url) => {
    if (url === API_URL) {
        return {
            json: async () => mockAPIResponse,
        };
    }
};

// eslint-disable-next-line no-undef
global.fetch = fetch;
export default fetch;
