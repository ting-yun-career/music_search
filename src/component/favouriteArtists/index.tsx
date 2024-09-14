import Link from "next/link";
import Like from "../like";

interface Props {
  favourites: any;
}

export default function FavouriteArtists(props: Props) {
  const { favourites } = props;

  const artistIds = Object.keys(favourites);

  return (
    <div className="border border-gray-300 rounded-[3px] px-5 py-6">
      <h2 className="text-xl font-bold">My Favourite Artists</h2>
      <div className="pt-5">
        {artistIds.length > 0 ? (
          <>
            {artistIds.map((id) => (
              <div key={id} className="flex justify-between">
                <Link
                  className="underline decoration-dotted hover:text-pink-800"
                  href={`/artist/${id}`}
                >
                  {favourites[id]}
                </Link>
                <Like isLiked={true} id={id} artistName={favourites[id]} />
              </div>
            ))}
          </>
        ) : (
          <>
            <div className="flex justify-center items-center min-h-[100px]">
              You don't have any favourite artist
            </div>
          </>
        )}
      </div>
    </div>
  );
}
