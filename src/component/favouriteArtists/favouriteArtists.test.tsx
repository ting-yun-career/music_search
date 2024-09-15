import "@testing-library/jest-dom";

import { render } from "@testing-library/react";
import FavouriteArtists from "./index";

jest.mock("../../actions/favourite", () => ({
  setFavourite: "setFavourite",
}));

describe("FavouriteArtists", () => {
  it("renders", () => {
    const favourites = { "1": "Weekend", "2": "Adele" };

    const { getByText } = render(<FavouriteArtists favourites={favourites} />);
    expect(getByText("My Favourite Artists")).toBeInTheDocument();
    expect(getByText("Weekend")).toBeInTheDocument();
    expect(getByText("Adele")).toBeInTheDocument();
  });

  it("favourites is empty", () => {
    const favourites = {};
    const { getByText } = render(<FavouriteArtists favourites={favourites} />);

    expect(getByText("No favourites added yet.")).toBeInTheDocument();
  });
});
