import dayjs from "@/lib/dayjs";
import { projects } from "./projects";
import ArchivedBadge from "./badges/archived";
import WipBadge from "./badges/wip";

export default function ProjectCard({
  data: project,
  id,
}: {
  data: (typeof projects)[keyof typeof projects];
  id: keyof typeof projects;
}) {
  return (
    <a href={`/p/${id}`} key={id}>
      <div
        className={`project-card rounded-xl border ${
          project.wip
            ? "border-yellow-500/50 hover:border-yellow-500 bg-gradient-to-b from-yellow-500/5 to-blue-bg"
            : project.archived
            ? "border-border-subtle hover:border-accent-primary bg-gradient-to-t from-yellow-500/5 to-blue-bg"
            : "border-border-subtle hover:border-accent-primary bg-blue-bg"
        } transition-colors overflow-hidden`}
      >
        {project.bannerImage && (
          <div
            className="h-48 w-full bg-cover bg-center"
            style={{ backgroundImage: `url("${project.bannerImage}")` }}
          />
        )}
        {project.wip && <WipBadge />}
        {project.archived && <ArchivedBadge />}
        <div className="p-6">
          <div className="w-16 h-16 max-w-16 max-h-16 overflow-hidden bg-accent-primary rounded-xl flex items-center justify-center mb-4">
            <span className="scale-50">{project.icon}</span>
          </div>
          <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
          <p className="text-text-secondary line-clamp-2">{project.description}</p>
          <div className="flex justify-between items-center mt-3">
            <div className="flex gap-2 overflow-hidden relative flex-1 mr-4">
              <div className="flex gap-2 overflow-x-auto no-scrollbar">
                {project.techStack?.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-xs bg-blue-bg border border-border-subtle 
            text-text-secondary rounded-full hover:border-accent-primary 
            transition-colors whitespace-nowrap flex-shrink-0"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div
                className={`absolute right-0 top-0 h-full w-12 bg-gradient-to-r from-transparent ${
                  !project.archived ? "to-blue-bg" : ""
                }`}
              />
            </div>
            <div className="text-sm text-text-secondary shrink-0">
              {dayjs(project.timeline.at(0)!.date).fromNow()}
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
