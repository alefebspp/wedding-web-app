import { LoaderCircle } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center text-gray-600">
      <LoaderCircle className=" h-12 w-12 animate-spin text-gray-500" />
    </div>
  );
}
