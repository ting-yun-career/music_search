import { getArtist, getArtistAlbums } from "@/actions/spotify";
import Image from "next/image";
import Search from "@/component/search";
import React from "react";
import Link from "next/link";
import Back from "@/component/back";
import Like from "@/component/like";
import { getFavourite } from "@/actions/favourite";

export default async function Artist({ params }: { params: { id: string } }) {
  const { id } = params;
  const { data: artist } = await getArtist(id);
  const { name, images, popularity, genres, followers, external_urls } = artist;
  const { data: artistAlbums } = await getArtistAlbums(id);
  const { data: isLiked } = await getFavourite(id);

  return (
    <>
      <div className="bg-black h-28 flex justify-center items-center">
        <div className="w-3/4 max-w-[1440px]">
          <Search />
        </div>
      </div>

      <div className="flex justify-center pb-28">
        <div className="w-3/4 max-w-[1440px] mt-[100px]">
          <div className="flex justify-between">
            <Back />
            <Like isLiked={isLiked} id={id} artistName={name} />
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
                Generes: {genres.join(",")}
                <br /># of Followers: {followers.total}
                <br />
                Popularity: {popularity}
                <br />
                {external_urls?.spotify && (
                  <Link
                    className="underline decoration-dotted hover:text-pink-800"
                    href={external_urls?.spotify ?? ""}
                    target="_blank"
                    aria-label={`Visit ${name}'s Spotify page`}
                  >
                    More Info
                  </Link>
                )}
              </div>
            </div>
          </div>
          <h1 className="font-bold text-2xl mt-10">Albums</h1>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-5">
            {artistAlbums.items.map((album: any) => (
              <Link key={album.id} href={`/album/${album.id}`}>
                <div>
                  <div className="font-semibold text-sm max-w-[150px] overflow-hidden h-10 mt-2">
                    {album.name}
                  </div>
                  <div className="rounded-[3px] overflow-hidden">
                    <Image
                      className="w-full"
                      alt="album image"
                      src={album.images?.[0].url}
                      width={album.images?.[0].width}
                      height={album.images?.[0].height}
                    />
                  </div>
                  <div className="text-xs mt-2">
                    Released: {album.release_date}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export async function generateStaticParams() {
  const popularArtists = [
    "06HL4z0CvFAxyc27GXpf02", // Taylor Swift
    "1Xyo4u8uXC1ZmMpatF05PJ", // The Weekend
    "4dpARuHxo51G3z768sgnrY", // Adele
  ];
  return popularArtists.map((id) => ({
    id,
  }));
}
