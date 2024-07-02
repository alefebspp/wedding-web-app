"use client";
import {
  AlignLeft,
  ChevronLeft,
  Home,
  ShoppingCart,
  UsersRound,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";

export default function DashboardNavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  function handleNavigateBack() {
    if (pathname.includes("dashboard")) {
      return router.push("/");
    }
    router.back();
  }

  return (
    <nav className="flex min-h-[100px] w-full items-center justify-between border-b border-slate-300 px-4">
      <button
        onClick={handleNavigateBack}
        className="flex appearance-none items-center justify-center outline-none"
      >
        <ChevronLeft className="h-8 w-8 text-gray-500" />
      </button>
      <Sheet open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
        <SheetTrigger className="rounded-md bg-gray-700 p-2 ">
          <AlignLeft className="h-8 w-8 text-white" />
        </SheetTrigger>
        <SheetContent className="h-screen p-0 py-6">
          <SheetHeader className="mb-8">
            <SheetTitle className="text-center">Seções</SheetTitle>
          </SheetHeader>
          <Link
            onClick={() => setIsOpen(false)}
            href="/dashboard"
            className="flex w-full flex-col border-b border-slate-300 pb-2 pt-4 text-slate-600"
          >
            <div className="mb-2 flex w-full items-center gap-4 px-6">
              <Home className="h-8 w-8" />
              <span className="text-lg font-semibold">Início</span>
            </div>
          </Link>
          <Link
            onClick={() => setIsOpen(false)}
            href="/products"
            className="flex w-full flex-col border-b border-slate-300 pb-2 pt-4 text-slate-600"
          >
            <div className="mb-2 flex w-full items-center gap-4 px-6">
              <ShoppingCart className="h-8 w-8" />
              <span className="text-lg font-semibold">Produtos</span>
            </div>
          </Link>
          <Link
            onClick={() => setIsOpen(false)}
            href="/guests"
            className="flex w-full flex-col border-b border-slate-300 pb-2 pt-4 text-slate-600"
          >
            <div className="mb-2 flex w-full items-center gap-4 px-6">
              <UsersRound className="h-8 w-8" />
              <span className="text-lg font-semibold">Convidados</span>
            </div>
          </Link>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
