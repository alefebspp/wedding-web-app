"use client";
import Link from "next/link";
import AuthDialog from "./AuthDialog";
import { useEffect, useState } from "react";
import { cn } from "~/lib/utils";

type Props = {
  asNav?: boolean;
};

export default function Header({ asNav }: Props) {
  const [heightRef, setHeightRef] = useState<number>();
  const [willUnmount, setWillUnmount] = useState(false);

  useEffect(() => {
    const counterRef = document.getElementById("counter");
    if (counterRef) {
      const counterRect = counterRef.getBoundingClientRect();
      const initialScrollY = window.scrollY;
      setHeightRef(counterRect.top + initialScrollY);
    }
  }, []);

  useEffect(() => {
    let removeClassUnmount: ReturnType<typeof setTimeout>;

    if (heightRef) {
      const handleScroll = (e: Event) => {
        const navBar = document.querySelector("#navbar");
        const scrollTop = window.scrollY;
        if (heightRef && scrollTop > heightRef) {
          navBar?.classList.add("is-sticky");
        } else {
          if (navBar?.classList.contains("is-sticky")) {
            setWillUnmount(true);

            removeClassUnmount = setTimeout(() => {
              navBar?.classList.remove("is-sticky");
              setWillUnmount(false);
            }, 500);
          }
        }
      };

      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
        if (removeClassUnmount) {
          clearTimeout(removeClassUnmount);
        }
      };
    }
  }, [heightRef]);

  return (
    <>
      <header
        id="navbar"
        className={cn(
          "lg-px-8 relative hidden h-[100px] min-h-[100px] w-full px-4 transition-all duration-500 ease-in-out md:flex",
          {
            "absolute -top-20 z-[-1] [&.is-sticky]:fixed [&.is-sticky]:z-50 [&.is-sticky]:!h-20 [&.is-sticky]:!min-h-20 [&.is-sticky]:translate-y-20 [&.is-sticky]:bg-white [&.is-sticky]:text-zinc-800 [&.is-sticky]:shadow-bottom ":
              asNav,
          },
          {
            "fixed z-50 !-translate-y-20 bg-white text-zinc-800 shadow-bottom":
              willUnmount && asNav,
          },
          {
            "bg-terracota-primary": !asNav,
          },
        )}
      >
        {/* {!asNav && (
          <div className="absolute right-4 top-4 hidden md:block lg:hidden">
            <AuthDialog />
          </div>
        )} */}
        <div className="flex h-full items-start justify-center px-4 py-4 lg:items-center">
          <span className="top-[2px] text-2xl font-bold xl:hidden">L&A</span>
        </div>
        <ul className="flex w-full flex-wrap items-center justify-center py-2 pr-4 lg:justify-evenly xl:justify-center">
          <li className="px-[4px]">
            <span className="top-[2px] hidden text-2xl font-bold xl:block">
              L&A
            </span>
          </li>
          <li className="px-[4px]">
            <Link className="px-4 py-2 text-sm uppercase xl:px-6" href="#home">
              Home
            </Link>
          </li>
          <li className="px-[4px]">
            <Link
              className="px-4 py-2 text-sm uppercase xl:px-6"
              href="#presentes"
            >
              Lista de presentes
            </Link>
          </li>
          <li className="px-[4px]">
            <Link
              className="px-4 py-2 text-sm uppercase xl:px-6"
              href="#cerimonia"
            >
              Cerimônia e Recepção
            </Link>
          </li>
          <li className="px-[4px]">
            <Link
              className="px-4 py-2 text-sm uppercase xl:px-6"
              href="#messages"
            >
              Deixe seu recado
            </Link>
          </li>
          <li className="px-[4px]">
            <Link className="px-4 py-2 text-sm uppercase xl:px-6" href="#traje">
              Traje
            </Link>
          </li>
          {/*  {!asNav && (
            <li className="hidden lg:block">
              <AuthDialog />
            </li>
          )} */}
        </ul>
      </header>
    </>
  );
}
