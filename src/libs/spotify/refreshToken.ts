import { env } from "@libs/zod/env";
import { setSpotifyTokens } from "@/libs/firebase/setSpotifyTokens";
import { SpotifyAuthPayload, SpotifyTokenResponse } from "@type/SpotifyApiTypes";

export async function refreshAccessToken(refresh_token: string): Promise<SpotifyAuthPayload> {
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(`${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });

  const data = (await res.json()) as SpotifyTokenResponse;

  if (!res.ok || !data.access_token) throw new Error("Failed to refresh token");

  const tokens: SpotifyAuthPayload = {
    accessToken: data.access_token,
    refreshToken: data.refresh_token ?? refresh_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };

  await setSpotifyTokens(tokens);
  return tokens;
}
