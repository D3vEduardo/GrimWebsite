export interface SpotifyTokenResponse {
  access_token: string
  token_type: 'Bearer'
  scope: string
  expires_in: number
  refresh_token?: string
}

export interface SpotifyAuthPayload {
  // userId: string
  accessToken: string
  refreshToken: string
  expiresAt: number // timestamp
}

export interface RefreshTokenRequest {
  refreshToken: string
}
