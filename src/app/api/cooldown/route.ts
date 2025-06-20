import { NextResponse } from "next/server";
import { createClient } from "redis";

const redis = createClient({ url: process.env.REDIS_URL });
await redis.connect();

const REDIS_KEY = "spotify_global_cooldown";

export async function GET() {
  try {
    const ttl = await redis.ttl(REDIS_KEY);
    return NextResponse.json({ cooldown: ttl > 0 ? ttl : 0 });
  } catch {
    return NextResponse.json({ cooldown: 0 });
  }
}
