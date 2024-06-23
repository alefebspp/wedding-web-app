"use client";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { upload } from "@vercel/blob/client";

import { Dialog, DialogTrigger, DialogContent } from "../ui/dialog";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

import { createProduct, updateProduct } from "~/server/products";
import { ProductWithImage } from "~/types";
import { cn } from "~/lib/utils";
import Image from "next/image";
import { X } from "lucide-react";

const FormSchema = z.object({
  name: z.string({ message: "Campo obrigatório" }).min(1),
  price: z.string({ message: "Campo obrigatório" }).min(1),
});

type Props = PropsWithChildren & {
  product?: ProductWithImage;
};

export default function CreateProductDialog({ children, product }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasFileError, setHasFileError] = useState(false);
  const [editingImage, setEditingImage] = useState(false);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const showPreviewImage = product && !editingImage;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: product
      ? {
          name: product.name || "",
          price: product.price?.toString() || "",
        }
      : {},
  });

  const {
    formState: { isSubmitting },
    reset,
  } = form;

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (hasFileError) {
      setHasFileError(false);
    }

    if (!inputFileRef.current?.files) {
      return setHasFileError(true);
    }

    const file = inputFileRef.current.files[0];

    try {
      if (product) {
        const updateData = data;

        if (editingImage && file) {
          const newBlob = await upload(file.name, file, {
            access: "public",
            handleUploadUrl: "/api/product_image/upload",
          });

          const fileUrl = newBlob.url;

          Object.assign(updateData, {
            path: fileUrl,
          });
        }

        await updateProduct({
          id: product.id,
          data: {
            ...updateData,
            price: parseFloat(data.price),
          },
        });

        return setIsOpen(false);
      }

      if (file) {
        const newBlob = await upload(file.name, file, {
          access: "public",
          handleUploadUrl: "/api/product_image/upload",
        });

        const fileUrl = newBlob.url;

        await createProduct({
          ...data,
          price: parseFloat(data.price),
          path: fileUrl,
        });

        reset({
          name: "",
          price: "",
        });
        inputFileRef.current.files = null;
        setIsOpen(false);
      }
    } catch (error) {
      console.log("ERROR:", error);
    }
  }

  useEffect(() => {
    if (!isOpen) {
      if (editingImage) {
        setEditingImage(false);
      }
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="top-0 h-full translate-y-0 lg:top-[50%] lg:h-fit lg:translate-y-[-50%]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col items-center gap-4"
          >
            <h1 className="text-lg font-semibold text-gray-600">
              {product ? "Editar" : "Novo"} produto
            </h1>

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-full lg:w-4/5">
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome do produto" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="w-full lg:w-4/5">
                  <FormLabel>Preço</FormLabel>
                  <FormControl>
                    <Input placeholder="R$0,00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {showPreviewImage && (
              <div className="relative mt-8 flex h-1/5 w-4/5 flex-col before:absolute before:-top-4 before:left-0 before:text-xs before:font-semibold before:uppercase before:text-muted-foreground before:content-['imagem']">
                <Image
                  fill
                  className="w-full rounded-lg align-middle"
                  alt="Product image"
                  src={product.imageUrl || ""}
                />
                <button
                  type="button"
                  onClick={() => setEditingImage(true)}
                  className="absolute -right-4 -top-4 flex h-8 w-8 appearance-none items-center justify-center rounded-full border border-slate-500 bg-white outline-none"
                >
                  <X className="h-4 w-4 text-slate-700" />
                </button>
              </div>
            )}

            <div
              className={cn("w-full lg:w-4/5", {
                hidden: showPreviewImage,
              })}
            >
              <FormLabel>Imagem</FormLabel>
              <div className="flex flex-col">
                <Input
                  type="file"
                  ref={inputFileRef}
                  required={product ? editingImage : true}
                  name="product-image"
                  accept=".jpg,.jpeg, .png"
                />
                {hasFileError && (
                  <p className="text-xs font-medium text-destructive">
                    Imagem obrigatória
                  </p>
                )}
                {product && editingImage && (
                  <Button
                    type="button"
                    onClick={() => setEditingImage(false)}
                    size="icon"
                    className="mt-2 appearance-none rounded-full px-2 py-2 !text-xs font-semibold uppercase outline-none"
                  >
                    cancelar edição
                  </Button>
                )}
              </div>
            </div>

            <Button
              isLoading={isSubmitting}
              className="mt-auto w-full rounded-3xl lg:mt-4 lg:w-4/5 lg:rounded-2xl"
              type="submit"
            >
              {product ? "Editar" : "Criar"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
