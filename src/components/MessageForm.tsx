"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { createMessage } from "~/server/messages";
import { Textarea } from "./ui/textarea";
import { useQueryClient } from "@tanstack/react-query";

const FormSchema = z.object({
  content: z.string({ message: "Campo obrigatório" }).min(1),
  user_name: z.string({ message: "Campo obrigatório" }).min(1),
  email: z
    .string({ message: "Campo obrigatório" })
    .email({ message: "Email inválido" }),
});

const formDefaultValues = {
  content: "",
  user_name: "",
  email: "",
};

export default function MessageForm() {
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const {
    formState: { isSubmitting },
    reset,
  } = form;

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await createMessage(data);
      queryClient.invalidateQueries({ queryKey: ["messages"] });
      reset(formDefaultValues);
      setSuccess(true);
    } catch (error) {
      toast({
        title: "Error",
        description: "Aconteceu um erro ao tentar realizar ação",
        variant: "destructive",
      });
    }
  }

  if (success) {
    return (
      <div className="w-full bg-gray-100 p-8 text-center md:px-16 md:py-12">
        <span className=" text-green-500">
          Sua recado foi registrado com sucesso
        </span>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col items-center justify-center gap-4 rounded-lg border border-slate-300 bg-white p-8 md:px-[15%]"
      >
        <FormField
          control={form.control}
          name="user_name"
          render={({ field }) => (
            <FormItem className="w-full lg:w-4/5">
              <FormLabel>Seu nome</FormLabel>
              <FormControl>
                <Input placeholder="Nome" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full lg:w-4/5">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="exemplo@hotmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className="w-full lg:w-4/5">
              <FormLabel>Recado</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          isLoading={isSubmitting}
          className="mx-auto w-4/5 rounded-3xl bg-terracota-primary text-cream lg:mt-4 lg:h-12 lg:w-3/5"
          type="submit"
        >
          Enviar recado
        </Button>
      </form>
    </Form>
  );
}
