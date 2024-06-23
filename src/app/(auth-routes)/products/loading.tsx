import { Skeleton } from "~/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex w-full flex-wrap items-start justify-center gap-4 px-4 py-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton
            key={index}
            className="flex h-1/4 w-4/5 flex-col gap-4 rounded-md bg-white p-2 shadow-lg"
          >
            <Skeleton className="relative h-40 w-full" />
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-40" />
          </Skeleton>
        ))}
      </div>
    </div>
  );
}
