"use client";
import Link from "next/link";
import AuthDialog from "./AuthDialog";
import { useEffect, useState } from "react";

export default function NavBar() {
  const [heightRef, setHeightRef] = useState<number>();

  useEffect(() => {
    const counterRef = document.getElementById("#counter");
    if (counterRef) {
      const counterHeight = counterRef.getBoundingClientRect();
      setHeightRef(counterHeight.top);
    }
  }, []);

  useEffect(() => {
    if (heightRef) {
      const handleScroll = (e: Event) => {
        const navBar = document.querySelector("#navbar");
        const scrollTop = window.scrollY;
        if (heightRef && scrollTop > heightRef) {
          navBar?.classList.add("is-sticky");
        } else {
          navBar?.classList.remove("is-sticky");
        }
      };

      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [heightRef]);
  return (
    <nav
      id="navbar"
      className="lg-px-8 relative hidden h-[100px] min-h-[100px] w-full px-4 md:flex"
    >
      <div className="absolute right-4 top-4 hidden md:block lg:hidden">
        <AuthDialog />
      </div>
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
            href="#presenca"
          >
            Confirmar presença
          </Link>
        </li>
        <li className="px-[4px]">
          <Link className="px-4 py-2 text-sm uppercase xl:px-6" href="#traje">
            Traje
          </Link>
        </li>
        <li className="hidden lg:block">
          <AuthDialog />
        </li>
      </ul>
    </nav>
  );
}
