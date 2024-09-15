import "@testing-library/jest-dom";

import { render } from "@testing-library/react";
import Album from "./page";

jest.mock("../../../actions/spotify", () => ({
  getAlbum: jest.fn(),
}));

// disable NextJS url validation on <Image />
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, ...props }) => <img src={src} {...props} />,
}));

describe("Album", () => {
  it("renders album info and tracks", async () => {
    const spotify = jest.requireMock("../../../actions/spotify");
    spotify.getAlbum.mockReturnValue({
      status: "success",
      data: {
        name: "Test Album",
        release_date: "2022-01-01",
        popularity: 100,
        external_urls: { spotify: "www.xxx.com" },
        images: [{ url: "www.xxx.com/a.png", width: 100, height: 100 }],
        tracks: {
          items: [
            {
              id: "1",
              name: "Track 1",
            },
            {
              id: "2",
              name: "Track 2",
            },
          ],
        },
      },
    });

    const { getByText } = render(await Album({ params: { id: "123" } }));

    expect(getByText("Test Album")).toBeInTheDocument();
    expect(
      getByText(/Released: 2022-01-01/, { selector: "div.mt-5" })
    ).toBeInTheDocument();
    expect(
      getByText(/Popularity: 100/, { selector: "div.mt-5" })
    ).toBeInTheDocument();
    expect(getByText("More Info")).toHaveAttribute("href", "www.xxx.com");
    expect(getByText("Track 1")).toBeInTheDocument();
    expect(getByText("Track 2")).toBeInTheDocument();
    expect(getByText("Back")).toBeInTheDocument();
  });
});
