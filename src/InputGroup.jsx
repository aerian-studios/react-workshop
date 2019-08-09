import React from "react";

export const InputGroup = ({
    children,
    labelText,
    inputId,
    placeholderText,
    inputType,
}) => (
    <div className="inputGroup">
        <label htmlFor={inputId}>
            {labelText}{" "}
            <input
                type={inputType}
                id={inputId}
                placeholder={placeholderText}
            />
            {children}
        </label>
    </div>
);
