import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MorphingGradient from "@components/MorphingGradient/MorphingGradient";
import DynamicFavIcon from "@components/DynamicFavIcon/DynamicFavIcon";
import RealTimeUserDataProvider from "@/contexts/RealTimeUserData/provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Grim | Community Manager, Game Developer and Data Analyst",
  description: "Grim's Portfolio - Community Manager, Game Developer and Data Analyst. Check out projects, skills and real-time information.",
  keywords: [
    // English
    "Grim", "Community Manager", "Game Developer", "Data Analyst", "Portfolio", "Discord", "Spotify",
    // Portuguese
    "Gerente de Comunidade", "Desenvolvedor de Jogos", "Analista de Dados",
    // Spanish
    "Gestor de Comunidad", "Desarrollador de Juegos", "Analista de Datos",
    // French
    "Gestionnaire de Communauté", "Développeur de Jeux", "Analyste de Données",
    // German
    "Community-Manager", "Spieleentwickler", "Datenanalyst"
  ],
  authors: [{ name: "Grim" }],
  creator: "Grim",
  publisher: "Grim",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://grim-uk.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Grim | Community Manager, Game Developer and Data Analyst",
    description: "Grim's Portfolio - Community Manager, Game Developer and Data Analyst. Check out projects, skills and real-time information.",
    url: "https://grim-uk.com",
    siteName: "Grim Portfolio",
    locale: "en_US",
    type: "website",
    images: [{
      url: "/grim.jpg",
      width: 800,
      height: 600,
      alt: "Grim - Community Manager, Game Developer and Data Analyst"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Grim | Community Manager, Game Developer and Data Analyst",
    description: "Grim's Portfolio - Community Manager, Game Developer and Data Analyst. Check out projects, skills and real-time information.",
    creator: "@grim",
    images: [{
      url: "/grim.jpg",
      width: 800,
      height: 600,
      alt: "Grim - Community Manager, Game Developer and Data Analyst"
    }]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} `}>
        <MorphingGradient />
        <RealTimeUserDataProvider>
          <DynamicFavIcon />
          {children}
        </RealTimeUserDataProvider>
      </body>
    </html>
  );
}
