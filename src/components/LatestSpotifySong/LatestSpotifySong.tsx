"use server";

import { RecentlyPlayedItem } from "@/types/SpotifyApiTypes";
import GlassCard from "@components/GlassCard/GlassCard";
import { getLatestListenedMusic } from "@libs/firebase/getLatestListenedMusic";
import { getSpotifyTokens } from "@libs/firebase/getSpotifyTokens";
import { headers } from "next/headers";

export default async function LatestSpotifySong() {
  try {
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


    return (
      <GlassCard
        title={data[0].track.name || "Unknown Track"}
        subtitle={data[0].track.artists.join(", ") || "Unknown Artist"}
        spotify={{
          trackId: data[0].track.id || ""
        }}
        delay={1.8}
        redirectUrl={`https://open.spotify.com/track/${data[0].track.id}`}
        imageUrl={
          data[0].track.album.uri ||
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
