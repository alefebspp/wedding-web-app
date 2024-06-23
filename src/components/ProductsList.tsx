"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

import { ProductWithImage } from "~/types";
import { Button } from "./ui/button";
import { getProductsWithImages } from "~/server/products";

type Props = {
  products: ProductWithImage[];
  canFetchMore: boolean;
};

export default function ProductsList({ products, canFetchMore }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(2);
  const [userProducts, setUserProducts] =
    useState<ProductWithImage[]>(products);
  const [canLoadMoreProducts, setCanLoadMoreProducts] = useState(canFetchMore);

  useEffect(() => {
    if (isLoading) {
      async function handleFetchProducts() {
        try {
          const { products, canFetchMore } = await getProductsWithImages({
            page,
          });
          setUserProducts([...userProducts, ...products]);
          setCanLoadMoreProducts(canFetchMore);
          setPage(page + 1);
        } catch (error) {
          console.log("ERROR:", error);
        } finally {
          setIsLoading(false);
        }
      }

      try {
        handleFetchProducts();
      } catch (error) {
        //Add toast
      }
    }
  }, [isLoading]);

  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex w-full flex-wrap items-start justify-center gap-4 px-4 py-4">
        {userProducts.map((product) => (
          <ProductCard key={product.id} product={product} editMode />
        ))}
      </div>
      {canLoadMoreProducts && (
        <Button
          isLoading={isLoading}
          disabled={isLoading}
          onClick={() => setIsLoading(true)}
          className="my-4 w-4/5 rounded-3xl border border-slate-400 bg-slate-600 text-white"
        >
          Carregar Mais
        </Button>
      )}
    </div>
  );
}
