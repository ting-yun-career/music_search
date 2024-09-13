import React from "react";

export default function Artist({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <>
      <div>Artist({id})</div>
    </>
  );
}
