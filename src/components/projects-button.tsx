import { NotebookTabs } from "lucide-react";

export default function ProjectsButton({
  ref,
}: {
  ref: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div ref={ref} className="grid grid-cols-1">
      <a
        className="bg-surface-light py-2 rounded-lg hover:bg-accent-primary border border-border-subtle transition w-full block text-center mb-4 font-semibold"
        href="/p"
      >
        <NotebookTabs className="inline size-5" /> My projects
      </a>
    </div>
  );
}
