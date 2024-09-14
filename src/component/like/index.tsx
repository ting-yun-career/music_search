interface Props {
  id: string;
  isLiked: boolean;
}

export default function Like(props: Props) {
  const { id, isLiked } = props;

  return (
    <>
      {isLiked ? (
        <div className="flex text-pink-800 hover:text-gray-800 cursor-pointer">
          <span className="material-symbols-outlined text-[20px] font-light">
            heart_minus
          </span>
          <span className="text-sm font-light ml-1 hidden sm:block">
            Remove
          </span>
        </div>
      ) : (
        <div className="flex hover:text-pink-800 cursor-pointer">
          <span className="material-symbols-outlined text-[20px] font-light">
            heart_plus
          </span>
          <span className="text-sm font-light ml-1 hidden sm:block">
            Add as favourite
          </span>
        </div>
      )}
    </>
  );
}
