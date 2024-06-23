"use client";
import { AlignRight } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import AuthDialog from "./AuthDialog";

export default function MobileNavBar() {
  return (
    <Sheet>
      <SheetTrigger className="fixed right-2 top-2 rounded-md bg-gray-700 p-2 md:hidden">
        <AlignRight className="h-8 w-8 text-white" />
      </SheetTrigger>
      <SheetContent className="h-screen">
        <SheetHeader>
          <SheetTitle>Seções</SheetTitle>
        </SheetHeader>
        <div className="h-full w-full">
          <div className="w-full ">
            <AuthDialog onMobile />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
