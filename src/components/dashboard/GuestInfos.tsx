"use client";
import moment from "moment";
import { ChevronDown, Trash } from "lucide-react";
import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import { cn } from "~/lib/utils";
import { Guest } from "~/types";
import DeleteDataAlert from "../DeleteDataAlert";
import deleteGuest from "~/server/guests";

type Props = {
  guest: Guest;
};

export default function GuestInfos({ guest }: Props) {
  const [collapsibleIsExpanded, setCollapsibleIsExpanded] = useState(false);

  function collapsibleOnClick() {
    setCollapsibleIsExpanded(!collapsibleIsExpanded);
  }

  return (
    <div className="relative flex w-full flex-col gap-2 border-b border-gray-300 py-10 last:!border-b-0">
      <DeleteDataAlert
        id={guest.id}
        action={deleteGuest}
        customMessage="Deseja remover convidado?"
        className="absolute right-6 top-10 appearance-none"
      >
        <Trash className="h-6 w-6 text-red-500" />
      </DeleteDataAlert>
      <span className="text-xs font-medium uppercase text-gray-300">nomes</span>
      <div className="flex flex-col">
        <p className="text-sm font-bold text-gray-600">{guest.name}</p>
        {guest.guestCompanions.map((companion) => (
          <p key={companion.id} className="text-sm text-gray-600">
            {companion.name}
          </p>
        ))}
      </div>
      <Collapsible>
        <CollapsibleContent>
          <div className="flex flex-col">
            <span className="mb-2 mt-4 text-xs font-medium uppercase text-gray-300">
              adultos e crianças
            </span>
            <p className="text-sm text-gray-400">
              {guest.adults_quantity} adultos
            </p>
            <p className="text-sm text-gray-400">
              {guest.children_quantity} criança
            </p>
            <span className="mb-2 mt-4 text-xs font-medium uppercase text-gray-300">
              contato
            </span>
            <p className="text-sm text-gray-400">{guest.email}</p>
            <p className="text-sm text-gray-400">{guest.phone}</p>
            <span className="mb-2 mt-4 text-xs font-medium uppercase text-gray-300">
              confirmou em
            </span>
            <p className="text-sm text-gray-400">
              {moment(guest.createdAt).format("DD/MM/YYYY")}
            </p>
          </div>
        </CollapsibleContent>
        <CollapsibleTrigger
          onClick={collapsibleOnClick}
          className="mt-4 flex items-center gap-2 font-medium text-gray-400"
        >
          <ChevronDown
            className={cn("h-6 w-6 transition-all duration-300", {
              "rotate-180": collapsibleIsExpanded,
            })}
          />
          <span className="text-sm">Detalhes</span>
        </CollapsibleTrigger>
      </Collapsible>
    </div>
  );
}
