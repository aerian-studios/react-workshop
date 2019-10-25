/**
 *  Order and deduplicate data arranged by ownership
 * @param {object} data - data in ownership relationship
 * @returns {object} - sorted, deduped ownerhip relationship
 */
export const tidyDataById = (data) => {
    // check that it exists, that it is an object and not an array
    if (
        !data ||
        (data !== Object(data) || typeof data.length !== "undefined")
    ) {
        throw new Error(
            "Error: tidyDataById must be called with a valid object"
        );
    }
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

export const API_URL = "/api/latest/getdata";

export const fetchData = async () => {
    try {
        const response = await fetch(`${API_URL}`);
        return response.json();
    } catch (err) {
        throw new Error("Couldn't fetch the data", err);
    }
};

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
        return error;
    }
};
