"use client";
import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import { ProcutCardSkeleton } from "./ProductCard";
import { Button } from "./ui/button";
import { getMessages } from "~/server/messages";

export default function MessagesList() {
  const { fetchNextPage, data, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["messages"],
      queryFn: async ({ pageParam = 1 }) =>
        getMessages({ page: pageParam, onlyActives: true }),
      refetchOnWindowFocus: false,
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages, lastPageParam) => {
        if (lastPage.messages?.length === 0 || !lastPage.canFetchMore) {
          return undefined;
        }
        return lastPageParam + 1;
      },
      getPreviousPageParam: (_, __, firstPageParam) => {
        if (firstPageParam <= 1) {
          return undefined;
        }
        return firstPageParam - 1;
      },
    });

  async function loadMoreProducts() {
    await fetchNextPage();
  }

  return (
    <div className="mx-auto mt-20 flex w-full max-w-[970px] flex-col items-center">
      <h2 className="mb-[32px] text-center text-2xl font-semibold uppercase text-terracota-primary">
        Recados
      </h2>
      <div className="flex w-full flex-col gap-4 px-4 py-4">
        {data?.pages.map((group, i) => (
          <React.Fragment key={i}>
            {group?.messages.map((message) => (
              <div className="flex w-full flex-col gap-2 text-zinc-800">
                <h3 className="text-2xl text-terracota-primary">
                  {message.user_name}
                </h3>
                <p>{message.content}</p>
                <hr className="mt-4 h-1 w-full bg-white" />
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
      {hasNextPage && (
        <Button
          disabled={isFetchingNextPage}
          onClick={async () => await loadMoreProducts()}
          variant="rounded"
          className="w-fit"
        >
          Ver mais recados
        </Button>
      )}
    </div>
  );
}
