"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NotFound() {
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(function () {
      clearTimeout(timer);
      router.push("/");
    }, 5000);
  }, []);

  return (
    <>
      <div>Opps this page does not exist. Redirecting you in 5 seconds</div>
    </>
  );
}
