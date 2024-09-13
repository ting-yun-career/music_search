import { getArtist } from "@/actions/spotify";
import Search from "@/component/search";
import React from "react";

export default async function Artist({ params }: { params: { id: string } }) {
  const { id } = params;

  const { status, data } = await getArtist(id);
  const { name, images, href, popularity, genres, followers, externals_urls } =
    data;

  return (
    <>
      <div className="bg-black h-28 flex justify-center items-center">
        <div className="w-3/4 max-w-[600px]">
          <Search id="" />
        </div>
      </div>
      <div>Artist({id})</div>
      <div>
        Generes: {genres.join(",")}# of Followers: {followers.total}
        popularity: {popularity}
        <a href={externals_urls?.spotify} target="_blank">
          External Link
        </a>
      </div>
    </>
  );
}
