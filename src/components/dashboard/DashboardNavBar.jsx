"use client";
import { AlignLeft, ShoppingCart } from "lucide-react";
import Link from "next/link";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";

export default function DashboardNavBar() {
  return (
    <Sheet>
      <SheetTrigger className="rounded-md bg-gray-700 p-2 ">
        <AlignLeft className="h-8 w-8 text-white" />
      </SheetTrigger>
      <SheetContent className="h-screen">
        <SheetHeader>
          <SheetTitle>Seções</SheetTitle>
        </SheetHeader>
        <div className="flex w-full flex-col py-4 text-slate-600">
          <div className="flex flex-col gap-2">
            <div className="flex w-full items-center gap-2">
              <ShoppingCart className="h-6 w-6" />
              <span className="text-xm font-semibold uppercase">produtos</span>
            </div>
            <Link href="/produtos">
              <span className="text-red-500">Lista de produtos</span>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
