import { NextResponse } from "next/server";
import { getAccessToken } from "../../spotify";

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
      playing: data.is_playing,
      song: {
        name: data.item.name,
        artists: data.item.artists.map((a: any) => a.name).join(", "),
        progress_ms: data.progress_ms,
        duration_ms: data.item.duration_ms,
        albumArt: data.item.album.images[0]?.url,
        uri: data.item.uri,
      },
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error", details: (err as any).message },
      { status: 500 }
    );
  }
}
