import Link from "next/link";

export default function Back() {
  return (
    <>
      <Link href="/">
        <div className="flex hover:text-pink-800">
          <span className="material-symbols-outlined text-[20px] font-light">
            arrow_back
          </span>
          <span
            className="text-sm font-light ml-1 hidden sm:block"
            aria-label="Back to Home"
          >
            Back
          </span>
        </div>
      </Link>
    </>
  );
}
