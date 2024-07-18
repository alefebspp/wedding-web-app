"use client";
import ProductCard, { ProcutCardSkeleton } from "./ProductCard";
import Cart from "./Cart";
import { ProductWithImage } from "~/types";
import useProducts from "~/hooks/useProducts";
import { useCartContext } from "~/contexts/cartContext";
import { Button } from "./ui/button";

type Props = {
  initialProducts: ProductWithImage[];
  canFetchMore: boolean;
};

export default function GiftsList({ initialProducts, canFetchMore }: Props) {
  const {
    products,
    setProducts,
    isLoading,
    loadProducts,
    setPriceOrderBy,
    canLoadMoreProducts,
    setPage,
  } = useProducts({
    initialProducts,
    canFetchMore,
  });

  const { showSummary } = useCartContext();

  function onGiftsListFilterChange(value: string) {
    setProducts([]);
    setPriceOrderBy(value);
    setPage(1);
    loadProducts();
  }

  function handleLoadMoreProducts() {
    setPage((prev) => prev + 1);
    loadProducts();
  }

  return (
    <>
      <Cart onValueChange={(value) => onGiftsListFilterChange(value)} />
      {!showSummary && (
        <div className="flex flex-wrap items-center justify-center gap-4 pb-12 text-gray-600">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <ProcutCardSkeleton key={index} />
              ))
            : products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
        </div>
      )}
      {canLoadMoreProducts && !showSummary && (
        <div className=" w-full border-t-2 border-white pt-12 text-center">
          <Button
            disabled={isLoading}
            onClick={handleLoadMoreProducts}
            variant="rounded"
            className="w-fit"
          >
            Ver mais presentes
          </Button>
        </div>
      )}
    </>
  );
}
