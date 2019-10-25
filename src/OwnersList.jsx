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
