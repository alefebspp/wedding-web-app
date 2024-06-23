"use client";
import { Edit, Trash } from "lucide-react";
import Image from "next/image";

import CreateProductDialog from "./dashboard/CreateProductDialog";

import { ProductWithImage } from "~/types";
import DeleteDataAlert from "./DeleteDataAlert";
import deleteProduct from "~/server/products";
import { Button } from "./ui/button";
import { cn } from "~/lib/utils";

type Props = {
  product: ProductWithImage;
  editMode?: boolean;
};

export default function ProductCard({ product, editMode }: Props) {
  return (
    <div
      key={product.id}
      className={cn(
        "flex w-4/5 flex-col gap-4 rounded-md bg-white p-2 shadow-lg",
        {
          "w-2/5 items-center": !editMode,
        },
      )}
    >
      <div className="relative h-40 w-full">
        <Image
          fill
          className="w-full rounded-lg align-middle"
          src={product.imageUrl ?? ""}
          alt="Product image"
        />
      </div>
      <span className="text-[14px]">{product.name}</span>
      <span className="text-lg font-bold">R${product.price}</span>
      {editMode ? (
        <div className="flex w-full items-center justify-end gap-8">
          <CreateProductDialog product={product}>
            <Edit className="h-8 w-8 text-slate-500" />
          </CreateProductDialog>
          <DeleteDataAlert action={deleteProduct} id={product.id}>
            <Trash className="h-8 w-8 text-red-500" />
          </DeleteDataAlert>
        </div>
      ) : (
        <Button className="h-[48px] w-full rounded-3xl bg-olive-green-400 px-6 py-0">
          Presentear
        </Button>
      )}
    </div>
  );
}
