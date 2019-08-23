import React from "react";

export const Moon = ({ emoji, name, onClick }) => (
    <figure
        onClick={onClick}
        style={{ cursor: "pointer", width: 100, textAlign: "center" }}
    >
        <div role="img">{emoji}</div>
        <figcaption>{name}</figcaption>
    </figure>
);
