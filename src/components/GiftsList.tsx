"use client";
import ProductCard, { ProcutCardSkeleton } from "./ProductCard";
import Cart from "./Cart";
import useProducts from "~/hooks/useProducts";
import { useCartContext } from "~/contexts/cartContext";
import { Button } from "./ui/button";
import React from "react";

export default function GiftsList() {
  const { query, setPriceOrderBy } = useProducts();

  const { data, isFetchingNextPage, isLoading, hasNextPage, fetchNextPage } =
    query;

  const { showSummary } = useCartContext();

  function onGiftsListFilterChange(value: string) {
    setPriceOrderBy(value);
  }

  async function handleLoadMoreProducts() {
    await fetchNextPage();
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
            : data?.pages.map((group, i) => (
                <React.Fragment key={i}>
                  {group?.products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </React.Fragment>
              ))}
          {isFetchingNextPage &&
            Array.from({ length: 6 }).map((_, index) => (
              <ProcutCardSkeleton key={index} />
            ))}
        </div>
      )}
      {hasNextPage && !showSummary && (
        <div className=" w-full border-t-2 border-white pt-12 text-center">
          <Button
            disabled={isFetchingNextPage}
            onClick={async () => await handleLoadMoreProducts()}
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
