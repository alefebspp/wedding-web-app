"use client";

import { PgTableWithColumns } from "drizzle-orm/pg-core";
import { Trash } from "lucide-react";
import { PropsWithChildren, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

type Props = {
  action: ({ id }: { id: number }) => Promise<{ success: boolean }>;
  id: number;
} & PropsWithChildren;

export default function DeleteDataAlert({ id, children, action }: Props) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  async function handleDelete() {
    setIsLoading(true);
    try {
      const success = await action({ id });

      toast({
        title: "Sucesso",
        description: "Registro removido com sucesso",
        variant: "success",
      });

      setOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Aconteceu um erro ao tentar realizar ação",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-slate-600">
            Deseja remover o produto?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="border-slate-600 text-slate-600">
            Cancelar
          </AlertDialogCancel>
          <Button
            onClick={async () => await handleDelete()}
            isLoading={isLoading}
          >
            Continuar
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
