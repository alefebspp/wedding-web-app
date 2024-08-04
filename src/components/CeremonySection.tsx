import Map from "./Map";

export default async function CeremonySection() {
  return (
    <div id="cerimonia" className="section mb-20 bg-cream px-4 pt-11">
      <h2 className="mb-[32px] text-center text-2xl font-semibold uppercase text-terracota-primary">
        cerimônia e recepção
      </h2>
      <p className="mb-8 text-pretty font-light text-zinc-800">
        Pedimos encarecidamente que cheguem pontualmente, pois a cerimônia não
        irá demorar para começar. Local: Alameda Piratininga, Lote 20 - Quadra
        20 - Jardim Primavera, Duque de Caxias - RJ, 25214-453. Mirante
        Primavera. Dia 24 de outubro de 2024, às 19h.
      </p>
      <Map />
    </div>
  );
}
