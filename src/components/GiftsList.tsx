import { getProductsWithImages } from "~/server/products";
import ProductCard from "./ProductCard";

export default async function GiftsList() {
  const products = await getProductsWithImages();

  return (
    <div className="flex w-full flex-col justify-center bg-cream">
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
