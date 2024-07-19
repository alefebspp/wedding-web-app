import { getProductsWithImages } from "~/server/products";
import GiftsList from "./GiftsList";

export default async function GiftsSection() {
  const { products, canFetchMore } = await getProductsWithImages({ page: 1 });

  return (
    <div id="presentes" className="section bg-cream px-4">
      <h2 className="mb-8 text-center text-2xl font-semibold uppercase text-terracota-primary">
        lista de presentes
      </h2>
      <GiftsList canFetchMore={canFetchMore} initialProducts={products} />
    </div>
  );
}
