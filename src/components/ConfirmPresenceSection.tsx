import ConfirmPresenceForm from "./ConfirmPresenceForm";

export default async function ConfirmPresenceSection() {
  return (
    <div
      id="presenca"
      className="mx-auto flex w-full max-w-[970px] flex-col justify-center bg-cream px-4 py-[44px]"
    >
      <h2 className="mb-[32px] text-center text-2xl font-semibold uppercase text-terracota-primary">
        confirme sua presença
      </h2>
      <ConfirmPresenceForm />
    </div>
  );
}
