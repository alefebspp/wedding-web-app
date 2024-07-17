import { ProcutCardSkeleton } from "~/components/ProductCard";
import { Skeleton } from "~/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex w-full flex-wrap items-start justify-center gap-4 px-4 py-4">
        {Array.from({ length: 6 }).map((_, index) => (
          <ProcutCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
