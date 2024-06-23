"use client";
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
import { Checkbox } from "./ui/checkbox";
import { Button } from "./ui/button";

const FormSchema = z.object({
  name: z.string({ message: "Campo obrigatório" }).min(1),
  children_quantity: z.coerce.number(),
  adults_quantity: z.coerce.number(),
  confirmation: z.boolean({ message: "Campo obrigatório" }),
  email: z
    .string({ message: "Campo obrigatório" })
    .email({ message: "Email inválido" }),
  phone: z.string({ message: "Campo obrigatório" }),
});

export default function ConfirmPresenceForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("DATA:", data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-4 rounded-lg border border-slate-400 bg-white p-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full lg:w-4/5">
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Nome completo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="children_quantity"
          render={({ field }) => (
            <FormItem className="w-full lg:w-4/5">
              <FormLabel>
                Quantidade de crianças{" "}
                <span className="text-xs">{"(até 7 anos)"}</span>
              </FormLabel>
              <FormControl>
                <Input type="number" placeholder="Ex: 2" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="adults_quantity"
          render={({ field }) => (
            <FormItem className="w-full lg:w-4/5">
              <FormLabel>
                Quantidade de adultos contando com você{" "}
                <span className="text-xs">
                  {"(crianças a partir de 8 anos contam como adulto)"}
                </span>
              </FormLabel>
              <FormControl>
                <Input type="number" placeholder="Ex: 2" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmation"
          render={({ field }) => (
            <FormItem className="w-full lg:w-4/5">
              <FormLabel>{"Você(s) estará(ão) presente?"}</FormLabel>
              <FormControl>
                <div className="flex items-center text-slate-600">
                  <div className="flex w-2/5 items-center gap-4">
                    <Checkbox
                      className="h-6 w-6"
                      checked={field.value}
                      onCheckedChange={() => field.onChange(true)}
                    />
                    <span>sim</span>
                  </div>
                  <div className="flex w-2/5 items-center gap-4">
                    <Checkbox
                      className="h-6 w-6"
                      checked={field.value == false}
                      onCheckedChange={() => field.onChange(false)}
                    />
                    <span>não</span>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex w-full flex-col gap-4 pt-4">
          <FormLabel>Email ou telefone para contato:</FormLabel>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full lg:w-4/5">
                <FormLabel className="text-xs">Email</FormLabel>
                <FormControl>
                  <Input placeholder="exemplo@hotmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="w-full lg:w-4/5">
                <FormLabel className="text-xs">Telefone</FormLabel>
                <FormControl>
                  <Input placeholder="(21) 99999-9999" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          className="mx-auto w-4/5 rounded-3xl bg-terracota-primary text-cream"
          type="submit"
        >
          Confirmar presença
        </Button>
      </form>
    </Form>
  );
}
