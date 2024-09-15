import { getFavourite, getFavourites, setFavourite } from "./favourite";
import { kvRead, kvSave } from "../util/kv";

jest.mock("../util/kv", () => ({
  kvRead: jest.fn(),
  kvSave: jest.fn(),
}));

jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}));

describe("getFavourites", () => {
  it("normal", async () => {
    const kv = jest.requireMock("../util/kv");
    kv.kvRead.mockReturnValue({ "123": "foo" });
    const result = await getFavourites();
    expect(kvRead).toHaveBeenCalledTimes(1);
    expect(result.status).toBe("success");
    expect(result.data).toEqual({ "123": "foo" });
  });

  it("vercel kv broken", async () => {
    // TODO
  });
});

describe("getFavourite", () => {
  it("record found", async () => {
    const kv = jest.requireMock("../util/kv");
    kv.kvRead.mockReturnValue({ "123": "foo" });
    const result = await getFavourite("123");
    expect(kvRead).toHaveBeenCalledTimes(1);
    expect(result.status).toBe("success");
    expect(result.data).toBe(true);
  });

  it("record not found", async () => {
    // TODO
  });

  it("vercel kv broken", async () => {
    // TODO
  });
});

describe("setFavourite", () => {
  it("calls dkSave and revalidatePath", async () => {
    jest.clearAllMocks();

    const formDataMock = new FormData();
    formDataMock.append("key1", "value1");
    formDataMock.append("key2", "value2");

    await setFavourite(formDataMock);
    const nextCache = jest.requireMock("next/cache");

    expect(kvSave).toHaveBeenCalledTimes(1);
    expect(nextCache.revalidatePath).toHaveBeenCalledTimes(2);
  });

  it("add new record if id does not exist in kv database ", async () => {
    // TODO
  });

  it("delete existing record if id already exists in kv database", async () => {
    // TODO
  });

  it("vercel kv broken", async () => {
    // TODO
  });
});
