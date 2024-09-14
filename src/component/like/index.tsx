interface Props {
  isLiked: boolean;
}

export default function Like(props: Props) {
  const { isLiked } = props;

  function handleClick() {}

  return (
    <div>
      <div className="flex hover:text-pink-800">
        <span className="material-symbols-outlined text-[20px] font-light">
          heart_plus
        </span>
        <span className="text-sm font-light ml-1 hidden sm:block">
          Add as favourite
        </span>
      </div>
    </div>
  );
}
