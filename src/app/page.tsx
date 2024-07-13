import Banner from "~/components/Banner";
import ConfirmPresenceSection from "~/components/ConfirmPresenceSection";
import Counter from "~/components/Counter";
import GiftsList from "~/components/GiftsList";
import MobileNavBar from "~/components/MobileNavBar";
import Header from "~/components/Header";

export default function HomePage() {
  return (
    <main className="w-screen bg-cream">
      <Header asNav />
      <Header />
      <Banner />
      <Counter />
      <GiftsList />
      <ConfirmPresenceSection />
      <MobileNavBar />
    </main>
  );
}
