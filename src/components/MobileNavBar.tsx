"use client";
import { PropsWithChildren, useState } from "react";
import { AlignRight, Heart } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";

type CustomLinkProps = {
  onClick: () => void;
  href: string;
  label: string;
} & PropsWithChildren;

function CustomLink({ onClick, href, label, children }: CustomLinkProps) {
  return (
    <a
      onClick={onClick}
      href={href}
      className="flex w-full flex-col border-b border-slate-300 pb-2 pt-4 text-gray-500"
    >
      <div className="mb-2 flex w-full items-center gap-4">
        {children}
        <span className="text-lg font-medium">{label}</span>
      </div>
    </a>
  );
}

export default function MobileNavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeNavBar = () => setIsOpen(false);

  return (
    <Sheet open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <SheetTrigger className="fixed right-2 top-2 rounded-md bg-gray-700 p-2 md:hidden">
        <AlignRight className="h-8 w-8 text-white" />
      </SheetTrigger>
      <SheetContent className="h-screen">
        <SheetHeader className="mb-8 text-left">
          <SheetTitle className="flex items-center gap-1 text-gray-500">
            L <Heart className="h-4 w-4 text-pink-400" /> A
          </SheetTitle>
        </SheetHeader>
        <CustomLink onClick={closeNavBar} href="#home" label="Home" />
        <CustomLink
          onClick={closeNavBar}
          href="#presentes"
          label="Lista de presentes"
        />
        <CustomLink
          onClick={closeNavBar}
          href="#cerimonia"
          label="Cerimônia e recepção"
        />
        <CustomLink
          onClick={closeNavBar}
          href="#presenca"
          label="Confirmar presença"
        />
        <CustomLink onClick={closeNavBar} href="#traje" label="Traje" />
        {/* <div className="h-full w-full">
          <div className="w-full ">
            <AuthDialog onMobile />
          </div>
        </div> */}
      </SheetContent>
    </Sheet>
  );
}
