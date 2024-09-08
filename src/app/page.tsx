import Image from "next/image";
import Banner from "~/components/Banner";
import Counter from "~/components/Counter";
import MobileNavBar from "~/components/MobileNavBar";
import Header from "~/components/Header";
import GiftsSection from "~/components/GiftsSection";
import CeremonySection from "~/components/CeremonySection";
import MessagesSection from "~/components/MessagesSection";

export default function HomePage() {
  return (
    <main className="w-screen bg-cream">
      <Header asNav />
      <Header />
      <Banner />
      <Counter />
      <CeremonySection />
      <div className="section relative mb-20 h-[400px] md:h-[560px]">
        <Image
          src="/couple.jpg"
          alt="Image principal do casal"
          fill
          className="h-full min-h-full w-full object-cover object-[70%_60%] align-middle md:object-[70%_70%] lg:object-[70%_60%]"
        />
      </div>
      <GiftsSection />
      <div className="section relative mt-12 h-[400px] md:h-[560px]">
        <Image
          src="/couple_2.jpg"
          alt="Image principal do casal"
          fill
          className="h-full min-h-full w-full object-cover object-[70%_60%] align-middle md:object-[70%_70%] lg:object-[70%_60%]"
        />
      </div>
      <MessagesSection />
      <MobileNavBar />
    </main>
  );
}
