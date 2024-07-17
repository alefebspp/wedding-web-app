"use client";
import ProductCard, { ProcutCardSkeleton } from "./ProductCard";
import Cart from "./Cart";
import { ProductWithImage } from "~/types";
import useProducts from "~/hooks/useProducts";

type Props = {
  initialProducts: ProductWithImage[];
  canFetchMore: boolean;
};

export default function GiftsList({ initialProducts, canFetchMore }: Props) {
  const { products, isLoading, setPriceOrderBy } = useProducts({
    initialProducts,
    canFetchMore,
  });

  return (
    <>
      <Cart onValueChange={(value) => setPriceOrderBy(value)} />
      <div className="flex flex-wrap items-center justify-center gap-4 text-gray-600">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <ProcutCardSkeleton key={index} />
            ))
          : products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
      </div>
    </>
  );
}
