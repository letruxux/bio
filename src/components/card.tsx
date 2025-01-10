"use client";
import React, { useEffect, useRef } from "react";
import CustomEmoji from "./emoji";
import { SiDiscord, SiGithub, SiLastdotfm } from "@icons-pack/react-simple-icons";
import gsap from "gsap";
import { NotebookTabs } from "lucide-react";

const Card = () => {
  const headerRef = useRef(null);
  const messageRef = useRef(null);
  const socialRef = useRef(null);
  const projectsRef = useRef(null);

  useEffect(() => {
    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });

    timeline
      .to("body", { visibility: "visible", duration: 0 })
      .from(headerRef.current, {
        y: -50,
        opacity: 0,
        duration: 0.8,
      })
      .from(
        messageRef.current,
        {
          y: -10,
          opacity: 0,
          duration: 0.8,
        },
        "-=0.4"
      )
      .from(
        projectsRef.current,
        {
          scale: 0.95, // Mantiene la proporzione vicina a 1 per evitare un effetto troppo visibile
          opacity: 0,
          duration: 0.8,
        },
        "-=0.4"
      )
      .from(
        socialRef.current,
        {
          scale: 0.95, // Mantiene la proporzione vicina a 1 per evitare un effetto troppo visibile
          opacity: 0,
          duration: 0.8,
        },
        "-=0.4"
      );
  }, []);

  return (
    <div className="p-6 rounded-lg text-text-primary max-w-[1024px]">
      {/* Header */}
      <div ref={headerRef} className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-3">
          <div className="relative scale-100 hover:scale-110 transition-transform duration-200 group">
            <div className="w-12 h-12 bg-surface-light rounded-full overflow-hidden scale-100">
              <img
                src="https://github.com/letruxux.png"
                alt="Profile"
                className="w-full h-full object-cover group-hover:animate-[spin_2s_ease-out]"
              />
            </div>
            <div className="absolute -inset-1 border-2 border-dashed border-border-subtle rounded-full animate-[spin_10s_linear_infinite]" />
          </div>
          <div>
            <h2 className="text-2xl font-medium">
              letruxux <CustomEmoji name="wawa.png" />
            </h2>
          </div>
        </div>
      </div>

      {/* Message Box */}
      <div ref={messageRef} className="mb-4">
        <h3 className="text-2xl font-bold mb-4 text-text-primary">hello</h3>
        <div className="bg-surface-light border border-border-subtle p-4 rounded-2xl">
          <p className="text-sm leading-relaxed">
            <img
              src="https://media1.tenor.com/m/cDJj3LEw0UIAAAAd/gmail-dog.gif"
              alt="aaaaaaaaaaaaaaaaaaaaaaaa"
              className="rounded-2xl"
            />
          </p>
        </div>
      </div>

      <div ref={projectsRef} className="grid grid-cols-1">
        <a
          className="bg-surface-light py-2 rounded-lg hover:bg-accent-primary border border-border-subtle transition w-full block text-center mb-4 font-semibold"
          href="/p"
        >
          <NotebookTabs className="inline size-5" /> My projects
        </a>
      </div>

      {/* Social Links */}
      <div ref={socialRef} className="grid grid-cols-4 gap-4">
        <a
          className="bg-surface-light py-2 rounded-lg hover:bg-accent-primary border border-border-subtle transition hover:rotate-3"
          href="https://github.com/letruxux"
          target="_blank"
        >
          <SiGithub className="mx-auto" />
        </a>
        <a
          className="bg-surface-light py-2 rounded-lg hover:bg-accent-primary border border-border-subtle transition hover:-rotate-3"
          href="https://discord.com/users/1057373214596157502"
          target="_blank"
        >
          <SiDiscord className="mx-auto" />
        </a>
        <a
          className="bg-surface-light py-2 rounded-lg hover:bg-accent-primary border border-border-subtle transition hover:rotate-3"
          href="https://last.fm/user/letruxux"
          target="_blank"
        >
          <SiLastdotfm className="mx-auto" />
        </a>
        <a
          className="bg-surface-light py-2 rounded-lg hover:bg-accent-primary border border-border-subtle transition text-center hover:-rotate-3"
          href="https://youtu.be/3lWMdJx-zzI"
          target="_blank"
        >
          ❔
        </a>
      </div>
    </div>
  );
};

export default Card;
