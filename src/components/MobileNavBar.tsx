"use client";
import { AlignRight } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";

export default function MobileNavBar() {
  return (
    <Sheet>
      <SheetTrigger className="fixed right-2 top-2 rounded-md bg-gray-700 p-2 md:hidden">
        <AlignRight className="h-8 w-8 text-white" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Are you absolutely sure?</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
