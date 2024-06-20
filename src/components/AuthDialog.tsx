"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { KeyRound } from "lucide-react";

import { Dialog, DialogTrigger, DialogContent } from "./ui/dialog";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { cn } from "~/lib/utils";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  username: z.string({ message: "Campo obrigatório" }).min(1),
  password: z.string({ message: "Campo obrigatório" }).min(1),
});

type Props = {
  onMobile?: boolean;
};

export default function AuthDialog({ onMobile }: Props) {
  const { push } = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const {
    formState: { isSubmitting },
  } = form;

  function onSubmit(data: z.infer<typeof FormSchema>) {
    push("/dashboard");
  }

  return (
    <Dialog>
      <DialogTrigger
        className={cn("cursor-pointer", {
          "block flex w-full items-center justify-center rounded-2xl bg-terracota-primary py-2":
            onMobile,
        })}
        asChild
      >
        {onMobile ? (
          <span className="text-white">Área restrita</span>
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
            <KeyRound className="h-6 w-6 text-terracota-primary" />
          </div>
        )}
      </DialogTrigger>
      <DialogContent className="top-0 h-2/4 translate-y-0 lg:top-[50%] lg:h-fit lg:translate-y-[-50%]">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex h-full w-full flex-col items-center gap-4"
          >
            <h1 className="text-lg font-semibold text-gray-600">
              Área restrita
            </h1>

            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="w-full lg:w-4/5">
                  <FormLabel>Usuário</FormLabel>
                  <FormControl>
                    <Input placeholder="usuário" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="w-full lg:w-4/5">
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <Input placeholder="*******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              isLoading={isSubmitting}
              className="mt-auto w-full rounded-3xl lg:mt-4 lg:w-4/5 lg:rounded-2xl"
              type="submit"
            >
              Acessar
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
