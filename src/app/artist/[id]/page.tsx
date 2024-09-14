import { getArtist } from "@/actions/spotify";
import Image from "next/image";
import Search from "@/component/search";
import React from "react";

export default async function Artist({ params }: { params: { id: string } }) {
  const { id } = params;

  const { data } = await getArtist(id);
  const { name, images, href, popularity, genres, followers, externals_urls } =
    data;

  return (
    <>
      <div className="bg-black h-28 flex justify-center items-center">
        <div className="w-3/4 max-w-[1440px]">
          <Search id="" />
        </div>
      </div>

      <div className="flex justify-center">
        <div className="w-3/4 max-w-[1440px] mt-[100px]">
          <div>actions</div>
          <div className="flex justify-center mt-[50px]">
            <div className="min-w-[100px] max-w-[200px]">
              <Image
                className="w-full"
                alt="artist photo"
                src={images?.[0].url}
                width={images?.[0].width}
                height={images?.[0].height}
              />
            </div>
            <div className="flex-1"></div>
            <div className="flex-1">
              <h1 className="font-bold text-3xl">{name}</h1>
              <div>
                Generes: {genres.join(",")}# of Followers: {followers.total}
                popularity: {popularity}
                <a href={externals_urls?.spotify} target="_blank">
                  External Link
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
