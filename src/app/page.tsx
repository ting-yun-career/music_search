"use client";

import { checkToken, refreshToken, search } from "@/actions/spotify";
import Header from "@/component/header";

export default function Home() {
  return (
    <>
      <Header />
      <div>Main</div>

      <button
        className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
        onClick={() => {
          checkToken().then((isValid) =>
            console.log("token is", isValid ? "valid" : "not valid")
          );
        }}
      >
        Check Token
      </button>

      <button
        className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
        onClick={() => {
          refreshToken();
        }}
      >
        Refresh Token
      </button>

      <button
        className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
        onClick={() => {
          search("Taylor Siwft").then((data) => console.log(data));
        }}
      >
        Search
      </button>
    </>
  );
}
