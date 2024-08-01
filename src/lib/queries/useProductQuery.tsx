"use client";
import {
  useMutation,
  useQueryClient,
  useInfiniteQuery,
} from "@tanstack/react-query";

interface ProductData {
  products: {
    imageUrl: string | null;
    id: number;
    name: string | null;
    payment_link: string | null;
    price: number | null;
    createdAt: Date;
    updatedAt: Date | null;
  }[];
  canFetchMore: boolean;
}

export interface InfiniteData<TData> {
  pages: TData[];
  pageParams: unknown[];
}

import { getProductsWithImages, updateProduct } from "~/server/products";
import deleteProduct from "~/server/products";

export default function useProductQuery() {
  const queryClient = useQueryClient();

  function useGetProducts({ price }: { price?: string }) {
    const query = useInfiniteQuery({
      queryKey: ["products", price],
      queryFn: async ({ pageParam = 1 }) =>
        getProductsWithImages({ price, page: pageParam }),
      refetchOnWindowFocus: false,
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        if (lastPage.products?.length === 0 || !lastPage.canFetchMore) {
          return undefined;
        }
        return lastPageParam + 1;
      },
      getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
        if (firstPageParam <= 1) {
          return undefined;
        }
        return firstPageParam - 1;
      },
    });

    return query;
  }

  function useDeleteProductMutation() {
    const mutation = useMutation({
      mutationFn: deleteProduct,
      onSuccess: (data, { id }) => {
        queryClient.setQueryData(
          ["products", undefined],
          (data: InfiniteData<ProductData>) => {
            const newData = {
              ...data,
              pages: data?.pages.map(({ products, canFetchMore }) => ({
                products: products?.filter((product) => product.id !== id),
                canFetchMore,
              })),
            };
            return newData;
          },
        );
      },
    });

    return mutation;
  }

  function useUpdateProductMutation() {
    const mutation = useMutation({
      mutationFn: updateProduct,
      onSuccess: (data, { id, data: updatedData }) => {
        queryClient.setQueryData(
          ["products", undefined],
          (data: InfiniteData<ProductData>) => {
            const newData = {
              ...data,
              pages: data?.pages.map(({ products, canFetchMore }) => ({
                products: products?.map((product) => {
                  if (product.id === id) {
                    return { ...product, ...updatedData };
                  }
                  return { ...product };
                }),
                canFetchMore,
              })),
            };
            return newData;
          },
        );
      },
    });

    return mutation;
  }

  return {
    useGetProducts,
    useDeleteProductMutation,
    useUpdateProductMutation,
  };
}
