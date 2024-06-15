import Banner from "~/components/Banner";
import Counter from "~/components/Counter";
import MobileNavBar from "~/components/MobileNavBar";
import NavBar from "~/components/NavBar";

export default function HomePage() {
  return (
    <main className="bg-terracota-300 w-screen">
      <NavBar />
      <Banner />
      <Counter />
      <MobileNavBar />
    </main>
  );
}
