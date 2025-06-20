"use client";

import { useLastScrobble } from "@/lib/lastfm";
import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ArrowBigDown } from "lucide-react";
import { SiSpotify } from "@icons-pack/react-simple-icons";

dayjs.extend(relativeTime);

function PlayIcon({ now }: { now: boolean }) {
  return (
    <div className={clsx("flex gap-1 transition-opacity", { "opacity-0": !now })}>
      <span className="w-1 h-3 bg-white rounded-full animate-[waveform_1s_ease-in-out] repeat-infinite" />
      <span className="w-1 h-3 bg-white rounded-full animate-[waveform_1s_ease-in-out] delay-2 repeat-infinite" />
      <span className="w-1 h-3 bg-white rounded-full animate-[waveform_1s_ease-in-out] delay-4 repeat-infinite" />
    </div>
  );
}

export default function Lastfm() {
  const { track, error, mutate } = useLastScrobble("letruxux");
  const lastfmRef = useRef(null);
  const showEl = track && !error;

  useGSAP(() => {
    if (showEl) {
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      timeline
        .from(lastfmRef.current, {
          y: 50,
          opacity: 0,
          duration: 1.2,
          scale: 0.95,
          rotation: -2,
        })
        .to(lastfmRef.current, {
          scale: 1,
          rotation: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)",
        });
    }
  }, [showEl]);

  useEffect(() => {
    const interval = setInterval(() => {
      mutate();
    }, 20000);

    return () => clearInterval(interval);
  }, [mutate]);

  if (!showEl) {
    return null;
  }

  return (
    <div
      className="fixed w-full h-dvh pointer-events-none top-0 left-0 z-50"
      ref={lastfmRef}
    >
      <div
        className="hidden xl:block absolute bottom-28 right-4 animate-sway sm:bottom-28 sm:right-4 pointer-events-none z-[-1] max-w-[90vw]"
        style={{ transformOrigin: "70% 80%" }}
      >
        <div className="text-white text-xl sm:text-3xl font-bold  text-right sm:text-left max-w-[90vw] ">
          <SiSpotify className="inline" /> control my spotify
          <ArrowBigDown
            className="ml-auto fill-white mt-2 mr-10"
            style={{ transform: "scaleY(2) scaleX(1.5)" }}
          />
        </div>
      </div>
      <a
        className="absolute p-2 right-4 top-4 sm:top-auto sm:bottom-4 text-white pointer-events-auto"
        href="/spotify"
      >
        <div className="flex flex-col items-end hover:scale-105 transition-transform duration-500">
          <h1 className="flex items-center gap-2 font-bold">
            <PlayIcon now={track.nowPlaying} />{" "}
            {track.nowPlaying ? "Now playing" : "Last played"}{" "}
            {!track.nowPlaying && track.playedAt && (
              <span className="text-gray-400 text-sm font-semibold">
                {dayjs(track.playedAt).fromNow()}
              </span>
            )}
          </h1>
          <div className="flex items-center gap-2 scale-100 truncate">
            <span>🎵 {track.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-400 truncate">{track.artist}</span>
          </div>
        </div>
      </a>
    </div>
  );
}
