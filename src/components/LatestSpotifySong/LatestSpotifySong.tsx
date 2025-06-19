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
    
    let song: RecentlyPlayedItem | null = null;
    let songImageUrl: string | undefined;

    if (musics && musics.length > 0) {
      // Usar dados do Firebase quando disponíveis
      song = musics[0];
    } else {
      // Buscar dados da API externa quando não houver dados locais
      const res = await fetch("https://grim-uk.vercel.app/api/spotify/music");
      if (!res.ok) {
        throw new Error("Failed to fetch Spotify data");
      }
      const data = await res.json() as RecentlyPlayedItem[];
      song = data[0];
    }

    // Extrair URL da imagem diretamente dos dados da música
    if (song?.track?.album?.images?.length > 0) {
      songImageUrl = song.track.album.images[0].url;
    }

    // Retornar card apenas se houver uma música válida
    if (song) {
      return (
        <GlassCard
          title={song.track.name || "Unknown Track"}
          subtitle={song.track.artists.map(a => a.name).join(", ") || "Unknown Artist"}
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

    // Retornar card padrão quando não houver música
    return (
      <GlassCard
        title="Nenhuma música encontrada"
        subtitle="Tente reproduzir algo no Spotify"
        imageUrl="https://th.bing.com/th/id/OIP.VZwJx4OiCq5FifiYLc5TgHaHa?cb=iwc2&rs=1&pid=ImgDetMain"
      />
    );

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
        title="Erro ao carregar música"
        subtitle="Tente novamente mais tarde"
        imageUrl="https://th.bing.com/th/id/OIP.VZwJx4OiCq5FifiYLc5TgHaHa?cb=iwc2&rs=1&pid=ImgDetMain"
      />
    );
  }
}
