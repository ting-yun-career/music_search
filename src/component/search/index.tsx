"use client";

import { useMemo, useState } from "react";
import debounce from "lodash/debounce";
import classNames from "classnames";

interface Props {
  id: string;
}

// type Result = {};

export default function Search(props: Props) {
  const { id } = props;

  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState<any>(null);

  const debouncedSearch = useMemo(
    () =>
      debounce(function (value: string) {
        if (value?.length >= 3) {
          console.log("searching for: ", value);
          setResult("anything");
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
            <span className="material-symbols-outlined text-[20px]">
              search
            </span>
          </span>
          <span className="flex-1">
            <input
              type="text"
              id={id}
              className="w-full px-4 py-2 text-xs outline-1"
              aria-label="Music Search"
              placeholder="Search by artist or album"
              value={keyword}
              onChange={(e) => {
                setKeyword(e.target.value);
                debouncedSearch(e.target.value);
              }}
            />
          </span>
          <span
            className="w-[40px] bg-white text-gray-900 flex items-center justify-center rounded-r-[3px] cursor-pointer"
            onClick={(e) => {
              setKeyword("");
              setResult(null);
            }}
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </span>
        </div>
        <div
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
        >
          <div className="text-gray-500 py-[3px]">Artists</div>
          <div className="text-gray-900 py-[3px]">artist1</div>
          <div className="text-gray-500 py-[3px]">Albums</div>
          <div className="text-gray-900 py-[3px]">album1</div>
        </div>
      </div>
    </>
  );
}
