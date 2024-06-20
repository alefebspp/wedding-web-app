import Banner from "~/components/Banner";
import Counter from "~/components/Counter";
import GiftsList from "~/components/GiftsList";
import MobileNavBar from "~/components/MobileNavBar";
import NavBar from "~/components/NavBar";

export default function HomePage() {
  return (
    <main className="w-screen bg-terracota-primary">
      <NavBar />
      <Banner />
      <Counter />
      <GiftsList />
      <MobileNavBar />
    </main>
  );
}
