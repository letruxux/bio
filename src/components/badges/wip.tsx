import { Code2 } from "lucide-react";

interface WipBadgeProps {
  inline?: boolean;
}

export default function WipBadge({ inline = false }: WipBadgeProps) {
  const baseClasses =
    "px-3 py-1 bg-yellow-500/20 text-yellow-500 text-sm font-medium rounded-full";
  const positionClasses = "absolute top-4 right-4";

  return (
    <span className={`${baseClasses} ${!inline ? positionClasses : ""}`}>
      W.I.P. <Code2 className="inline" />
    </span>
  );
}
