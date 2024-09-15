import { getFavourites } from "./favourite";
import { kvRead } from "../util/kv";

jest.mock("../util/kv", () => ({
  kvRead: jest.fn(),
  kvSave: jest.fn(),
}));

describe("getFavourites function", () => {
  it("calls kvRead", async () => {
    const kv = jest.requireMock("../util/kv");
    kv.kvRead.mockReturnValue({});
    const result = await getFavourites();
    expect(kvRead).toHaveBeenCalledTimes(1);
    expect(result.status).toBe("success");
    expect(result.data).toEqual({});
  });

  it("returns failed promise if kvRead throws", async () => {
    jest.clearAllMocks();

    const kv = jest.requireMock("../util/kv");
    kv.kvRead.mockImplementationOnce(() => {
      throw new Error("Mock error");
    });

    try {
      await getFavourites();
      fail("Expected getFavourites to throw an error");
    } catch (error) {
      expect(error.status).toBe("fail");
    }
    // also works but more confusing
    // await expect(getFavourites()).rejects.toHaveProperty("status", "fail");
  });
});
