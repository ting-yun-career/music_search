import Header from "@/component/header";
import React from "react";

export default function Album({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <>
      <Header />
      <div>Album({id})</div>
    </>
  );
}
