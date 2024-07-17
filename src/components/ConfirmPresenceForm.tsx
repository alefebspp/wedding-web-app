"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { UseFieldArrayRemove, useFieldArray, useForm } from "react-hook-form";
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
import { useToast } from "./ui/use-toast";
import { createGuest } from "~/server/guests";
import { useEffect, useState } from "react";
import { Minus, Plus } from "lucide-react";

type HandleUseFieldArrayProps = {
  quantity: number;
  addedFields: number;
  append: () => void;
  remove: UseFieldArrayRemove;
  ignoreOneField?: boolean;
};

const FormSchema = z.object({
  name: z.string({ message: "Campo obrigatório" }).min(1),
  children_quantity: z.number({ message: "Campo obrigatório" }),
  adults_quantity: z
    .number({ message: "Campo obrigatório" })
    .min(1, { message: "A quantidade de adultos deve ser maior que zero" }),
  confirmation: z.boolean({ message: "Campo obrigatório" }),
  email: z
    .string({ message: "Campo obrigatório" })
    .email({ message: "Email inválido" }),
  phone: z
    .string({ message: "Campo obrigatório" })
    .min(9, { message: "Telefone inválido" })
    .max(9, { message: "Telefone inválido" }),
  children_names: z
    .array(
      z.object({
        name: z.string().min(1, { message: "Nome da criança é obrigatório." }),
      }),
    )
    .optional(),
  adults_names: z
    .array(
      z.object({
        name: z
          .string()
          .min(1, { message: "Nome do acompanhante é obrigatório." }),
      }),
    )
    .optional(),
});

const formDefaultValues = {
  name: "",
  confirmation: undefined,
  children_quantity: 0,
  adults_quantity: 0,
  email: "",
  phone: "",
};

export default function ConfirmPresenceForm() {
  const [success, setSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      children_quantity: 0,
      adults_quantity: 0,
    },
  });

  const {
    formState: { isSubmitting, errors },
    reset,
    control,
    watch,
    register,
    setValue,
  } = form;

  const childrenNames = useFieldArray({ control, name: "children_names" });
  const adultsNames = useFieldArray({ control, name: "adults_names" });

  const children_quantity = watch("children_quantity");
  const adults_quantity = watch("adults_quantity");

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const { phone, ...rest } = data;

      const formattedData = {
        ...rest,
      };

      if (phone) {
        Object.assign(formattedData, {
          phone: parseInt(phone),
        });
      }

      await createGuest(formattedData);

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

  function handleUseFieldArray({
    quantity,
    addedFields,
    append,
    remove,
    ignoreOneField,
  }: HandleUseFieldArrayProps) {
    if (quantity == addedFields) {
      return;
    }

    if (quantity > addedFields) {
      const toBeAddedFields = quantity - addedFields;
      for (let i = 0; i < toBeAddedFields; i++) {
        append();
      }
    } else {
      if (quantity < 1 && ignoreOneField) {
        return;
      }

      const toBeRemoveFields = addedFields - quantity;
      let lastFieldIndex = addedFields - 1;

      if (ignoreOneField) {
        lastFieldIndex--;
      }

      const stopIndex = toBeRemoveFields - (lastFieldIndex + 1);
      if (toBeRemoveFields === 1) {
        return remove(lastFieldIndex);
      }
      for (let i = lastFieldIndex; i >= stopIndex; i--) {
        remove(i);
      }
    }
  }

  useEffect(() => {
    const append = () => adultsNames.append({ name: "" });
    handleUseFieldArray({
      quantity: adults_quantity,
      addedFields: adultsNames.fields.length + 1,
      append,
      remove: adultsNames.remove,
      ignoreOneField: true,
    });
  }, [adults_quantity]);

  useEffect(() => {
    const append = () => childrenNames.append({ name: "" });
    handleUseFieldArray({
      quantity: children_quantity,
      addedFields: childrenNames.fields.length,
      append,
      remove: childrenNames.remove,
      ignoreOneField: false,
    });
  }, [children_quantity]);

  if (success) {
    return (
      <div className="w-full bg-gray-100 p-8 md:px-16 md:py-12">
        <span className="text-green-500">
          Sua resposta foi registrada com sucesso
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
                <div className="flex items-center gap-6 py-4">
                  <button
                    type="button"
                    onClick={() => setValue(field.name, field.value + 1)}
                    className="flex h-8 w-8 appearance-none items-center justify-center rounded-full bg-zinc-500 outline-none"
                  >
                    <Plus className="h-6 w-6 text-white" />
                  </button>
                  <span className="text-lg text-gray-600">{field.value}</span>
                  <button
                    type="button"
                    disabled={field.value === 0}
                    onClick={() => setValue(field.name, field.value - 1)}
                    className="flex h-8 w-8 appearance-none items-center justify-center rounded-full bg-zinc-500 outline-none disabled:opacity-50"
                  >
                    <Minus className="h-6 w-6 text-white" />
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {childrenNames.fields.map((field, index) => (
          <div key={field.id} className="flex w-full flex-col gap-2 lg:w-4/5">
            <Input
              {...register(`children_names.${index}.name`)}
              placeholder="Nome da criança"
            />
            {errors["children_names"]?.[index] && (
              <p className="text-xs font-medium text-destructive">
                Campo obrigatório
              </p>
            )}
          </div>
        ))}
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
                <div className="flex items-center gap-6 py-4">
                  <button
                    type="button"
                    onClick={() => setValue(field.name, field.value + 1)}
                    className="flex h-8 w-8 appearance-none items-center justify-center rounded-full bg-zinc-500 outline-none"
                  >
                    <Plus className="h-6 w-6 text-white" />
                  </button>
                  <span className="text-lg text-gray-600">{field.value}</span>
                  <button
                    type="button"
                    disabled={field.value === 0}
                    onClick={() => setValue(field.name, field.value - 1)}
                    className="flex h-8 w-8 appearance-none items-center justify-center rounded-full bg-zinc-500 outline-none disabled:opacity-50"
                  >
                    <Minus className="h-6 w-6 text-white" />
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {adultsNames.fields.map((field, index) => (
          <div key={field.id} className="flex w-full flex-col gap-2 lg:w-4/5">
            <Input
              {...register(`adults_names.${index}.name`)}
              placeholder="Nome do acompanhante"
            />
            {errors["adults_names"]?.[index] && (
              <p className="text-xs font-medium text-destructive">
                Campo obrigatório
              </p>
            )}
          </div>
        ))}
        <FormField
          control={form.control}
          name="confirmation"
          render={({ field }) => (
            <FormItem className="w-full lg:w-4/5">
              <FormLabel>{"Você(s) estará(ão) presente?"}</FormLabel>
              <FormControl>
                <div className="flex items-center text-zinc-500">
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
        <div className="flex w-full flex-col gap-4 pt-4 lg:w-4/5">
          <FormLabel>Email ou telefone para contato:</FormLabel>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
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
              <FormItem className="w-full">
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
          isLoading={isSubmitting}
          className="mx-auto w-4/5 rounded-3xl bg-terracota-primary text-cream lg:mt-4 lg:h-12 lg:w-3/5"
          type="submit"
        >
          Confirmar presença
        </Button>
      </form>
    </Form>
  );
}
