import { NextResponse } from "next/server";
import { createClient } from "redis";
import { getAccessToken } from "../../spotify";

const redis = createClient({ url: process.env.REDIS_URL });
await redis.connect();

const REDIS_KEY = "spotify_global_cooldown";

export async function POST(req: Request) {
  try {
    const cooldownTTL = await redis.ttl(REDIS_KEY);
    if (cooldownTTL > 0) {
      return NextResponse.json(
        { error: "Cooldown active", cooldown: cooldownTTL },
        { status: 429 }
      );
    }

    const { trackUri } = await req.json();
    if (!trackUri) {
      return NextResponse.json({ error: "Missing trackUri" }, { status: 400 });
    }

    const accessToken = await getAccessToken();

    const res = await fetch("https://api.spotify.com/v1/me/player/play", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uris: [trackUri] }),
    });

    if (!res.ok) {
      const errorData = await res.json();
      return NextResponse.json(
        { error: "Spotify API error", details: errorData },
        { status: res.status }
      );
    }

    await redis.set(REDIS_KEY, "1", { EX: 300 }); // cooldown 5 minuti

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error", details: (err as any).message },
      { status: 500 }
    );
  }
}
