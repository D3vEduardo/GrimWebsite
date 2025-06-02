import { ImageResponse } from 'next/og'
import { join } from 'path'
import { readFileSync } from 'fs'

export const alt = 'Grim - Community Manager, Game Developer and Data Analyst'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/jpeg'

export default async function Image() {
  const imagePath = join(process.cwd(), 'public', 'grim.jpg')
  const imageData = readFileSync(imagePath)
  const imageBase64 = imageData.toString('base64')

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img 
          src={`data:image/jpeg;base64,${imageBase64}`}
          alt="Grim"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </div>
    ),
    {
      ...size,
    }
  )
}