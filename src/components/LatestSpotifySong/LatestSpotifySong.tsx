'use server'

import GlassCard from "@/components/GlassCard/GlassCard";
import { env } from "@libs/zod/env";
import { Types } from "use-lanyard";

export default async function LatestSpotifySong() {
  
  try {

    const baseUrl = !env.DEV
      ? 'https://grimwebsite.onrender.com' 
      : 'http://localhost:3000';
    
    const res = await fetch(`${baseUrl}/api/`, {

      cache: 'no-store',
      next: {
        revalidate: 0,
      }
    });
    
    if (!res.ok) {
      console.error("Erro ao buscar dados da API no Server Component:", res.status, res.statusText);

      return (
        <GlassCard
          title="Music Unavailable"
          subtitle="Unable to load current track"
          imageUrl="https://th.bing.com/th/id/OIP.VZwJx4OiCq5FifiYLc5TgHaHa?cb=iwc2&rs=1&pid=ImgDetMain"
        />
      );
    }

    const data: Types.Spotify = await res.json();
    return (
      <GlassCard
        title={data.song || "Unknown Track"}
        subtitle={data.artist || "Unknown Artist"}
        spotify={{
          trackId: data.track_id?.toString() || ""
        }}
        delay={1.8}
        redirectUrl={`https://open.spotify.com/track/${data.track_id}`}
        imageUrl={
          data.album_art_url ||
          "https://th.bing.com/th/id/OIP.VZwJx4OiCq5FifiYLc5TgHaHa?cb=iwc2&rs=1&pid=ImgDetMain"
        }
      />
    );
  } catch (error) {
    console.error("Erro durante a renderização ou busca de dados no Server Component:", error);

    return (
      <GlassCard
        title="Error Loading Music"
        subtitle="Please try again later"
        imageUrl="https://th.bing.com/th/id/OIP.VZwJx4OiCq5FifiYLc5TgHaHa?cb=iwc2&rs=1&pid=ImgDetMain"
      />
    );
  }
}
