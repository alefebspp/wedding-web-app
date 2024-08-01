"use client";

import { useState } from "react";
import useProductQuery from "~/lib/queries/useProductQuery";
import { ProductWithImage } from "~/types";

export default function useProducts() {
  const [priceOrderBy, setPriceOrderBy] = useState<string>();

  const { getProducts } = useProductQuery();

  const query = getProducts({
    price: priceOrderBy,
  });

  return {
    setPriceOrderBy,
    query,
  };
}
