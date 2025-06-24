import { getLatestListenedMusic } from "@/libs/firebase/getLatestListenedMusic";
import { setLatestListenedMusic } from "@/libs/firebase/setLatestListenedMusic";
import { refreshAccessToken } from "@/libs/spotify/refreshToken";
import { getSpotifyTokens } from "@libs/firebase/getSpotifyTokens";
import {
  RecentlyPlayedResponse,
} from "@type/SpotifyApiTypes";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    let tokens = await getSpotifyTokens();
    if (!tokens)
      return NextResponse.json(
        { message: "Spotify tokens not found" },
        { status: 404 }
      );

    if (tokens.expiresAt <= Date.now()) {
      tokens = await refreshAccessToken(tokens.refreshToken);
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