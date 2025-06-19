import CardsSection from "@/components/CardsSection/CardsSection";
import Header from "@components/Header/Header";

export default function Home() {
  return (
    <main>
      <Header />
      <CardsSection />
    </main>
  );
}

export const dynamic = 'force-dynamic';
