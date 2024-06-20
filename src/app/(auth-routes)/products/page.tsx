import ProductCard from "~/components/ProductCard";
import { getProductsWithImages } from "~/server/products";

export default async function Products() {
  const products = await getProductsWithImages();

  return (
    <div className="flex w-full flex-wrap items-start justify-center gap-4 px-4 py-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
