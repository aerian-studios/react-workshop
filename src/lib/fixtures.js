export const mockAPIResponse = {
    owners: ["fred", "bob", "kevin", "persona-non-grata"],
    elements: [
        {
            id: "first_element",
            take: [],
            put: ["bob"],
        },
        {
            id: "feedback",
            take: ["bob"],
            put: ["fred"],
        },
        {
            id: "third_element",
            take: ["bob"],
            put: ["bob"],
        },
        {
            id: "fourth_element",
            take: ["kevin"],
            put: ["kevin"],
        },
        {
            id: "fifth_element",
            take: ["kevin", "invalid"],
            put: ["fred"],
        },
    ],
};

export const mockProducers = {
    "persona-non-grata": [],
    bob: ["first_element", "third_element"],
    kevin: ["fourth_element", "fourth_element"],
    fred: ["feedback", "fifth_element"],
};
