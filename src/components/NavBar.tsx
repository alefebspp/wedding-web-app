import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="lg-px-8 hidden h-[100px] min-h-[100px] w-full px-4 md:flex">
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
      </ul>
    </nav>
  );
}
