"use client";

import { useLastScrobble } from "@/lastfm";
import { useEffect } from "react";
import clsx from "clsx";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

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

  useEffect(() => {
    const interval = setInterval(() => {
      mutate();
    }, 20000); // 60000ms = 1 minute

    return () => clearInterval(interval);
  }, [mutate]);

  if (!track || error) {
    return null;
  }

  return (
    <a className="absolute right-4 bottom-4 flex flex-col items-end" href={track.url}>
      <h1 className="flex items-center gap-2 font-bold">
        <PlayIcon now={track.nowPlaying} />{" "}
        {track.nowPlaying ? "Now playing" : `Last played`}{" "}
        {!track.nowPlaying && track.playedAt && (
          <span className="text-gray-400 text-sm font-semibold">
            {dayjs(track.playedAt).fromNow()}
          </span>
        )}
      </h1>
      <div className="flex items-center gap-2">
        <span>🎵 {track.name}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-gray-400">{track.artist}</span>
      </div>
    </a>
  );
}
