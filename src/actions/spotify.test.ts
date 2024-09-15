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

it("calls search", async () => {
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
  await search(queryString);
});
