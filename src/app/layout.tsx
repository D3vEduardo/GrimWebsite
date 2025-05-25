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
  title: "Grim",
  description: "Game Dev, Game Translator and Data Analyst",
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
