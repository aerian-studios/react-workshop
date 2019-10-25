import "../__mocks__/fetch"; // we don't really have an API!
import React, { useState, useEffect } from "react";
import { extractDataByOwner, getData } from "./dataModel";

export const generateList = (owners) =>
    Object.keys(owners).map((owner) => {
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

export const OwnersList = () => {
    const [owners, setOwners] = useState(null);

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
                    <th>Owner</th>
                    <th>Elements</th>
                </tr>
            </thead>
            <tbody>{generateList(owners)}</tbody>
        </table>
    ) : (
        <p>Loading...</p>
    );
};
