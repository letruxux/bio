"use client";

import { projects } from "@/components/projects";
import { useRef } from "react";
import gsap from "gsap";
import { ArrowLeft } from "lucide-react";
import { useGSAP } from "@gsap/react";

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
    <div className="min-h-dvh bg-black text-text-primary px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div ref={headerRef} className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">my projects :3</h1>
        </div>

        <div ref={projectsRef} className="flex flex-col gap-6">
          {Object.entries(projects).map(([key, project]) => (
            <a href={`/p/${key}`} key={key}>
              <div className="project-card bg-blue-bg rounded-xl border border-border-subtle hover:border-accent-primary transition-colors overflow-hidden">
                {project.bannerImage && (
                  <div
                    className="h-48 w-full bg-cover bg-center"
                    style={{ backgroundImage: `url("${project.bannerImage}")` }}
                  />
                )}
                <div className="p-6">
                  <div className="w-16 h-16 max-w-16 max-h-16 overflow-hidden bg-accent-primary rounded-xl flex items-center justify-center mb-4">
                    <span className="scale-50">{project.icon}</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-2">{project.title}</h2>
                  <p className="text-text-secondary line-clamp-2">
                    {project.description}
                  </p>
                </div>
              </div>
            </a>
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
