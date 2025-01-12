import React from "react";

export default function CustomEmoji({ name }: { name: string }) {
  return (
    <div
      className="w-8 h-8 bg-transparent inline-block align-middle"
      role="img"
      aria-label={name.split(".")[0]}
    >
      <img src={name} alt={name.split(".")[0]} className="size-full" />
    </div>
  );
}
