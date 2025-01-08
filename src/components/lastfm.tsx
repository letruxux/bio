"use client";

import { useLastScrobble } from "@/lastfm";
import React, { useEffect, useRef } from "react";
import clsx from "clsx";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import gsap from "gsap";

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

  useEffect(() => {
    if (showEl) {
      const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      timeline
        .from(lastfmRef.current, {
          y: 50, // Increased from 30 to 50 for more movement
          opacity: 0,
          duration: 1.2, // Increased from 0.8 to 1.2 for smoother animation
          scale: 0.95, // Added scale effect
          rotation: -2, // Added slight rotation
        })
        .to(lastfmRef.current, {
          scale: 1,
          rotation: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.3)", // Added bounce effect
        });
    }
  }, [showEl]);

  useEffect(() => {
    const interval = setInterval(() => {
      mutate();
    }, 20000); // 60000ms = 1 minute

    return () => clearInterval(interval);
  }, [mutate]);

  if (!showEl) {
    return null;
  }

  return (
    <a
      className="absolute right-4 bottom-4 flex flex-col items-end text-white"
      href={track.url}
      ref={lastfmRef}
    >
      <h1 className="flex items-center gap-2 font-bold">
        <PlayIcon now={track.nowPlaying} />{" "}
        {track.nowPlaying ? "Now playing" : `Last played`}{" "}
        {!track.nowPlaying && track.playedAt && (
          <span className="text-gray-400 text-sm font-semibold">
            {dayjs(track.playedAt).fromNow()}
          </span>
        )}
      </h1>
      <div className="flex items-center gap-2 scale-100 hover:scale-105 transition-transform duration-500">
        <span>🎵 {track.name}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-gray-400">{track.artist}</span>
      </div>
    </a>
  );
}
