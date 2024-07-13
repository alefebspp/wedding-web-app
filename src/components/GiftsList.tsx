import { getProductsWithImages } from "~/server/products";
import ProductCard from "./ProductCard";

export default async function GiftsList() {
  const { products } = await getProductsWithImages({ page: 1 });

  return (
    <div
      id="presentes"
      className="mx-auto flex w-full max-w-[970px] flex-col justify-center bg-cream px-4"
    >
      <h2 className="mb-[32px] text-center text-2xl font-semibold uppercase text-terracota-primary">
        lista de presentes
      </h2>
      <div className="flex flex-wrap items-center justify-center gap-4 text-gray-600">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
