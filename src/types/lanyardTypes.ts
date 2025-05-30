import { Types } from "use-lanyard";

export type LanyardResponseType = Types.Presence & {
  kv:
    | {
        connected_accounts: ConnectedAccountType[] | undefined;
        description: string;
        dynamic_favicon: "enabled" | "disabled";
        activity_state: string;
      }
    | undefined;
};

export type ConnectedAccountType = {
  name: string;
  url: string;
  icon: string;
};

export interface DiscordUser {
  username: string;
  avatar: string;
  avatar_decoration_data: {
    sku_id: string;
    asset: string;
    expires_at: number | null;
  };
  public_flags: number;
  flags: number;
  clan?: {
    badge: string;
    tag: string;
  };
}

export interface Activity {
  type: number;
  name: string;
  state?: string;
  details?: string;
  timestamps?: {
    start?: number;
  };
  assets?: {
    large_image: string;
    large_text: string;
    small_image: string;
    small_text: string;
  };
  emoji?: {
    id: string;
    name: string;
  };
  application_id?: string;
}

export interface SpotifyData {
  song: string;
  artist: string;
  album: string;
  album_art_url: string;
  timestamps: {
    start: number;
    end: number;
  };
}

export interface LanyardData {
  discord_user: DiscordUser;
  discord_status: "online" | "offline" | "idle" | "dnd";
  active_on_discord_mobile: boolean;
  active_on_discord_desktop: boolean;
  active_on_discord_web: boolean;
  activities: Activity[];
  listening_to_spotify: boolean;
  spotify: SpotifyData;
  clan?: {
    badge: string;
    tag: string;
  };
  kv?: {
    connected_accounts: ConnectedAccountType[] | undefined;
    description: string;
    dynamic_favicon: "enabled" | "disabled";
    activity_state: string;
  };
}
