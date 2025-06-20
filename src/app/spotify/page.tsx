"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useState, useRef, useCallback } from "react";
import { Search, Play, Pause, Clock, Music, Volume2 } from "lucide-react";
import Card from "@/components/card";
import { SiSpotify } from "@icons-pack/react-simple-icons";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const cooldownRef = useRef(0);
  const [lastFetchTime, setLastFetchTime] = useState(Date.now());
  const updateIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);

  const [currentSong, setCurrentSong] = useState<null | {
    name: string;
    artists: string;
    progress_ms: number;
    duration_ms: number;
    albumArt: string;
    uri: string;
  }>(null);

  // Predictive progress state
  const [predictedProgress, setPredictedProgress] = useState(0);

  const [tabVisible, setTabVisible] = useState(!document.hidden);

  useEffect(() => {
    const handleVisibility = () => {
      setTabVisible(!document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  useGSAP(() => {
    const timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
    timeline.to("body", { visibility: "visible", duration: 0 });
  });

  // Update predictive progress every second - BUT ONLY WHEN PLAYING
  useEffect(() => {
    if (!currentSong || !tabVisible || !isPlaying) {
      // If not playing, keep progress at the last known position
      if (!isPlaying && currentSong) {
        const timeSinceLastFetch = Date.now() - lastFetchTime;
        const staticProgress = currentSong.progress_ms + timeSinceLastFetch;
        setPredictedProgress(Math.min(staticProgress, currentSong.duration_ms));
      }
      return;
    }

    const timeSinceLastFetch = Date.now() - lastFetchTime;
    const initialProgress = currentSong.progress_ms + timeSinceLastFetch;
    setPredictedProgress(Math.min(initialProgress, currentSong.duration_ms));

    const progressInterval = setInterval(() => {
      setPredictedProgress((prev) => {
        const newProgress = prev + 1000;
        return Math.min(newProgress, currentSong.duration_ms);
      });
    }, 1000);

    return () => clearInterval(progressInterval);
  }, [currentSong, lastFetchTime, tabVisible, isPlaying]); // Added isPlaying dependency

  // Fetch current song
  const fetchCurrentSong = useCallback(async () => {
    try {
      const res = await fetch("/api/current-song");
      const data = await res.json();
      setLastFetchTime(Date.now());

      setCurrentSong(data.song);
      setIsPlaying(data.playing);
    } catch (error) {
      console.error("Failed to fetch current song:", error);
    } finally {
      setInitialLoading(false); // <- qui
    }
  }, []);

  // Setup song updates (10s interval, but refresh immediately after song change)
  const setupSongUpdates = useCallback(() => {
    if (!tabVisible) return;

    if (updateIntervalRef.current) {
      clearInterval(updateIntervalRef.current);
    }

    fetchCurrentSong();
    updateIntervalRef.current = setInterval(() => {
      if (!document.hidden) fetchCurrentSong();
    }, 10000);
  }, [fetchCurrentSong, tabVisible]);

  useEffect(() => {
    setupSongUpdates();
    return () => {
      if (updateIntervalRef.current) {
        clearInterval(updateIntervalRef.current);
      }
    };
  }, [setupSongUpdates]);

  // Fetch cooldown
  useEffect(() => {
    async function fetchCooldown() {
      if (document.hidden) return;
      try {
        const res = await fetch("/api/cooldown");
        const data = await res.json();
        const newCooldown = data.cooldown && data.cooldown > 0 ? data.cooldown : 0;
        setCooldown(newCooldown);
        cooldownRef.current = newCooldown;
      } catch (error) {
        console.error("Failed to fetch cooldown:", error);
      }
    }

    fetchCooldown();
    const interval = setInterval(fetchCooldown, 5000);
    return () => clearInterval(interval);
  }, [tabVisible]);

  // Cooldown countdown
  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      cooldownRef.current -= 1;
      if (cooldownRef.current <= 0) {
        setCooldown(0);
        clearInterval(timer);
      } else {
        setCooldown(cooldownRef.current);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  const search = async () => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/search-song?query=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data.results || []);
    } catch (error) {
      console.error("Search failed:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const changeSong = async (uri: string) => {
    try {
      const res = await fetch("/api/change-song", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trackUri: uri }),
      });

      if (res.status === 429) {
        const data = await res.json();
        setCooldown(data.cooldown);
        cooldownRef.current = data.cooldown;
      } else if (res.ok) {
        // Immediately refresh song info after successful change
        setTimeout(setupSongUpdates, 1000);
      }
    } catch (error) {
      console.error("Failed to change song:", error);
    }
  };

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const progressPercentage = currentSong
    ? Math.min((predictedProgress / currentSong.duration_ms) * 100, 100)
    : 0;

  return (
    <div className="main-container min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 p-6 flex items-center justify-center">
      <div className="max-w-2xl w-full space-y-6">
        <Card className="text-center font-bold text-green-400 text-2xl backdrop-blur-lg from-surface-light/60 to-surface-deep/60 p-6">
          control my spotify <SiSpotify className="inline" />{" "}
        </Card>
        {/* Current Song Display */}
        <Card className="backdrop-blur-lg from-surface-light/60 to-surface-deep/60">
          {initialLoading ? (
            <div className="text-center py-8 text-purple-400">
              <Clock className="w-12 h-12 mx-auto mb-3 animate-spin opacity-50" />
              <p className="text-lg">loading...</p>
            </div>
          ) : currentSong ? (
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="relative">
                  <img
                    src={currentSong.albumArt}
                    alt="Album Art"
                    className="w-20 h-20 rounded-xl shadow-lg"
                  />
                  <div
                    className={`absolute -bottom-2 -right-2 rounded-full p-1 ${
                      isPlaying ? "bg-green-500" : "bg-gray-500"
                    }`}
                  >
                    {isPlaying ? (
                      <Play className="w-4 h-4 text-white fill-current" />
                    ) : (
                      <Pause className="w-4 h-4 text-white fill-current" />
                    )}
                  </div>
                </div>

                {!isPlaying && (
                  <Pause className="size-8 absolute right-6 text-white fill-current" />
                )}
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl font-bold text-white truncate flex items-center">
                    <span>{currentSong.name}</span>{" "}
                    <a
                      href={`https://open.spotify.com/track/${currentSong.uri
                        ?.split(":")
                        .pop()}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 size-6 bg-gradient-to-br from-green-400 to-green-600 rounded-lg hover:opacity-50 transition-opacity flex items-center justify-center"
                    >
                      <Play className="size-4 mx-auto text-white fill-white" />
                    </a>
                  </h2>
                  <p className="text-purple-400 truncate">{currentSong.artists}</p>

                  <div className="mt-3 space-y-2">
                    <div className="flex justify-between text-sm text-purple-400">
                      <span>{formatTime(predictedProgress)}</span>
                      <span>{formatTime(currentSong.duration_ms)}</span>
                    </div>

                    <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-200 ease-out ${
                          isPlaying
                            ? "bg-gradient-to-r from-purple-400 to-pink-400"
                            : "bg-gradient-to-r from-gray-400 to-gray-500"
                        }`}
                        style={{ width: `${progressPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-purple-400">
              <Music className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="text-lg">not listening to anything rn</p>
            </div>
          )}
        </Card>

        {/* Search Section */}
        <Card className="backdrop-blur-lg from-surface-light/60 to-surface-deep/60">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-white flex items-center gap-2">
              <Search className="w-5 h-5 text-purple-400" />
              play something else
            </h3>

            <div className="flex gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={query}
                  placeholder="search for songs..."
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyUp={(e) => e.key === "Enter" && search()}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                />
              </div>

              <button
                onClick={search}
                disabled={loading || !query.trim()}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-500 disabled:to-gray-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 min-w-[100px] justify-center"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    search
                  </>
                )}
              </button>
            </div>
          </div>
        </Card>

        {/* Search Results */}
        {results.length > 0 && (
          <Card className="backdrop-blur-lg from-surface-light/60 to-surface-deep/60 p-6">
            <h3 className="text-xl font-semibold text-white mb-4">results:</h3>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {results.map((track, index) => (
                <div
                  key={track.uri}
                  className="flex items-center justify-between p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-200 group"
                >
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-white truncate group-hover:text-purple-200">
                      {track.name}
                    </h4>
                    <p className="text-sm text-purple-300 truncate">{track.artist}</p>
                  </div>

                  <button
                    disabled={cooldown > 0}
                    onClick={() => changeSong(track.uri)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 min-w-[120px] justify-center ${
                      cooldown > 0
                        ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                        : "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg hover:shadow-xl"
                    }`}
                  >
                    {cooldown > 0 ? (
                      <>
                        <Clock className="w-4 h-4" />
                        {cooldown}s
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4" />
                        play!
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Cooldown Indicator */}
        {cooldown > 0 && (
          <Card className="backdrop-blur-lg from-amber-400/60 to-amber-300/60 p-4">
            <div className="flex items-center gap-3 text-amber-200">
              <Clock className="w-5 h-5 text-amber-400" />
              <span className="font-medium">
                Cooldown active: {cooldown} seconds remaining
              </span>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
