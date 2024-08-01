import GiftsList from "./GiftsList";

export default async function GiftsSection() {
  return (
    <div id="presentes" className="section bg-cream px-4">
      <h2 className="mb-8 text-center text-2xl font-semibold uppercase text-terracota-primary">
        lista de presentes
      </h2>
      <GiftsList />
    </div>
  );
}
