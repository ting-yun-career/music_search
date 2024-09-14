import { setFavourite } from "@/actions/favourite";

interface Props {
  id: string;
  isLiked: boolean;
  artistName: string;
}

export default function Like(props: Props) {
  const { id, isLiked, artistName } = props;

  return (
    <form action={setFavourite}>
      {isLiked ? (
        <button type="submit">
          <div className="flex text-pink-800 hover:text-gray-800 cursor-pointer">
            <span className="material-symbols-outlined text-[20px] font-light">
              heart_minus
            </span>
            <span className="text-sm font-light ml-1 hidden sm:block">
              Remove
            </span>
          </div>
        </button>
      ) : (
        <button type="submit">
          <div className="flex hover:text-pink-800 cursor-pointer">
            <span className="material-symbols-outlined text-[20px] font-light">
              heart_plus
            </span>
            <span className="text-sm font-light ml-1 hidden sm:block">
              Add as favourite
            </span>
          </div>
        </button>
      )}
      <input type="hidden" name="name" value={artistName} />
      <input type="hidden" name="id" value={id} />
    </form>
  );
}
