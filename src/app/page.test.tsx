import "@testing-library/jest-dom";

import { render } from "@testing-library/react";
import Home from "./page";

jest.mock("../actions/favourite.ts", () => ({
  getFavourites: jest.fn().mockResolvedValue({ status: "success", data: {} }),
  getFavourite: jest.fn().mockResolvedValue({ status: "success", data: true }),
}));

describe("Home", () => {
  it("renders search input", async () => {
    const { getByPlaceholderText } = render(await Home());
    const input = await getByPlaceholderText("Search by artist or album");

    expect(input).toBeInTheDocument();
  });

  it("renders FavouriteArtists", async () => {
    const { getByText } = render(await Home());
    const favouriteArtistsText = await getByText("My Favourite Artists");
    expect(favouriteArtistsText).toBeInTheDocument();
  });
});
