import Banner from "~/components/Banner";
import ConfirmPresenceSection from "~/components/ConfirmPresenceSection";
import Counter from "~/components/Counter";
import MobileNavBar from "~/components/MobileNavBar";
import Header from "~/components/Header";
import GiftsSection from "~/components/GiftsSection";
import CeremonySection from "~/components/CeremonySection";

export default function HomePage() {
  return (
    <main className="w-screen bg-cream">
      <Header asNav />
      <Header />
      <Banner />
      <Counter />
      <CeremonySection />
      <GiftsSection />
      <ConfirmPresenceSection />
      <MobileNavBar />
    </main>
  );
}
