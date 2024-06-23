import ProductsList from "~/components/ProductsList";
import { getProductsWithImages } from "~/server/products";

export default async function Products() {
  const { products, canFetchMore } = await getProductsWithImages({
    page: 1,
  });

  return <ProductsList products={products} canFetchMore={canFetchMore} />;
}
