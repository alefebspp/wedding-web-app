import { CircleCheck, XCircle } from "lucide-react";
import GuestsList from "~/components/dashboard/GuestsList";
import { getGuests } from "~/server/guests";

export default async function Guests() {
  const { guests: confirmedGuests } = await getGuests({
    page: 1,
    onlyConfirmed: true,
  });

  const { guests: canceledGuests } = await getGuests({
    page: 1,
    onlyConfirmed: false,
  });

  const adultsConfirmed = confirmedGuests.reduce((acc, guest) => {
    return acc + guest.adults_quantity;
  }, 0);

  const childrenConfimed = confirmedGuests.reduce((acc, guest) => {
    return acc + guest.children_quantity;
  }, 0);

  return (
    <div className="flex h-full w-full flex-col gap-8">
      <div className="flex flex-col gap-8 px-4">
        <h1 className="mt-8 text-3xl font-medium text-slate-600">
          Meus convidados
        </h1>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <CircleCheck className="h-6 w-6 text-green-400" />
            <p className="text-sm font-medium uppercase">confirmados</p>
          </div>
          <span className="pl-8 text-4xl font-medium">
            {adultsConfirmed + childrenConfimed}
          </span>
          <span className="pl-8 text-sm">
            {adultsConfirmed} adultos | {childrenConfimed} crianças
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <XCircle className="h-6 w-6 text-red-400" />
            <p className="text-sm font-medium uppercase">cancelados</p>
          </div>
          <span className="pl-8 text-4xl font-medium">
            {canceledGuests.length}
          </span>
          <span className="pl-8 text-sm">não irão ao casamento</span>
        </div>
      </div>
      <GuestsList
        confirmedGuestsCount={adultsConfirmed + childrenConfimed}
        canceledGuestsCount={canceledGuests.length}
        guests={{
          confirmed: confirmedGuests,
          canceled: canceledGuests,
        }}
      />
    </div>
  );
}
