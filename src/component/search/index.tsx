"use client";

import { useMemo, useState } from "react";
import debounce from "lodash/debounce";
import classNames from "classnames";
import { search } from "@/actions/spotify";
import Link from "next/link";

interface Props {
  id?: string;
}

type Result = {
  artists: any;
  albums: any;
};

export default function Search(props: Props) {
  const { id } = props;

  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [busy, setBusy] = useState(false);

  const debouncedSearch = useMemo(
    () =>
      debounce(async function (value: string) {
        if (value?.length >= 3) {
          setBusy(true);
          const { status, data } = await search(value);
          setBusy(false);
          if (status === "success") {
            setResult(data);
          }
        } else {
          setResult(null);
        }
      }, 500),
    []
  );

  return (
    <>
      <div className="relative">
        <div className="flex justify-center">
          <span className="w-[40px] bg-white text-gray-900 flex items-center justify-around rounded-l-[3px] cursor-pointer">
            <span
              className={classNames(
                "material-symbols-outlined",
                "text-[20px]",
                { "animate-spin": busy }
              )}
            >
              {busy ? "autorenew" : "search"}
            </span>
          </span>
          <span className="flex-1">
            <input
              type="text"
              id={id}
              className="w-full px-2 py-2 text-xs outline-1"
              placeholder="Search by artist or album"
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
                debouncedSearch(e.target.value);
              }}
              autoComplete="off"
              list="mySuggestions"
              aria-label="Music Search"
              aria-placeholder="Search by artist or album"
              aria-autocomplete="list"
              aria-controls="search-results-dropdown"
            />
            <datalist id="mySuggestions">
              <option value="The Weekend" />
              <option value="Taylor Swift" />
              <option value="Adele" />
            </datalist>
          </span>
          <span
            className="w-[40px] bg-white text-gray-900 flex items-center justify-center rounded-r-[3px] cursor-pointer"
            onClick={() => {
              setKeyword("");
              setResult(null);
            }}
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </span>
        </div>
        <div
          id="search-results-dropdown"
          className={classNames(
            { hidden: !result },
            "absolute",
            "top-[96%]",
            "left-0",
            "right-0",
            "bg-gray-50",
            "text-xs",
            "rounded-b-[3px]",
            "px-3",
            "py-3",
            "drop-shadow-md"
          )}
          aria-label="Search results"
          aria-live="polite"
          aria-atomic="true"
        >
          {result?.artists?.items?.length > 0 && (
            <>
              <div className="text-gray-400 py-[3px] font-semibold">
                Artists
              </div>
              {result?.artists.items.map(
                (artist: { id: string; name: string }) => (
                  <Link
                    key={artist.id}
                    href={`/artist/${artist.id}`}
                    aria-label={`Artist: ${artist.name}`}
                  >
                    <div className="text-gray-900 py-[3px] cursor-pointer hover:text-pink-800">
                      {artist.name}
                    </div>
                  </Link>
                )
              )}
            </>
          )}
          {result?.albums?.items?.length > 0 && (
            <>
              <div className="text-gray-400 py-[3px] font-semibold mt-1">
                Albums
              </div>
              {result?.albums.items.map(
                (album: { id: string; name: string }) => (
                  <Link
                    key={album.id}
                    href={`/album/${album.id}`}
                    aria-label={`Album: ${album.name}`}
                  >
                    <div className="text-gray-900 py-[3px] cursor-pointer hover:text-pink-800">
                      {album.name}
                    </div>
                  </Link>
                )
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
