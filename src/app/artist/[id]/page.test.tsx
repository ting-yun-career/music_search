import "@testing-library/jest-dom";

import { render } from "@testing-library/react";
import Artist from "./page";

jest.mock("../../../actions/spotify", () => ({
  getArtist: jest.fn(),
  getArtistAlbums: jest.fn(),
}));

jest.mock("../../../actions/favourite", () => ({
  getFavourite: jest.fn(),
}));

// disable NextJS url validation on <Image />
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, ...props }) => <img src={src} {...props} />,
}));

describe("Artist", () => {
  it("renders artist info and albums", async () => {
    const spotify = jest.requireMock("../../../actions/spotify");
    spotify.getArtist.mockReturnValue({
      status: "success",
      data: {
        name: "The Weekend",
        images: [{ url: "www.xxx.com/artist.png", width: 100, height: 100 }],
        popularity: 100,
        genres: ["pop", "rock"],
        followers: { total: 1000 },
        external_urls: { spotify: "www.xxx.com" },
      },
    });
    spotify.getArtistAlbums.mockReturnValue({
      status: "success",
      data: {
        items: [
          {
            id: "1",
            name: "Starboy",
            release_date: "123",
            images: [{ url: "www.xxx.com/album.png", width: 100, height: 100 }],
          },
        ],
      },
    });
    const favourite = jest.requireMock("../../../actions/favourite");
    favourite.getFavourite.mockReturnValue({
      status: "success",
      data: false,
    });

    const { getByText, container } = render(
      await Artist({ params: { id: "123" } })
    );

    expect(getByText("The Weekend")).toBeInTheDocument();
    getByText(/Popularity: 100/, { selector: "div.mt-5" });
    getByText(/# of Followers: 1000/, { selector: "div.mt-5" });
    expect(getByText("More Info")).toHaveAttribute("href", "www.xxx.com");
    getByText(/pop,rock/, { selector: "div.mt-5" });
    expect(getByText("Add as favourite")).toBeInTheDocument();
    expect(getByText("Back")).toBeInTheDocument();

    const img = container.querySelector("img[src='www.xxx.com/artist.png']");
    expect(img).toBeDefined();

    const img2 = container.querySelector("img[src='www.xxx.com/album.png']");
    expect(img2).toBeDefined();

    expect(
      getByText(/Released: 123/, { selector: "div.mt-2" })
    ).toBeInTheDocument();
  });
});
