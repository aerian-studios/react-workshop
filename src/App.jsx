import React from "react";
import { PageHeader } from "./PageHeader";
import { InputGroup } from "./InputGroup";

export const App = () => (
    <main>
        <PageHeader pageTitle="⚛️ Movies! Movies! Movies! ⚛️">
            <form>
                <InputGroup
                    labelText="Search"
                    inputId="movie-search"
                    inputType="search"
                    placeholderText="Type movie name here..."
                >
                    <button type="submit" aria-label="Submit search">
                        <svg width="17" height="18" className="search-icon">
                            <title>Search</title>
                            <desc>
                                This icon is a free magnifying glass icon from
                                fontawesome (https://fontawesome.com)
                            </desc>
                            <path
                                d="M10.246 11.113c.883-.884 1.325-1.946 1.325-3.184 0-1.24-.44-2.299-1.32-3.18-.881-.88-1.94-1.32-3.18-1.32-1.238 0-2.298.44-3.179 1.32-.88.881-1.32 1.94-1.32 3.18 0 1.238.44 2.298 1.32 3.179.88.88 1.94 1.32 3.18 1.32 1.238 0 2.296-.438 3.174-1.315zm6.468 5.173c0 .348-.127.65-.381.904a1.236 1.236 0 0 1-.904.381c-.362 0-.663-.127-.904-.381l-3.446-3.436A6.878 6.878 0 0 1 7.071 15a6.948 6.948 0 0 1-2.747-.557 7.07 7.07 0 0 1-2.26-1.507 7.07 7.07 0 0 1-1.507-2.26A6.948 6.948 0 0 1 0 7.929C0 6.97.186 6.055.557 5.18a7.07 7.07 0 0 1 1.507-2.26 7.07 7.07 0 0 1 2.26-1.506A6.948 6.948 0 0 1 7.071.857c.958 0 1.874.186 2.748.558a7.07 7.07 0 0 1 2.26 1.506 7.07 7.07 0 0 1 1.506 2.26c.372.874.558 1.79.558 2.748 0 1.473-.415 2.809-1.246 4.007l3.446 3.446c.247.247.371.549.371.904z"
                                fill=""
                                fillRule="evenodd"
                            />
                        </svg>
                    </button>
                </InputGroup>
            </form>
        </PageHeader>
    </main>
);
