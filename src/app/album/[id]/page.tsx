import React from "react";

export default function Album({ params }: { params: { id: string } }) {
  const { id } = params;

  return (
    <>
      <div>Album({id})</div>
    </>
  );
}
