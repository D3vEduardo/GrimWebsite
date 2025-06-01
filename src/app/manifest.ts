import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Grim Portfolio',
    short_name: 'Grim',
    description: 'Grim - Community Manager, Game Developer and Data Analyst',
    start_url: '/',
    display: 'standalone',
    background_color: '#6366f1',
    theme_color: '#8b5cf6',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/grim.jpg',
        sizes: '800x600',
        type: 'image/jpeg',
      },
    ],
  }
}