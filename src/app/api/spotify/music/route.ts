import { getLatestListenedMusic } from "@/libs/firebase/getLatestListenedMusic";
import { setLatestListenedMusic } from "@/libs/firebase/setLatestListenedMusic";
import { getSpotifyTokens } from "@libs/firebase/getSpotifyTokens";
import { RecentlyPlayedResponse } from "@type/SpotifyApiTypes";
import { NextResponse } from "next/server";

export async function GET() {
  const tokens = await getSpotifyTokens();
  if (!tokens)
    return NextResponse.json(
      { message: "Spotify tokens not found" },
      { status: 404 }
    );

  try {
    const res = await fetch(
      "https://api.spotify.com/v1/me/player/recently-played?limit=10",
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) throw new Error("Failed to fetch Spotify data");

    const data = (await res.json()) as RecentlyPlayedResponse;

    if (!data.items || data.items.length === 0) {
      const databaseData = await getLatestListenedMusic();
      if (!databaseData || databaseData.length === 0) {
        return NextResponse.json(
          { message: "No recent music found" },
          { status: 404 }
        );
      }

      return NextResponse.json(databaseData);
    }

    const organizedSongs = data.items.sort((a, b) => {
        return (
          new Date(b.played_at).getTime() - new Date(a.played_at).getTime()
        );
      });

      await setLatestListenedMusic(organizedSongs)

    return NextResponse.json(
      organizedSongs
    );
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
          Authorization: `Bearer ${tokens.accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) throw new Error("Failed to fetch Spotify data");

    const data = (await res.json()) as RecentlyPlayedResponse;

    if (!data.items || data.items.length === 0)
      return NextResponse.json(
        {
          message: "No recent music found",
        },
        { status: 404 }
      );

    await setLatestListenedMusic(
      data.items.sort(
        (a, b) =>
          new Date(b.played_at).getTime() - new Date(a.played_at).getTime()
      )
    );

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
