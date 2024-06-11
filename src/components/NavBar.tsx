import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="hidden h-[100px] min-h-[100px] w-full bg-orange-300 md:flex">
      <div className="flex h-full items-start justify-center px-4 py-4 lg:items-center">
        <span className="top-[2px] text-2xl font-bold">L&A</span>
      </div>
      <ul className="flex w-full flex-wrap items-center justify-center py-4 pr-4 lg:justify-evenly">
        <li className="">
          <Link className="px-4 py-2 text-sm uppercase" href="#home">
            Home
          </Link>
        </li>
        <li className="">
          <Link className="px-4 py-2 text-sm uppercase" href="#presentes">
            Lista de presentes
          </Link>
        </li>
        <li className="">
          <Link className="px-4 py-2 text-sm uppercase" href="#cerimonia">
            Cerimônia e Recepção
          </Link>
        </li>
        <li className="">
          <Link className="px-4 py-2 text-sm uppercase" href="#presenca">
            Confirmar presença
          </Link>
        </li>
        <li className="">
          <Link className="px-4 py-2 text-sm uppercase" href="#traje">
            Traje
          </Link>
        </li>
      </ul>
    </nav>
  );
}
