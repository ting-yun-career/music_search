import { getFavourites, setFavourite } from "./favourite";
import { kvRead, kvSave } from "../util/kv";

jest.mock("../util/kv", () => ({
  kvRead: jest.fn(),
  kvSave: jest.fn(),
}));

jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}));

describe("getFavourites", () => {
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
  });
});

describe("setFavourite", () => {
  it("calls revalidatePath with correct arguments", async () => {
    jest.clearAllMocks();

    const formDataMock = new FormData();
    formDataMock.append("key1", "value1");
    formDataMock.append("key2", "value2");

    await setFavourite(formDataMock);
    const nextCache = jest.requireMock("next/cache");

    expect(kvSave).toHaveBeenCalledTimes(1);
    expect(nextCache.revalidatePath).toHaveBeenCalledTimes(2);
  });
});
