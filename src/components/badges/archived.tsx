import { Archive } from "lucide-react";

interface ArchivedBadgeProps {
  inline?: boolean;
}

export default function ArchivedBadge({ inline = false }: ArchivedBadgeProps) {
  const baseClasses =
    "px-3 py-1 bg-orange-400/20 text-orange-400 text-sm font-medium rounded-full";
  const positionClasses = "absolute top-4 right-4";

  return (
    <div className={`${baseClasses} ${!inline ? positionClasses : ""}`}>
      Archived <Archive className="inline" />
    </div>
  );
}
