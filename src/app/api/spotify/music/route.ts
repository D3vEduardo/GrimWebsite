import { getLatestListenedMusic } from "@/libs/firebase/getLatestListenedMusic";
import { setLatestListenedMusic } from "@/libs/firebase/setLatestListenedMusic";
import { getSpotifyTokens } from "@libs/firebase/getSpotifyTokens";
import {
  RecentlyPlayedResponse,
  SpotifyAuthPayload,
} from "@type/SpotifyApiTypes";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    let tokens = await getSpotifyTokens();
    if (!tokens)
      return NextResponse.json(
        { message: "Spotify tokens not found" },
        { status: 404 }
      );

    if (tokens.expiresAt <= Date.now()) {
      const res = await fetch(new URL("", req.url), {
        method: "POST",
        body: JSON.stringify({
          refresh_token: tokens.refreshToken,
        }),
      });

      if (!res.ok)
        return NextResponse.json({ message: "Error on refresh access token!" });

      const data: {
        message: string;
        tokens: SpotifyAuthPayload;
      } = await res.json();

      tokens = data.tokens;
    }

    const res = await fetch(
      "https://api.spotify.com/v1/me/player/recently-played?limit=10",
      {
        headers: {
          Authorization: `Bearer ${tokens?.accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = (await res.json()) as RecentlyPlayedResponse;
    if (!res.ok)
      return NextResponse.json(
        {
          message: "Error on fetch Spotify Data",
          body: data,
        },
        { status: 400 }
      );

    if (!data.items || data.items.length === 0) {
      const databaseData = await getLatestListenedMusic();
      if (!databaseData || databaseData.length === 0)
        return NextResponse.json(
          { message: "No recent music found" },
          { status: 404 }
        );

      return NextResponse.json(databaseData);
    }

    const organizedSongs = data.items.sort((a, b) => {
      return new Date(b.played_at).getTime() - new Date(a.played_at).getTime();
    });

    // Get the latest song (first item after sorting)
    const latestSong = organizedSongs[0];
    await setLatestListenedMusic([latestSong]);

    return NextResponse.json([latestSong]);
  } catch (e) {
    console.error("API ROUTE /api/spotify/music (GET):", e);
    return NextResponse.json(
      { message: "Failed to fetch Spotify data" },
      { status: 500 }
    );
  }
}

export async function POST() {
  try {
    const tokens = await getSpotifyTokens();
    if (!tokens)
      return NextResponse.json(
        { message: "Spotify tokens not found" },
        { status: 404 }
      );
    const res = await fetch(
      "https://api.spotify.com/v1/me/player/recently-played?limit=10",
      {
        headers: {
          Authorization: `Bearer ${tokens?.accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = (await res.json()) as RecentlyPlayedResponse;
    if (!res.ok)
      return NextResponse.json({
        message: "Error on get spotify musics!",
        body: data,
      });

    if (!data.items || data.items.length === 0)
      return NextResponse.json(
        {
          message: "No recent music found",
        },
        { status: 404 }
      );

    const sortedSongs = data.items.sort(
      (a, b) =>
        new Date(b.played_at).getTime() - new Date(a.played_at).getTime()
    );
    const latestSong = sortedSongs[0];
    await setLatestListenedMusic([latestSong]);

    return NextResponse.json(
      { message: "Latest listened music updated successfully" },
      { status: 200 }
    );
  } catch (e) {
    console.error("API ROUTE /api/spotify/music (POST):", e);
    return NextResponse.json(
      { message: "Failed to fetch Spotify data" },
      { status: 500 }
    );
  }
}
