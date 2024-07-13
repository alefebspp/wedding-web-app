"use client";

import { useState, useEffect } from "react";
import Header from "./Header";

export default function Counter() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2024-10-23T23:59:59").getTime();

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Atualiza o contador a cada segundo
    const timer = setInterval(calculateTimeLeft, 1000);

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      id="counter"
      className="relative flex min-h-[338px] flex-col items-center justify-center bg-cream px-4 py-[44px] font-semibold"
    >
      <h2 className=" mb-[32px] text-center text-2xl uppercase text-terracota-primary">
        contagem regressiva
      </h2>
      <div className="flex items-center justify-center gap-2 uppercase md:gap-4">
        <div className="flex h-[76px] min-w-[76px] flex-col items-center justify-center rounded-[16px] bg-terracota-primary text-xl text-cream md:h-[100px] md:min-w-[100px] md:text-4xl">
          {timeLeft.days}
          <span className="text-xs">dias</span>
        </div>
        <div className="flex h-[76px] min-w-[76px] flex-col items-center justify-center rounded-[16px] bg-terracota-primary text-xl text-cream md:h-[100px] md:min-w-[100px] md:text-4xl">
          {timeLeft.hours}
          <span className="text-xs">horas</span>
        </div>
        <div className="flex h-[76px] min-w-[76px] flex-col items-center justify-center rounded-[16px] bg-terracota-primary text-xl text-cream md:h-[100px] md:min-w-[100px] md:text-4xl">
          {timeLeft.minutes}
          <span className="text-xs">minutos</span>
        </div>
        <div className="flex h-[76px] min-w-[76px] flex-col items-center justify-center rounded-[16px] bg-terracota-primary text-xl text-cream md:h-[100px] md:min-w-[100px] md:text-4xl">
          {timeLeft.seconds}
          <span className="text-xs">segundos</span>
        </div>
      </div>
    </div>
  );
}
