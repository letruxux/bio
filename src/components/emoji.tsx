import React from "react";

const CustomEmoji = ({ name }: { name: string }) => {
  return (
    <div
      className="w-8 h-8 bg-transparent inline-block align-middle"
      role="img"
      aria-label="Custom Emoji"
    >
      <img src={name} alt="wawa" className="size-full" />
    </div>
  );
};

export default CustomEmoji;
