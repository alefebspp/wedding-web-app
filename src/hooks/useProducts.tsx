"use client";

import { useEffect, useState } from "react";
import { getProductsWithImages } from "~/server/products";
import { ProductWithImage } from "~/types";

type Props = {
  initialProducts: ProductWithImage[];
  canFetchMore: boolean;
};

export default function useProducts({ initialProducts, canFetchMore }: Props) {
  const [products, setProducts] = useState(initialProducts);
  const [priceOrderBy, setPriceOrderBy] = useState<string>();
  const [canLoadMoreProducts, setCanLoadMoreProducts] =
    useState<boolean>(canFetchMore);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const loadProducts = () => setIsLoading(true);

  useEffect(() => {
    if (isLoading) {
      async function handleGetProducts() {
        try {
          const { products, canFetchMore } = await getProductsWithImages({
            price: priceOrderBy,
            page,
          });
          setProducts((prev) => [...prev, ...products]);
          setCanLoadMoreProducts(canFetchMore);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      }

      handleGetProducts();
    }
  }, [isLoading]);

  return {
    products,
    setProducts,
    setPriceOrderBy,
    canLoadMoreProducts,
    isLoading,
    loadProducts,
    page,
    setPage,
  };
}
