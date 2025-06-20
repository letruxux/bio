import { NextResponse } from "next/server";

export async function GET() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const redirectUri = "https://letruxux.vercel.app/api/callback";
  const scope = [
    "user-read-playback-state",
    "user-read-currently-playing",
    "user-read-private",
    "user-read-email",
  ].join(" ");

  if (!clientId) {
    return NextResponse.json(
      { error: "Missing SPOTIFY_CLIENT_ID in env" },
      { status: 500 }
    );
  }

  const url =
    `https://accounts.spotify.com/authorize?` +
    new URLSearchParams({
      response_type: "code",
      client_id: clientId,
      scope: scope,
      redirect_uri: redirectUri,
    }).toString();

  return NextResponse.json({ authUrl: url });
}
