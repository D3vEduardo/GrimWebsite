import CardsSection from "@/components/CardsSection/CardsSection";
import Header from "@components/Header/Header";
import LatestSpotifySong from "@/components/LatestSpotifySong/LatestSpotifySong";

export default function Home() {
  return (
    <main>
      <Header />
      <CardsSection latestSpotifySongComponent={<LatestSpotifySong />} />
    </main>
  );
}
