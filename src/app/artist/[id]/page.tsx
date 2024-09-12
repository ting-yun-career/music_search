import Header from "@/component/header";
import React from "react";

export default function Artist({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <>
      <Header />
      <div>Artist({id})</div>
    </>
  );
}
