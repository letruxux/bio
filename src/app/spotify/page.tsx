"use client";
import { useEffect, useState, useRef } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  // cooldown timer (secondi)
  const [cooldown, setCooldown] = useState(0);
  const cooldownRef = useRef(0);

  const [currentSong, setCurrentSong] = useState<null | {
    name: string;
    artists: string;
    progress_ms: number;
    duration_ms: number;
    albumArt: string;
  }>(null);

  // Aggiorna cooldown dal backend ogni 5s
  useEffect(() => {
    async function fetchCooldown() {
      const res = await fetch("/api/cooldown");
      const data = await res.json();
      if (data.cooldown && data.cooldown > 0) {
        setCooldown(data.cooldown);
        cooldownRef.current = data.cooldown;
      } else {
        setCooldown(0);
        cooldownRef.current = 0;
      }
    }
    fetchCooldown();
    const interval = setInterval(fetchCooldown, 5000);
    return () => clearInterval(interval);
  }, []);

  // Conta indietro ogni secondo
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

  // Aggiorna canzone attuale ogni 5s
  useEffect(() => {
    async function fetcha() {
      const res = await fetch("/api/current-song");
      const data = await res.json();
      if (data.playing) {
        setCurrentSong(data.song);
      } else {
        setCurrentSong(null);
      }
    }
    const interval = setInterval(async () => {
      await fetcha();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const search = async () => {
    setLoading(true);
    const res = await fetch(`/api/search-song?query=${encodeURIComponent(query)}`);
    const data = await res.json();
    setResults(data.results || []);
    setLoading(false);
  };

  const changeSong = async (uri: string) => {
    const res = await fetch("/api/change-song", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ trackUri: uri }),
    });

    if (res.status === 429) {
      const data = await res.json();
      alert(`Cooldown attivo! Aspetta ${data.cooldown}s.`);
      setCooldown(data.cooldown);
      cooldownRef.current = data.cooldown;
    } else if (!res.ok) {
      alert("Errore nel cambiare la canzone");
    } else {
      alert("Canzone cambiata!");
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🎶 Cambia la canzone</h1>

      {currentSong ? (
        <div className="mb-4 flex items-center gap-4 border p-3 rounded">
          <img src={currentSong.albumArt} alt="Album Art" className="w-16 h-16 rounded" />
          <div className="flex flex-col flex-1">
            <div className="font-semibold">{currentSong.name}</div>
            <div className="text-sm text-gray-600">{currentSong.artists}</div>
            <progress
              value={currentSong.progress_ms}
              max={currentSong.duration_ms}
              className="w-full mt-1"
            />
          </div>
        </div>
      ) : (
        <div className="mb-4 text-gray-500">Non stai ascoltando nulla al momento</div>
      )}

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={query}
          placeholder="Cerca una canzone..."
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 border rounded px-3 py-2"
        />
        <button
          onClick={search}
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          {loading ? "..." : "Cerca"}
        </button>
      </div>

      <ul className="space-y-2">
        {results.map((r) => (
          <li
            key={r.uri}
            className="border p-3 rounded flex justify-between items-center"
          >
            <div>
              <strong>{r.name}</strong>
              <div className="text-sm text-gray-500">{r.artist}</div>
            </div>
            <button
              disabled={cooldown > 0}
              onClick={() => changeSong(r.uri)}
              className={`px-3 py-1 rounded text-white ${
                cooldown > 0 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500"
              }`}
            >
              {cooldown > 0 ? `Cooldown: ${cooldown}s` : "Cambia"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
