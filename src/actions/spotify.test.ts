import { search } from "./spotify";
import axios from "axios";

jest.mock("../util/kv", () => ({
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

describe("search", () => {
  it("normal", async () => {
    const kv = jest.requireMock("../util/kv");
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

    const queryString = "weekend";
    const response = await search(queryString);

    expect(response.status).toBe("success");
    expect(response.data).toEqual({ foo: "bar" });
  });

  it("invalid input", async () => {
    // TODO
  });

  it("vercel kv broken", async () => {
    // TODO
  });

  it("spotify broken", async () => {
    // TODO
  });

  it("spotify returns non-200 http status", async () => {
    // TODO
  });

  it("spotify timeout", async () => {
    // TODO
  });
});
