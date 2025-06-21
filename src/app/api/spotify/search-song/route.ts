import { NextRequest, NextResponse } from "next/server";
import { getAccessToken } from "../../spotify";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query");
  if (!query) {
    return NextResponse.json({ error: "Missing query" }, { status: 400 });
  }

  let accessToken;
  try {
    accessToken = await getAccessToken();
  } catch (err) {
    return NextResponse.json({ error: "Token refresh failed" }, { status: 500 });
  }

  const res = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(
      query
    )}&type=track&limit=10`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const data = await res.json();
  const results = data.tracks?.items.map((item: any) => ({
    name: item.name,
    artist: item.artists[0]?.name,
    uri: item.uri,
  }));

  return NextResponse.json({ results });
}
