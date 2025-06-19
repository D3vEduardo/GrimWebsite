import { SpotifyTokenResponse } from "@type/SpotifyApiTypes";
import { env } from "@libs/zod/env";
import { NextRequest, NextResponse } from "next/server";
import { setSpotifyTokens } from "@/libs/firebase/setSpotifyTokens";

export async function GET(
  request: NextRequest,
  context: { params: { action: string } }
) {
  try {
    const { action } = await context.params;

    switch (action) {
      default:
        return LoginAction();
      case "callback":
        return await CallbackAction(request);
    }
  } catch (error) {
    console.error(
      "API ROUTE /api/spotify/auth/[action] (GET):",
      "Error in Spotify auth action:",
      error
    );
    return NextResponse.redirect("/api/spotify/auth", 302);
  }
}

function LoginAction() {
  const redirectUri = env.SPOTIFY_REDIRECT_URI;
  const clientId = env.SPOTIFY_CLIENT_ID;
  console.log(clientId, redirectUri);
  const scope = "user-read-recently-played";

  const url = new URL("https://accounts.spotify.com/authorize");
  url.searchParams.set("client_id", clientId);
  url.searchParams.set("response_type", "code");
  url.searchParams.set("redirect_uri", redirectUri);
  url.searchParams.set("scope", scope);
  return NextResponse.redirect(url.toString(), 302);
}

async function CallbackAction(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  if (!code) return NextResponse.redirect("/api/spotify/auth", 302);
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(
          `${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`
        ).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: env.SPOTIFY_REDIRECT_URI,
    }),
  });

  const data = (await res.json()) as SpotifyTokenResponse;
  if (!res.ok || !data.refresh_token || !data.access_token) {
    console.error(
      "API ROUTE /api/spotify/auth/callback (GET REFRESH TOKEN):",
      "Spotify auth error:",
      data
    );
    return NextResponse.redirect("/api/spotify/auth", 302);
  }

  console.log(
    "API ROUTE /api/spotify/auth/callback (GET REFRESH TOKEN):",
    "Spotify auth success:",
    JSON.stringify(data)
  );

  const expiresAt = Date.now() + data.expires_in * 1000;
  await setSpotifyTokens({
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresAt: expiresAt,
  });

  return NextResponse.redirect("/", 302);
}

export async function POST(req: NextRequest) {
  const { refresh_token } = await req.json();
  if (!refresh_token)
    return NextResponse.json(
      { error: "Refresh token is required" },
      { status: 400 }
    );

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(
          `${env.SPOTIFY_CLIENT_ID}:${env.SPOTIFY_CLIENT_SECRET}`
        ).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      userId: "6srfgjim8k0abzf43oqefkahq",
      grant_type: "refresh_token",
      refresh_token: refresh_token,
    }),
  });

  const data = (await res.json()) as SpotifyTokenResponse;
  const expiresAt = Date.now() + data.expires_in * 1000;
  if (!res.ok || !data.refresh_token || !data.access_token) {
    console.error(
      "API ROUTE /api/spotify/auth (POST REFRESH TOKEN):",
      "Spotify auth error:",
      data
    );
    return NextResponse.json(
      { error: "Failed to refresh Spotify token" },
      { status: 500 }
    );
  }

  await setSpotifyTokens({
    accessToken: data.access_token,
    refreshToken: data.refresh_token,
    expiresAt: expiresAt,
  });
  return NextResponse.json({ success: true }, { status: 200 });
}
