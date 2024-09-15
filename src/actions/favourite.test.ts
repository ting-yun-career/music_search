import { getFavourites } from "./favourite";
import { kvRead } from "../util/kv";

jest.mock("../util/kv", () => ({
  kvRead: jest.fn().mockResolvedValue({}),
  kvSave: jest.fn().mockResolvedValue(undefined),
}));

describe("getFavourites function", () => {
  it("calls kvRead", async () => {
    await getFavourites();
    expect(kvRead).toHaveBeenCalledTimes(1);
  });
});
