export interface SpotifyTokenResponse {
  access_token: string;
  token_type: "Bearer";
  scope: string;
  expires_in: number;
  refresh_token?: string;
}

export interface SpotifyAuthPayload {
  // userId: string
  accessToken: string;
  refreshToken: string;
  expiresAt: number; // timestamp
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface RecentlyPlayedResponse {
  href: string;
  items: RecentlyPlayedItem[];
  limit: number;
  next: string | null;
  cursors: {
    after: string;
    before: string;
  };
  total: number;
}

export interface RecentlyPlayedItem {
  track: SpotifyTrack;
  played_at: string; // ISO date string
  context: SpotifyContext | null;
}

export interface SpotifyTrack {
  album: SpotifyAlbum;
  artists: SpotifyArtist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc: string;
  };
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  popularity: number;
  preview_url: string | null;
  track_number: number;
  type: "track";
  uri: string;
}

export interface SpotifyAlbum {
  album_type: "album" | "single" | "compilation";
  total_tracks: number;
  available_markets: string[];
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  release_date: string;
  release_date_precision: "year" | "month" | "day";
  type: "album";
  uri: string;
}

export interface SpotifyArtist {
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  type: "artist";
  uri: string;
}

export interface SpotifyImage {
  height: number;
  url: string;
  width: number;
}

export interface SpotifyContext {
  type: string;
  href: string;
  external_urls: {
    spotify: string;
  };
  uri: string;
}
