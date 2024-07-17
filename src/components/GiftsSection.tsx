import { PropsWithChildren } from "react";
import { getProductsWithImages } from "~/server/products";
import ProductCard from "./ProductCard";
import Cart from "./Cart";
import GiftsList from "./GiftsList";

export default async function GiftsSection() {
  const { products, canFetchMore } = await getProductsWithImages({ page: 1 });

  return (
    <div
      id="presentes"
      className="mx-auto flex w-full max-w-[970px] flex-col justify-center bg-cream px-4"
    >
      <h2 className="mb-8 text-center text-2xl font-semibold uppercase text-terracota-primary">
        lista de presentes
      </h2>
      <GiftsList canFetchMore={canFetchMore} initialProducts={products} />
    </div>
  );
}
