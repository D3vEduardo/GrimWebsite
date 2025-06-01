import { ImageResponse } from 'next/og'

export const alt = 'Grim - Community Manager, Game Developer and Data Analyst'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: 'linear-gradient(to bottom right, #6366f1, #8b5cf6, #d946ef)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          padding: '40px',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontSize: '72px', margin: '0 0 20px 0' }}>Grim</h1>
        <p style={{ fontSize: '36px', margin: '0', opacity: 0.9 }}>
          Community Manager, Game Developer and Data Analyst
        </p>
      </div>
    ),
    {
      ...size,
    }
  )
}