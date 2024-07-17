"use client";

import { ShoppingCart } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import { Button } from "./ui/button";

type Props = {
  onValueChange: (value: string) => void;
};

export default function Cart({ onValueChange }: Props) {
  return (
    <div className="mx-auto mt-8 flex w-4/5 flex-col py-4 md:flex-row md:items-center md:justify-between md:pb-8">
      <Button
        disabled
        variant="rounded"
        className="flex w-fit gap-2 opacity-50 md:text-lg"
      >
        <ShoppingCart className="h-5 w-5 md:h-6 md:w-6" />
        Carrinho vazio
      </Button>
      <div className="flex w-full items-center justify-between  py-4 md:h-full md:w-fit md:items-center md:justify-center md:gap-2 md:py-0">
        <p className="text-sm text-zinc-700">Ordernar lista por:</p>
        <Select
          onValueChange={(value) => onValueChange(value)}
          defaultValue="default"
        >
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">A-Z</SelectItem>
            <SelectItem value="asc">Menor preço</SelectItem>
            <SelectItem value="desc">Maior preço</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
