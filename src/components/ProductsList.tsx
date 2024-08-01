"use client";

import ProductCard, { ProcutCardSkeleton } from "./ProductCard";

import { Button } from "./ui/button";
import useProductQuery from "~/lib/queries/useProductQuery";
import React from "react";

export default function ProductsList() {
  const { useGetProducts } = useProductQuery();

  const { data, isFetchingNextPage, isLoading, hasNextPage, fetchNextPage } =
    useGetProducts({});

  async function loadMoreProducts() {
    await fetchNextPage();
  }

  return isLoading ? (
    <div className="mx-auto flex w-full max-w-[970px] flex-col items-center">
      <div className="flex w-full flex-wrap items-start justify-center gap-4 px-4 py-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <ProcutCardSkeleton editMode key={index} />
        ))}
      </div>
    </div>
  ) : (
    <div className="mx-auto flex w-full max-w-[970px] flex-col items-center">
      <div className="flex w-full flex-wrap items-start justify-center gap-4 px-4 py-4">
        {data?.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group?.products.map((product) => (
              <ProductCard key={product.id} product={product} editMode />
            ))}
          </React.Fragment>
        ))}
      </div>
      {hasNextPage && (
        <Button
          isLoading={isFetchingNextPage}
          disabled={isFetchingNextPage}
          onClick={async () => await loadMoreProducts()}
          className="my-4 w-4/5 rounded-3xl border border-slate-400 bg-slate-600 text-white"
        >
          Carregar Mais
        </Button>
      )}
    </div>
  );
}
