"use server";

import { RecentlyPlayedItem } from "@/types/SpotifyApiTypes";
import GlassCard from "@components/GlassCard/GlassCard";
import { getLatestListenedMusic } from "@libs/firebase/getLatestListenedMusic";
import { getSpotifyTokens } from "@libs/firebase/getSpotifyTokens";
import { headers } from "next/headers";

export default async function LatestSpotifySong() {
  try {
    const tokens = await getSpotifyTokens();
    const headersList = await headers();
    const host = headersList.get("host");
    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
    const url = `${protocol}://${host}`;
    const musics = await getLatestListenedMusic();
    if (!musics || musics.length === 0) {
      const res = await fetch("https://grim-uk.vercel.app/api/spotify/music");
      if (!res.ok) {
        throw new Error("Failed to fetch Spotify data");
      }
      const data = await res.json() as RecentlyPlayedItem[];
      const song = data[0];
      const songImageApiRes = await fetch(song.track.album.href, {
        headers: {
          'Authorization': `Bearer ${tokens?.accessToken}`
        }
      });
      let songImageUrl: string | undefined;
      if (songImageApiRes.ok) {
        const data = await songImageApiRes.json();
        songImageUrl = data.images[0].url; 
      }

    return (
      <GlassCard
        title={song.track.name || "Unknown Track"}
        subtitle={song.track.artists.join(", ") || "Unknown Artist"}
        spotify={{
          trackId: song.track.id || ""
        }}
        delay={1.8}
        redirectUrl={`https://open.spotify.com/track/${song.track.id}`}
        imageUrl={
          songImageUrl ||
          "https://th.bing.com/th/id/OIP.VZwJx4OiCq5FifiYLc5TgHaHa?cb=iwc2&rs=1&pid=ImgDetMain"
        }
      />
    );
    }
  } catch (error) {
    console.error(
      "Erro durante a renderização ou busca de dados no componente LatestSpotifySong:",
      error
    );

    await fetch("/api/spotify/music", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      }
    });

    return (
      <GlassCard
        title="Error Loading Music"
        subtitle="Please try again later"
        imageUrl="https://th.bing.com/th/id/OIP.VZwJx4OiCq5FifiYLc5TgHaHa?cb=iwc2&rs=1&pid=ImgDetMain"
      />
    );
  }
}
