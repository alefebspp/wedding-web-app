"use client";
import { Search } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import GuestInfos from "~/components/dashboard/GuestInfos";
import { Guest } from "~/types";

type Props = {
  guests: Guest[];
  confirmedGuests: number;
  canceledGuests: number;
};

export default function GuestsList({
  guests,
  confirmedGuests,
  canceledGuests,
}: Props) {
  return (
    <div className="flex h-full flex-col gap-8 bg-slate-100 px-4">
      <h2 className="mt-8 text-3xl font-medium text-slate-600">
        Lista de presença
      </h2>

      <div className="flex items-center justify-end rounded-3xl border border-gray-500">
        <label
          className="flex h-12 w-12 items-center justify-center rounded-l-3xl bg-white"
          htmlFor="search-input"
        >
          <Search className="h-4 w-4 text-gray-500" />
        </label>
        <Input
          id="search-input"
          placeholder="Buscar um convidado"
          className="h-12 !rounded-l-none rounded-r-3xl !border-0"
        />
      </div>
      <Tabs defaultValue="confirmed" className="w-full bg-white">
        <TabsList className="w-full bg-white">
          <TabsTrigger
            className="h-12 w-1/2 border-b-4 border-gray-300 text-gray-400"
            value="confirmed"
          >
            Confirmados {`(${confirmedGuests})`}
          </TabsTrigger>
          <TabsTrigger
            className="h-12 w-1/2 border-b-4 border-gray-300 text-gray-400"
            value="canceled"
          >
            Cancelados {`(${canceledGuests})`}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="confirmed">
          <div className="flex w-full flex-col px-6">
            {guests.map((guest) => (
              <GuestInfos guest={guest} key={guest.id} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="canceled">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
}
