export async function getAccessToken() {
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

export function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  const parts = [];

  if (h > 0) parts.push(h + (h === 1 ? " hour" : " hours"));
  if (m > 0) parts.push(m + (m === 1 ? " minute" : " minutes"));
  if (s > 0 || parts.length === 0) parts.push(s + (s === 1 ? " second" : " seconds"));

  if (parts.length === 1) return parts[0];
  return parts.slice(0, -1).join(", ") + " and " + parts[parts.length - 1];
}
