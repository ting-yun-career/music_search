"use server";

import { kvRead, kvSave } from "@/util/kv";
import { revalidatePath } from "next/cache";

export async function getFavourites() {
  console.log("getFavourite");

  let promise;
  try {
    const favourites: any = await kvRead("favourites");

    promise = Promise.resolve({
      status: "success",
      data: favourites,
    });
  } catch (error) {
    promise = Promise.reject({ status: "fail", error });
  }
  return promise;
}

export async function getFavourite(id: string) {
  console.log("getFavourite");

  let promise;
  try {
    const favourites: any = await kvRead("favourites");

    promise = Promise.resolve({
      status: "success",
      data: favourites.hasOwnProperty(id),
    });
  } catch (error) {
    promise = Promise.reject({ status: "fail", error });
  }
  return promise;
}

export async function setFavourite(formData: FormData) {
  console.log("setFavourite");
  const id = formData.get("id") as string;
  const name = formData.get("name") as string;

  let promise;
  try {
    const favourites = (await kvRead("favourites")) as {
      [key: string]: string;
    };

    if (favourites.hasOwnProperty(id)) {
      delete favourites[id];
    } else {
      favourites[id] = name;
    }

    await kvSave("favourites", favourites);
    promise = Promise.resolve({ status: "success" });
  } catch (error) {
    console.log("hi");
    promise = Promise.reject({ status: "fail", error });
  }

  revalidatePath("/");
  revalidatePath(`/artist/${id}`);

  return promise;
}
