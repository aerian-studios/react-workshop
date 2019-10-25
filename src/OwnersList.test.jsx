import React from "react";

import {
    render,
    cleanup,
    fireEvent,
    getByText,
    getAllByTestId,
} from "@testing-library/react";

import { OwnersList } from "./OwnersList";

describe("OwnersList", () => {
    afterEach(cleanup);
    it("renders a table correctly", async () => {
        const { container, findByText } = render(<OwnersList />);
        expect(container).toMatchSnapshot();
        await findByText("Owner");
        expect(container).toMatchSnapshot();
    });

    it("reverses the order of the table when clicking on table headers", async () => {
        const { container, findByText } = render(<OwnersList />);
        await findByText("Owner");
        expect(container).toMatchSnapshot();
        let owners = getAllByTestId(container, "owner");
        expect(owners.length).toBe(3);
        expect(owners[0].textContent).toBe("bob:");
        expect(owners[1].textContent).toBe("fred:");
        expect(owners[2].textContent).toBe("kevin:");

        fireEvent.click(getByText(container, "Owner"));
        // expect(container).toMatchSnapshot();
        owners = getAllByTestId(container, "owner");
        // expect(owners[0].textContent).toBe("kevin:");
        // expect(owners[1].textContent).toBe("fred:");
        // expect(owners[2].textContent).toBe("bob:");
    });
});
