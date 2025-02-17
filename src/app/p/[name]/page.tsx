"use client";

import { redirect, useParams } from "next/navigation";
import relativeTime from "dayjs/plugin/relativeTime";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { projects } from "@/components/projects";
import React, { useRef } from "react";
import dayjs from "dayjs";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
dayjs.extend(relativeTime);

function App() {
  const { name: projectName } = useParams<{ name: string }>();
  const data = projects[projectName as keyof typeof projects];

  const bannerRef = useRef(null);
  const logoRef = useRef(null);
  const contentRef = useRef(null);
  const techStackRef = useRef(null);
  const timelineRef = useRef(null);
  const actionsRef = useRef(null);

  useGSAP(() => {
    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

    timeline
      .to("body", { visibility: "visible", duration: 0 })
      .from(bannerRef.current, {
        opacity: 0,
        y: -50,
        duration: 0.8,
      })
      .from(
        logoRef.current,
        {
          scale: 0.8,
          opacity: 0,
          duration: 0.6,
        },
        "-=0.4"
      )
      .from(
        contentRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
        },
        "-=0.4"
      )
      .from(
        "#lool",
        {
          opacity: 0,
          y: 20,
          stagger: 0.1,
          duration: 0.4,
        },
        "-=0.4"
      )
      .from(
        ".tech-pill",
        {
          opacity: 0,
          y: 20,
          stagger: 0.1,
          duration: 0.4,
        },
        "-=0.4"
      )
      .from(
        timelineRef.current,
        {
          opacity: 0,
          scale: 0.95,
          duration: 0.6,
        },
        "-=0.2"
      )
      .from(
        ".timeline-line",
        {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 0.6,
        },
        "-=0.4"
      )
      .from(
        ".action-button",
        {
          y: 20,
          opacity: 0,
          stagger: 0.1,
          duration: 0.4,
        },
        "-=0.2"
      );
  }, []);

  if (!projectName || !Object.hasOwn(projects, projectName)) return redirect("/");

  return (
    <div className="min-h-dvh bg-black text-text-primary">
      {/* Hero Banner */}
      <div ref={bannerRef}>
        {data.bannerImage ? (
          <div
            className="h-[300px] w-full bg-cover bg-center relative"
            style={{
              backgroundImage: `url("${data.bannerImage}")`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />
          </div>
        ) : (
          <div className="h-[200px] w-full relative"></div>
        )}
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 relative">
        {/* Overlapping Logo */}
        <div
          ref={logoRef}
          className="absolute -top-16 left-12 bg-accent-primary w-32 h-32 rounded-2xl flex items-center justify-center shadow-xl font-bold border border-accent-secondary hover:scale-105 transition-transform"
        >
          {data.icon}
        </div>

        <div
          className={`bg-blue-bg rounded-xl shadow-2xl p-8 pt-20 border ${
            data.wip
              ? "border-yellow-500/50 bg-gradient-to-b from-yellow-500/5 to-blue-bg"
              : "border-border-subtle"
          } mt-[-64px]`}
        >
          {/* Project Info */}
          <div ref={contentRef}>
            <div className="flex items-center gap-4 mb-3">
              <h1 className="text-3xl font-bold text-text-primary">{data.title}</h1>
              {data.wip && (
                <span className="px-3 py-1 bg-yellow-500/20 text-yellow-500 text-sm font-medium rounded-full">
                  In development 🛠️
                </span>
              )}
            </div>
            <p className="text-text-secondary mb-6 text-lg">{data.description}</p>
          </div>

          {/* Tech Stack */}
          <div ref={techStackRef} className="mb-8">
            <h3
              id="lool"
              className="text-sm uppercase tracking-wider text-text-secondary mb-3"
            >
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-3">
              {data.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-surface-light hover:bg-accent-primary transition-colors rounded-full text-sm border border-border-subtle tech-pill whitespace-nowrap"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div ref={timelineRef} className="mb-8">
            <h3 className="text-sm uppercase tracking-wider text-text-secondary mb-6">
              Development Timeline
            </h3>
            <div className="relative">
              <div className="absolute top-[28px] left-0 w-full h-[2px] bg-accent-primary timeline-line"></div>

              <div className="flex justify-between items-start gap-16">
                <div className="relative">
                  <div className="absolute left-[calc(50%-8px)] top-[24px] w-4 h-4 rounded-full bg-accent-primary border-4 border-black z-[-1]"></div>
                  <span className="text-text-secondary block text-center">
                    <h4 className="text-xs uppercase tracking-wider text-text-secondary mb-1">
                      Project Start
                    </h4>
                    <time className="text-text-primary block">
                      {dayjs(data.time.start).format("MMM DD, YYYY")}{" "}
                      <small className="block mt-1">
                        ({dayjs(data.time.start).fromNow()})
                      </small>
                    </time>
                  </span>
                </div>

                <div className="relative">
                  <div className="absolute left-[calc(50%-8px)] top-[24px] w-4 h-4 rounded-full bg-accent-primary border-4 border-black z-[-1]"></div>
                  <span className="text-text-secondary block text-center">
                    <h4 className="text-xs uppercase tracking-wider text-text-secondary mb-1">
                      {data.wip ? "Planned" : "Initial"} Release
                    </h4>
                    <time className="text-text-primary block">
                      {dayjs(data.time.release).format("MMM DD, YYYY")}{" "}
                      <small className="block mt-1">
                        ({dayjs(data.time.release).fromNow()})
                      </small>
                    </time>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div ref={actionsRef} className="flex gap-4">
            {data.url && (
              <a
                href={data.url}
                target="_blank"
                className="flex items-center gap-2 bg-accent-primary hover:bg-accent-secondary px-6 py-3 rounded-lg transition-colors action-button"
              >
                <ExternalLink className="w-4 h-4" />
                View
              </a>
            )}
            {data.git && (
              <a
                className="flex items-center gap-2 bg-surface-light hover:bg-blue-hl px-6 py-3 rounded-lg transition-colors border border-border-subtle action-button"
                href={data.git}
                target="_blank"
              >
                <SiGithub className="w-4 h-4 inline-block" />
                Source Code
              </a>
            )}
          </div>
        </div>
        <a
          className="flex items-center gap-2 bg-transparent bg-surface-light px-6 py-3 rounded-lg transition-colors border border-transparent hover:border-border-subtle action-button mt-4 w-32 h-12"
          href="/p"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </a>
      </div>
    </div>
  );
}

export default App;
