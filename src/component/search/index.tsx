"use client";

import { useEffect, useState } from "react";

interface Props {
  id: string;
}

type Result = {};

export default function Search(props: Props) {
  const { id } = props;

  const [keyword, setKeyword] = useState("");
  const [isOpen, setOpen] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = function (value: string) {
    setKeyword(value);
  };

  return (
    <>
      <div className="flex justify-center">
        <span className="w-[40px] bg-white text-gray-900 flex items-center justify-around rounded-l-[3px] cursor-pointer">
          <span className="material-symbols-outlined text-[20px]">search</span>
        </span>
        <span className="flex-1 max-w-[500px]">
          <input
            type="text"
            id={id}
            className="w-full px-4 py-2 text-xs outline-1"
            aria-label="Music Search"
            placeholder="Search by artist or album"
            value={keyword}
            onChange={(e) => handleChange(e.target.value)}
          />
        </span>
        <span className="w-[40px] bg-white text-gray-900 flex items-center justify-center rounded-r-[3px] cursor-pointer">
          <span className="material-symbols-outlined text-[20px]">close</span>
        </span>
      </div>
    </>
  );
}
