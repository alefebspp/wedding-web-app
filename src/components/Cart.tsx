"use client";

import { ShoppingCart } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

import { Button, buttonVariants } from "./ui/button";
import { useCartContext } from "~/contexts/cartContext";
import Image from "next/image";
import useCart from "~/hooks/useCart";
import { useState } from "react";
import Link from "next/link";

type Props = {
  onValueChange: (value: string) => void;
};

export default function Cart({ onValueChange }: Props) {
  const [priceFilter, setPriceFilter] = useState("default");
  const { cart, showSummary, setShowSummary, cartTotal } = useCartContext();
  const { removeProduct } = useCart();

  const cartHasProducts = cart.length > 0;

  function handleOnValueChange(value: string) {
    setPriceFilter(value);
    onValueChange(value);
  }

  function handleBackToGiftsList() {
    setShowSummary(false);
    const giftsListTop = document.getElementById("presentes");
    if (giftsListTop) {
      giftsListTop.scrollIntoView({ behavior: "smooth" });
    }
  }

  return (
    <>
      {showSummary ? (
        <div className="flex w-full flex-col rounded-lg border border-slate-300 bg-white p-4 text-zinc-800">
          <h3 className="my-4 text-2xl font-semibold">Meu carrinho</h3>
          {cart.length > 0 && (
            <div className="flex w-full items-center justify-between">
              <h5 className="font-medium">Descrição do presente</h5>
              <h5 className="font-medium">Valor</h5>
            </div>
          )}
          {!cartHasProducts && (
            <div className="flex w-full flex-col items-center justify-center gap-4 py-[10%]">
              <h4>Seu carrinho está vazio</h4>
              <Button
                onClick={handleBackToGiftsList}
                className="w-fit"
                variant="rounded"
              >
                Retornar a lista de presentes
              </Button>
            </div>
          )}
          {cartHasProducts && (
            <ul className="flex w-full flex-col border-t border-slate-300 ">
              {cart.map((product) => (
                <li
                  key={product.id}
                  className="flex w-full flex-col border-b border-slate-300 py-2 md:flex-row"
                >
                  <div className="relative h-24 w-2/5 md:mr-8 md:w-1/4 lg:w-1/6">
                    <Image
                      fill
                      className="h-auto w-full rounded-md border border-slate-300 p-1 align-middle md:max-w-32"
                      alt="Imagem do produto"
                      src={product.imageUrl ?? ""}
                    />
                  </div>
                  <div className="flex w-full items-start py-2">
                    <div className="flex w-2/3 flex-col justify-start md:w-3/4">
                      <h3 className="mb-2 text-lg font-normal">
                        {product.name}
                      </h3>
                      <div className="flex gap-4">
                        {product.payment_link && (
                          <Link
                            target="_blank"
                            className="w-fit text-green-400 underline"
                            href={product.payment_link}
                          >
                            Presentear
                          </Link>
                        )}
                        <button
                          onClick={() => removeProduct(product.id)}
                          className="w-fit appearance-none text-red-500 underline"
                        >
                          Remover
                        </button>
                      </div>
                    </div>
                    <div className="w-1/3 text-right md:w-1/4">
                      <span>
                        {product.price &&
                          product.price.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {cartHasProducts && (
            <div className="flex w-full flex-col pt-4">
              <p className="text-right text-xl">
                <span className="mr-2 font-medium">Total</span>
                {cartTotal.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
              <div className="mt-4 flex w-full flex-col gap-2 md:flex-row md:justify-center">
                <Button
                  onClick={handleBackToGiftsList}
                  className="md:w-1/4"
                  variant="rounded-cancel"
                >
                  Continuar comprando
                </Button>
                <Link
                  target="_blank"
                  href="https://link.mercadopago.com.br/shopify3"
                  className={buttonVariants({
                    className: "!rounded-3xl md:w-1/4",
                  })}
                >
                  Finalizar compra
                </Link>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="mx-auto mt-8 flex w-4/5 flex-col py-4 md:flex-row md:items-center md:justify-between md:pb-8">
          <Button
            onClick={() => setShowSummary(true)}
            disabled={cart.length === 0}
            variant="rounded"
            className="flex w-fit gap-2 disabled:opacity-50 md:text-lg"
          >
            <ShoppingCart className="h-5 w-5 md:h-6 md:w-6" />
            {cart.length > 0
              ? `Ver carrinho (${cart.length} presente${cart.length > 1 ? "s" : ""})`
              : "Carrinho vazio"}
          </Button>
          <div className="flex w-full items-center justify-between  py-4 md:h-full md:w-fit md:items-center md:justify-center md:gap-2 md:py-0">
            <p className="text-sm text-zinc-700">Ordernar lista por:</p>
            <Select
              value={priceFilter}
              onValueChange={(value) => handleOnValueChange(value)}
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
      )}
    </>
  );
}
