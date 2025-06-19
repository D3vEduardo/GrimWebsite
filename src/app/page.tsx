import CardsSection from "@/components/CardsSection/CardsSection";
import LatestSpotifySong from "@/components/LatestSpotifySong/LatestSpotifySong";
import Header from "@components/Header/Header";

export default function Home() {
  return (
    <main>
      <Header />
      <CardsSection latestSpotifySongComponent={<LatestSpotifySong />} />
    </main>
  );
}

export const dynamic = 'force-dynamic';
