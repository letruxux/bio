"use client";
import React, { useRef } from "react";
import gsap from "gsap";
import SocialLinks from "./social-links";
import ProjectsButton from "./projects-button";
import GifBox from "./gif";
import Header from "./header";
import { useGSAP } from "@gsap/react";
import TimezoneClock from "./timezone-clock";

export default function MainCard() {
  const headerRef = useRef(null);
  const messageRef = useRef(null);
  const socialRef = useRef(null);
  const projectsRef = useRef(null);
  const timezoneRef = useRef(null);

  useGSAP(() => {
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
          scale: 0.95,
          opacity: 0,
          duration: 0.8,
        },
        "-=0.4"
      )
      .from(
        socialRef.current,
        {
          scale: 0.95,
          opacity: 0,
          duration: 0.8,
        },
        "-=0.4"
      )
      .from(
        timezoneRef.current,
        {
          scale: 0.95,
          opacity: 0,
          duration: 0.8,
        },
        "-=0.4"
      );
  }, []);

  return (
    <div className="p-6 rounded-lg text-text-primary max-w-[1024px] space-y-4">
      {/* Header */}
      <Header ref={headerRef} />

      {/* Gif Box */}
      <GifBox ref={messageRef} />

      {/* My projects */}
      <ProjectsButton ref={projectsRef} />

      {/* Social Links */}
      <SocialLinks ref={socialRef} />

      <TimezoneClock ref={timezoneRef} />
    </div>
  );
}
