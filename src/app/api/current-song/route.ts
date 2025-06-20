import { NextResponse } from "next/server";

async function getAccessToken() {
  const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken ?? "",
      redirect_uri: "http://127.0.0.1:3000",
    }),
  });

  if (!res.ok) throw new Error("Failed to refresh token" + (await res.text()));
  const data = await res.json();
  return data.access_token;
}

export async function GET() {
  try {
    const accessToken = await getAccessToken();

    const res = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (res.status === 204) {
      return NextResponse.json({ playing: false });
    }

    if (!res.ok) {
      return NextResponse.json({ error: await res.text() }, { status: res.status });
    }

    const data = await res.json();

    return NextResponse.json({
      playing: true,
      song: {
        name: data.item.name,
        artists: data.item.artists.map((a: any) => a.name).join(", "),
        progress_ms: data.progress_ms,
        duration_ms: data.item.duration_ms,
        albumArt: data.item.album.images[0]?.url,
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error", details: err.message },
      { status: 500 }
    );
  }
}
