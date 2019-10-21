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
