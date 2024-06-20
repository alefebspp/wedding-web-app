"use client";
import { PropsWithChildren, useRef, useState } from "react";
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

import { createProduct } from "~/server/products";
import { ProductWithImage } from "~/types";

const FormSchema = z.object({
  name: z.string({ message: "Campo obrigatório" }).min(1),
  price: z.string({ message: "Campo obrigatório" }).min(1),
});

type Props = PropsWithChildren & {
  product?: ProductWithImage;
};

export default function CreateProductDialog({ children, product }: Props) {
  const [hasFileError, setHasFileError] = useState(false);
  const inputFileRef = useRef<HTMLInputElement>(null);

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

    if (file) {
      try {
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
      } catch (error) {
        console.log("ERROR:", error);
      }
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="top-0 h-2/4 translate-y-0 lg:top-[50%] lg:h-fit lg:translate-y-[-50%]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex h-full w-full flex-col items-center gap-4"
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

            <FormItem className="w-full lg:w-4/5">
              <FormLabel>Imagem</FormLabel>
              <div className="flex flex-col">
                <Input type="file" ref={inputFileRef} required />
                {hasFileError && (
                  <p className="text-xs font-medium text-destructive">
                    Imagem obrigatória
                  </p>
                )}
              </div>
              <FormMessage />
            </FormItem>

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
