"use client";

import { useRealTimeUserData } from "@contexts/RealTimeUserData/hook";
import GlassCard from "../GlassCard/GlassCard";

interface CardsSectionProps {
  latestSpotifySongComponent: React.ReactNode;
}

export default function CardsSection({
  latestSpotifySongComponent,
}: CardsSectionProps) {
  const userData = useRealTimeUserData();
  const userActivity = userData?.activities.find(
    (activity) => activity.id === "custom"
  );
  const spotifyData = userData?.spotify;

  if (!userData?.discord_user) return null;

  return (
    <section
      style={{
        width: "100%",
        marginTop: "25px",
        gap: "30px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <GlassCard
        imageUrl={`https://cdn.discordapp.com/avatars/${
          userData.discord_user.id
        }/${userData.discord_user?.avatar}${
          userData.discord_user.avatar?.includes("a_") ? ".gif" : ".png"
        }`}
        title={"@" + userData.discord_user.username || "User"}
        subtitle={userActivity?.state || userData.kv.activity_state}
        delay={1}
        redirectUrl={`https://discord.com/users/${userData.discord_user.id}`}
      />
      {spotifyData ? (
        <GlassCard
          imageUrl={
            spotifyData.album_art_url ||
            "https://th.bing.com/th/id/OIP.VZwJx4OiCq5FifiYLc5TgHaHa?cb=iwc2&rs=1&pid=ImgDetMain"
          }
          title={spotifyData.song}
          subtitle={spotifyData.artist || "Artist"}
          delay={1.8}
          redirectUrl={`https://open.spotify.com/track/${spotifyData.track_id}`}
          spotify={{
            trackId: spotifyData.track_id?.toString() || "",
          }}
        />
      ) : (
        latestSpotifySongComponent
      )}
    </section>
  );
}
