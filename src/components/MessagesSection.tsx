import MessageForm from "./MessageForm";
import MessagesList from "./MessagesList";

export default async function MessagesSection() {
  return (
    <div id="messages" className="section bg-cream px-4 py-[44px]">
      <h2 className="mb-[32px] text-center text-2xl font-semibold uppercase text-terracota-primary">
        deixe seu recado
      </h2>
      <MessageForm />
      <MessagesList />
    </div>
  );
}
