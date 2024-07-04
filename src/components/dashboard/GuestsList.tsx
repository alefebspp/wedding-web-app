"use client";
import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import GuestInfos from "~/components/dashboard/GuestInfos";
import { Guest } from "~/types";

import { getGuests } from "~/server/guests";
import { useToast } from "../ui/use-toast";
import Loader from "../Loader";

type Props = {
  guests: {
    confirmed: Guest[];
    canceled: Guest[];
  };
  confirmedGuestsCount: number;
  canceledGuestsCount: number;
};

export default function GuestsList({
  guests,
  confirmedGuestsCount,
  canceledGuestsCount,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState<string>();
  const [onlyConfirmed, setOnlyConfirmed] = useState(true);
  const [confirmedGuests, setConfirmedGuests] = useState(guests.confirmed);
  const [canceledGuests, setCanceledGuests] = useState(guests.canceled);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const { toast } = useToast();

  async function handleGetGuests() {
    setIsLoading(true);
    try {
      const { guests, count } = await getGuests({
        page,
        onlyConfirmed,
        search: searchValue,
      });
      onlyConfirmed ? setConfirmedGuests(guests) : setCanceledGuests(guests);
    } catch (error) {
      toast({
        title: "Error",
        description: "Ocorreu um erro ao tentar listar os convidados",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    if (searchValue === undefined) {
      return;
    }

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
      await handleGetGuests();
    }, 1000);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [searchValue]);

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
          onChange={(event) => setSearchValue(event.target.value)}
          value={searchValue ?? ""}
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
            onClick={() => setOnlyConfirmed(true)}
          >
            Confirmados {`(${confirmedGuestsCount})`}
          </TabsTrigger>
          <TabsTrigger
            className="h-12 w-1/2 border-b-4 border-gray-300 text-gray-400"
            value="canceled"
            onClick={() => setOnlyConfirmed(false)}
          >
            Cancelados {`(${canceledGuestsCount})`}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="confirmed">
          {isLoading ? (
            <LoadingContainer />
          ) : (
            <div className="flex w-full flex-col px-6">
              {confirmedGuests.map((guest) => (
                <GuestInfos guest={guest} key={guest.id} />
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="canceled">
          {isLoading ? (
            <LoadingContainer />
          ) : (
            <div className="flex w-full flex-col px-6">
              {canceledGuests.map((guest) => (
                <GuestInfos guest={guest} key={guest.id} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function LoadingContainer() {
  return (
    <div className="flex h-48 w-full items-center justify-center">
      <Loader className="text-gray-600" />
    </div>
  );
}
