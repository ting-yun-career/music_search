import Link from "next/link";
import Like from "../like";

export default function FavouriteArtists() {
  return (
    <div className="border border-gray-300 rounded-[3px] px-5 py-6">
      <h2 className="text-xl font-bold">My Favourite Artists</h2>
      <div className="pt-5">
        <div className="flex justify-between">
          <Link
            className="underline decoration-dotted  hover:text-pink-800"
            href="/"
          >
            The Weekend
          </Link>
          <Like isLiked={true} />
        </div>
      </div>
    </div>
  );
}
