import "@testing-library/jest-dom";

import { render, screen, fireEvent } from "@testing-library/react";
import axios from "axios";
import Search from "./index";

jest.mock("../../util/kv", () => ({
  kvRead: jest.fn(),
  kvSave: jest.fn(),
}));

jest.mock("axios", () => {
  return {
    get: jest.fn(() => Promise.resolve()),
    post: jest.fn(() => Promise.resolve()),
  };
});

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Search", () => {
  it("input change", () => {
    const kv = jest.requireMock("../../util/kv");
    kv.kvRead.mockReturnValue("xxx");

    mockedAxios.get.mockImplementation((url) => {
      if (url === "https://api.spotify.com/v1/search?q=abc&type=artist") {
        // token check
        return Promise.resolve({});
      } else if (
        url ===
        "https://api.spotify.com/v1/search?q=weekend&type=artist,album&limit=3"
      ) {
        // actual search
        return Promise.resolve({ status: 200, data: { foo: "bar" } });
      } else {
        return Promise.resolve();
      }
    });

    render(<Search />);
    const input = screen.getByPlaceholderText("Search by artist or album");
    fireEvent.change(input, { target: { value: "weekend" } });
    expect(input.value).toBe("weekend");
  });

  xit("triggers search endpoint on input blur", async () => {
    // TODO
  });

  xit("displays search results on input blur", async () => {
    // TOD
  });
});
