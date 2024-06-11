import MobileNavBar from "~/components/MobileNavBar";
import NavBar from "~/components/NavBar";

export default function HomePage() {
  return (
    <main className="h-screen w-screen">
      <NavBar />
      <MobileNavBar />
    </main>
  );
}
