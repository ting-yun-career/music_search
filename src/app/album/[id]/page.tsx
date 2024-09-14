import { getAlbum } from "@/actions/spotify";
import Image from "next/image";
import Back from "@/component/back";
import Search from "@/component/search";
import React from "react";
import Link from "next/link";

export default async function Album({ params }: { params: { id: string } }) {
  const { id } = params;

  const { data: album } = await getAlbum(id);

  const { name, release_date, popularity, images, external_urls } = album;

  return (
    <>
      <div className="bg-black h-28 flex justify-center items-center">
        <div className="w-3/4 max-w-[1440px]">
          <Search id="" />
        </div>
      </div>
      <div className="flex justify-center pb-28">
        <div className="w-3/4 max-w-[1440px] mt-[100px]">
          <div className="flex justify-between">
            <Back />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-[50px]">
            <div className="min-w-[200px] rounded-[3px] overflow-hidden">
              <Image
                className="w-full"
                alt="artist photo"
                src={images?.[0].url}
                width={images?.[0].width}
                height={images?.[0].height}
              />
            </div>
            <div>
              <h1 className="font-bold text-3xl">{name}</h1>
              <div className="mt-5">
                Released: {release_date}
                <br />
                popularity: {popularity}
                <br />
                {external_urls?.spotify && (
                  <Link
                    href={external_urls?.spotify ?? ""}
                    className="underline decoration-dotted hover:text-pink-800"
                    target="_blank"
                  >
                    More Info
                  </Link>
                )}
              </div>
            </div>
          </div>
          <h1 className="font-bold text-2xl mt-10">Tracks</h1>
          <div className="mt-5">
            {album?.tracks?.items?.map((track: any, i: number) => (
              <div key={track.id} className="text-sm py-[3px] text-gray-700">
                <span className="inline-block w-8 hidden sm:inline">#{i}</span>{" "}
                {track.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
