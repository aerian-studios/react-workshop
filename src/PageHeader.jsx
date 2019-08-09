import React from "react";

export const PageHeader = ({ pageTitle, children }) => (
    <header className="page-title">
        <h1>{pageTitle}</h1>
        {children}
    </header>
);
