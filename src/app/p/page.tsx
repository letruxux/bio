"use client";

import { projects } from "@/components/projects";
import { useRef } from "react";
import gsap from "gsap";
import { AlignCenter, ArrowLeft } from "lucide-react";
import { useGSAP } from "@gsap/react";
import ProjectCard from "@/components/project-card";

export default function ProjectsList() {
  const headerRef = useRef(null);
  const projectsRef = useRef(null);

  useGSAP(() => {
    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

    timeline
      .to("body", { visibility: "visible", duration: 0 })
      .from(headerRef.current, {
        opacity: 0,
        y: -30,
        duration: 0.6,
      })
      .from(".project-card", {
        opacity: 0,
        y: -30,
        stagger: 0.2,
        duration: 0.6,
      })
      .from("#back-button", {
        opacity: 0,
        y: -30,
        duration: 0.4,
      });
  }, []);

  return (
    <div className="min-h-dvh bg-gradient-to-br from-gray-950 via-black to-gray-900 text-text-primary px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div ref={headerRef} className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">my projects :3</h1>
          <h3 className="text-lg">
            <AlignCenter className="inline" /> from newest to oldest
          </h3>
        </div>

        <div ref={projectsRef} className="flex flex-col gap-6">
          {Object.entries(projects)
            .sort(([_, a], [__, b]) => {
              const startTimeA = a.timeline.at(0)!.date;
              const startTimeB = b.timeline.at(0)!.date;

              return startTimeB.getTime() - startTimeA.getTime();
            })
            .map(([key, project]) => (
              <ProjectCard data={project} id={key} key={key} />
            ))}
        </div>
        <a
          className="flex items-center gap-2 bg-transparent bg-surface-light  px-6 py-3 rounded-lg transition-colors border border-transparent hover:border-border-subtle action-button mt-4 w-32 h-12"
          href="/"
          id="back-button"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </a>
      </div>
    </div>
  );
}
