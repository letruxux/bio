import { PropsOf } from "@/lib/types";
import React from "react";
import { twMerge } from "tailwind-merge";

const Card: React.FC<PropsOf<HTMLDivElement>> = ({ children, ...props }) => {
  return (
    <div
      {...props}
      className={twMerge(
        "rounded-2xl p-6 text-text-primary shadow-lg border border-border-subtle",
        "bg-gradient-to-br from-surface-light to-surface-deep",
        props.className
      )}
    >
      {children}
    </div>
  );
};

export default Card;
