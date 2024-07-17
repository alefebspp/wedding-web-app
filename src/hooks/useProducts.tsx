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
  const [canLoadMoreProducts, setCanLoadMoreProducts] = useState<boolean>();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (priceOrderBy || canLoadMoreProducts) {
      async function handleGetProducts() {
        setIsLoading(true);
        try {
          const { products, canFetchMore } = await getProductsWithImages({
            price: priceOrderBy,
            page,
          });
          setProducts(products);
          setCanLoadMoreProducts(canFetchMore);
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      }

      handleGetProducts();
    } else {
      setCanLoadMoreProducts(canFetchMore);
    }
  }, [priceOrderBy, canLoadMoreProducts]);

  return {
    products,
    setPriceOrderBy,
    canLoadMoreProducts,
    isLoading,
    page,
    setPage,
  };
}
