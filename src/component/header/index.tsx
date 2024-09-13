"use client";

import { search } from "@/actions/spotify";

export default function Header() {
  return (
    <>
      {/* <button
        className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
        onClick={() => {
          search("Taylor Siwft")
            .then((data) => {
              console.log(data);
            })
            .catch((error) => {
              console.log(error);
            });
        }}
      >
        Search
      </button> */}
    </>
  );
}
