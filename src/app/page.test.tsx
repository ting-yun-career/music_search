import "@testing-library/jest-dom";

import { render } from "@testing-library/react";
import Home from "./page";

jest.mock("../actions/favourite.ts", () => ({
  getFavourites: jest.fn().mockResolvedValue({ status: "success", data: {} }),
  getFavourite: jest.fn().mockResolvedValue({ status: "success", data: true }),
}));

describe("Page component", () => {
  it("renders the search input field", async () => {
    const { getByPlaceholderText } = render(await Home());
    const searchInput = await getByPlaceholderText("Search by artist or album");
    expect(searchInput).toBeInTheDocument();
  });
});
