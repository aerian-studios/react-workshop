import React from "react";

export const Header = (props) => {
    console.log(props);
    return (
        <header className="a-css-class">
            {props.children} <span role="img">{props.emoji}</span>
        </header>
    );
};
