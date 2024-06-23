import { AlignJustify, ShoppingCart, UserRound } from "lucide-react";
import Link from "next/link";
import CreateProductDialog from "~/components/dashboard/CreateProductDialog";

export default function Dashboard() {
  return (
    <div className="flex w-full flex-wrap items-start justify-center gap-4 px-4 py-4">
      <CreateProductDialog>
        <div className=" flex h-40 w-[45%] flex-col items-center justify-center gap-2 rounded-xl border-4 border-slate-400">
          <ShoppingCart className="h-8 w-8" />
          <span className="text-sm font-semibold uppercase">novo produto</span>
        </div>
      </CreateProductDialog>
      <Link
        className=" flex h-40 w-[45%] flex-col items-center justify-center gap-2 rounded-xl border-4 border-slate-400"
        href="/products"
      >
        <AlignJustify className="h-8 w-8" />
        <span className="text-sm font-semibold uppercase">produtos</span>
      </Link>
      <Link
        className="flex h-40 w-[45%] flex-col items-center justify-center gap-2 rounded-xl border-4 border-slate-400"
        href="/convidados"
      >
        <UserRound className="h-8 w-8" />
        <span className="text-sm font-semibold uppercase">convidados</span>
      </Link>
    </div>
  );
}
