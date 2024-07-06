import Image from "next/image";

import montSerrat from "~/layout/fonts/montSerrat";
import { cn } from "~/lib/utils";

export default function Banner() {
  return (
    <div className="w-full md:px-4 lg:mx-auto lg:px-8 xl:w-[1170px]">
      <div className=" w-full items-center md:flex md:pb-[32px]">
        <div className="relative h-[560px] md:mr-[20px] md:h-[580px] md:min-w-[400px] xl:min-h-[780px] xl:min-w-[565px]">
          <Image
            src="https://picsum.photos/200/300"
            alt="Image principal do casal"
            width={100}
            height={100}
            className="h-full w-full bg-no-repeat object-cover "
          />
          <span className="absolute left-4 top-4 text-2xl font-semibold  md:hidden">
            L&A
          </span>
        </div>
        <div
          id="home"
          className={cn(
            "my-[20px] ml-[40px] mr-[100px] min-w-[300px] md:ml-0 lg:m-0",
            montSerrat.className,
          )}
        >
          <span className="block h-[70px] w-[2px] bg-cream lg:h-[140px] xl:h-[200px]"></span>
          <p className=" my-4 text-lg font-semibold uppercase xl:text-2xl">
            sejam bem-vindos ao nosso site!
          </p>
          {/* <h1 className="mb-[10px] mt-[20px] text-[32px] uppercase leading-[40px] xl:text-[48px] xl:leading-[56px]">
            <span className="block">
              lucas <span className="block">e</span>
            </span>
            <span>ana julia</span>
          </h1> */}
          <p className="text-sm xl:text-base">
            A melhor forma de compartinhar esse momento com vocês é vivendo
            juntos esse sonho! Aqui vamos contar à vocês, queridos amigos e
            familiares, os momentos mais marcantes da nossa história de amor. A
            contagem regressiva, o frio na barriga e toda a ansiedade do dia
            mais esperado de nossas vidas começa. Ficamos muito felizes e
            honrados em tê-los ao nosso lado. Vamos todos juntos celebrar a
            realização desse grande sonho e proṕosito, o dia em que nós dois
            uniremos nossas almas e corpos para sempre, O Dia Do Nosso
            Casamento.
          </p>
          <div className="my-4 inline-flex items-center bg-cream pl-[16px] pr-[16px] pt-[3px] text-[20px] font-bold tracking-[4px] text-terracota-primary 2xl:text-[25px]">
            24/10/2024
          </div>
          <span className="block h-[70px] w-[2px] bg-cream lg:h-[140px] xl:h-[200px]"></span>
        </div>
      </div>
    </div>
  );
}
