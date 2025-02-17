import { useCallback, useEffect, useState } from "react";

interface RawTrack {
  "@attr"?: {
    nowplaying: "true" | "false";
  };
  album: {
    "#text": string;
    mbid: string;
  };
  artist: {
    "#text": string;
    mbid: string;
  };
  image: {
    "#text": string;
    size: string;
  }[];
  mbid: string;
  name: string;
  url: string;
  date?: {
    uts: string;
  };
}

export interface Track {
  nowPlaying: boolean;
  album?: string;
  artist: string;
  images?: string[];
  mbid: string;
  name: string;
  url: string;
  playedAt?: Date;
}

export async function getLatestScrobble(username: string): Promise<Track | null> {
  const url = `https://lastfm-last-played.biancarosa.com.br/${username}/latest-song`;
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    return null;
  }

  const data = await response.json();
  const track = data.track as RawTrack;
  const nowPlaying = track["@attr"]?.nowplaying === "true";

  return {
    artist: track.artist["#text"],
    name: track.name,
    mbid: track.mbid,
    url: track.url,
    album: track.album["#text"],
    nowPlaying,
    images: [],
    playedAt: track.date ? new Date(parseInt(track.date.uts) * 1000) : undefined,
  };
}

export function useLastScrobble(username: string) {
  const [track, setTrack] = useState<Track | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const mutate = useCallback(() => {
    getLatestScrobble(username)
      .then(setTrack)
      .catch((e) => setError(e as Error));
  }, [username]);

  useEffect(() => {
    mutate();

    document.addEventListener("visibilitychange", (e) => {
      if (document.visibilityState === "visible") {
        mutate();
      }
    });
  }, [username, mutate]);

  return {
    track,
    error,
    mutate,
  };
}
