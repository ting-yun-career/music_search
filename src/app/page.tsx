import Image from "next/image";
import headerBg from "@/asset/header-background.jpg";
import Search from "@/component/search";
import FavouriteArtists from "@/component/favouriteArtists";
import { getFavourites } from "@/actions/favourite";

export default async function Home() {
  const { data: favourites } = await getFavourites();

  return (
    <>
      <div className="relative h-[30vh] sm:h-[50vh]">
        <div className="absolute top-0 bottom-0 left-0 right-0 brightness-50 overflow-hidden">
          <Image
            alt="Home page background"
            src={headerBg}
            className="w-full object-cover"
            fill
          />
        </div>
        <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
          <div className="w-3/4 max-w-[600px]">
            <label
              className="block py-4 w-full text-center text-white font-semibold text-2xl"
              htmlFor="music-search"
            >
              Music Search
            </label>
            <Search id="music-search" />
          </div>
        </div>
      </div>
      <div className="flex justify-center pb-28">
        <div className="w-3/4 max-w-[600px] pt-[100px]">
          <FavouriteArtists favourites={favourites} />
        </div>
      </div>
    </>
  );
}
