"use server";

import { kvRead, kvSave } from "@/util/kv";
import _remove from "lodash/remove";

export async function getFavourite(id: string) {
  console.log("getFavourite");

  // let promise;
  // try {
  //   const json = await kvRead("favourites");
  //   const data = JSON.parse(json as string);
  //   data.

  //   promise = Promise.resolve({ status: "success", data: null });
  // } catch (error) {
  //   promise = Promise.reject({ status: "fail", error });
  // }
  // return promise;
}

export async function setFavourite(formData: FormData) {
  console.log("setFavourite", formData);
  const id = formData.get("id") as string;

  let promise;
  try {
    const str = await kvRead("favourites");
    let favourites = (str as string).split(",");

    if (favourites.includes(id)) {
      favourites = _remove(favourites, id);
    } else favourites.push(id);

    await kvSave("favourites", favourites.join(","));
    promise = Promise.resolve({ status: "success" });
  } catch (error) {
    promise = Promise.reject({ status: "fail", error });
  }
  return promise;
}
