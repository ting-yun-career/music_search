import Image from "next/image";
import headerBg from "@/asset/header-background.jpg";

export default function Home() {
  return (
    <>
      <div className="relative h-[30vh] sm:h-[50vh]">
        <div className="absolute top-0 bottom-0 left-0 right-0 brightness-50 overflow-hidden">
          <Image
            alt="Mountains"
            src={headerBg}
            className="w-full object-cover"
            fill
          />
        </div>
        <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
          <div className="w-3/4">
            <label
              className="block py-4 w-full text-center text-white font-semibold text-2xl"
              htmlFor="music-search"
            >
              Music Search
            </label>
            <div className="flex justify-center">
              <span className="w-[40px] bg-white text-gray-900 flex items-center justify-around rounded-l-[3px] cursor-pointer">
                <span className="material-symbols-outlined text-[20px]">
                  search
                </span>
              </span>
              <span className="flex-1 max-w-[500px]">
                <input
                  type="text"
                  id="music-search"
                  className="w-full px-4 py-2 text-xs outline-1"
                  aria-label="Music Search"
                  placeholder="Search by artist or album"
                />
              </span>
              <span className="w-[40px] bg-white text-gray-900 flex items-center justify-center rounded-r-[3px] cursor-pointer">
                <span className="material-symbols-outlined text-[20px]">
                  close
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
