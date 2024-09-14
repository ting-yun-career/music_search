import { getArtist, getArtistAlbums } from "@/actions/spotify";
import Image from "next/image";
import Search from "@/component/search";
import React from "react";
import Link from "next/link";

export default async function Artist({ params }: { params: { id: string } }) {
  const { id } = params;

  const { data: artist } = await getArtist(id);
  const { name, images, popularity, genres, followers, external_urls } = artist;

  const { data: artistAlbums } = await getArtistAlbums(id);

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
            <div className="min-w-[100px] ">
              <Image
                className="w-full"
                alt="artist photo"
                src={images?.[0].url}
                width={images?.[0].width}
                height={images?.[0].height}
              />
            </div>
            <div className="flex-1 ml-10 lg:ml-20">
              <h1 className="font-bold text-3xl">{name}</h1>
              <div className="mt-5">
                Generes: {genres.join(",")}
                <br /># of Followers: {followers.total}
                <br />
                popularity: {popularity}
                <br />
                {external_urls?.spotify && (
                  <Link href={external_urls?.spotify ?? ""} target="_blank">
                    External Link
                  </Link>
                )}
              </div>
            </div>
          </div>
          <h1 className="font-bold text-2xl mt-10">Albums</h1>
          <div className="grid grid-cols-3 gap-4 mt-5">
            {artistAlbums.items.map((album) => (
              <div>
                <div className="rounded-[3px] overflow-hidden">
                  <Image
                    className="w-full"
                    alt="album image"
                    src={album.images?.[0].url}
                    width={album.images?.[0].width}
                    height={album.images?.[0].height}
                  />
                </div>
                <div className="font-semibold text-sm max-w-[150px] overflow-hidden h-10 mt-2">
                  {album.name}
                </div>
                <div className="text-xs mt-2">
                  Release Date: {album.release_date}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
