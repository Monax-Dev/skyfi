"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { Loader2 } from "lucide-react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { CardTitle, CardDescription } from "@/components/ui/card";

const formSchema = z.object({
  name: z.string({
    message: "Le nom de la compagnie est requis",
    invalid_type_error: "Le nom de la compagnie est invalide",
  }),
  email: z
    .string()
    .email({ message: "L'email de la compagnie est invalide" }),
  tel: z.string({
    message: "Le numéro de téléphone de la compagnie est requis",
    invalid_type_error: "Le numéro de téléphone de la compagnie est invalide",
  }),
  address: z.string({
    message: "L'adresse de la compagnie est requise",
    invalid_type_error: "L'adresse de la compagnie est invalide",
  }),
});

export default function Compagnie() {
  const router = useRouter();
  const [idCompagnie, setIdCompagnie] = useState(localStorage.getItem("selectedCompagnieId") || "");
  const [title, setTitle] = useState("Ma compagnie");
  const [compagnie, setCompagnie] = useState({
    name: "",
    email: "",
    tel: "",
    address: "",
  });

  useEffect(() => {
    setIdCompagnie(localStorage.getItem("selectedCompagnieId") || "");
    if (idCompagnie) {
      fetch(`/api/compagnies/${idCompagnie}`)
        .then((res) => res.json())
        .then((data) => {
          setCompagnie(data.compagnie);
          setTitle(data.compagnie.name);
        });
    }
  }, [idCompagnie]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: compagnie.name,
      email: compagnie.email,
      tel: compagnie.tel,
      address: compagnie.address,
    },
  });

  useEffect(() => {
    form.reset(compagnie);
  }, [compagnie, form]);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/compagnies/${idCompagnie}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
      toast.success("Compagnie modifiée avec succès");
    } catch (error: any) {
      toast.error(error.message || "An error occurred while updating the company");
      console.error("Update error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col flex-1 items-start gap-4 p-4 sm:px-6 sm:py-8 md:gap-8">
        <Toaster/>
      <div className="hidden md:flex">
        <CardTitle>{title}</CardTitle>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full flex flex-col gap-4 border px-4 py-12 rounded-xl border-slate-950 shadow-lg"
        >
          <CardTitle className="text-xl">Modifier la compagnie</CardTitle>
          <CardDescription>Entrer les nouvelles informations de la compagnie</CardDescription>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom de la Compagnie</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Compagnie"
                      type="text"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setCompagnie({ ...compagnie, name: e.target.value });
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Téléphone</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="330000000"
                      type="tel"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setCompagnie({ ...compagnie, tel: e.target.value });
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Email"
                      type="email"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setCompagnie({ ...compagnie, email: e.target.value });
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Adresse</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ouest Foire, Dakar, Sénégal"
                      type="text"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setCompagnie({ ...compagnie, address: e.target.value });
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="max-w-xs w-full mt-4">
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Valider"}
          </Button>
        </form>
      </Form>
      <div className="w-full flex flex-col gap-4 border px-4 py-12 rounded-xl border-slate-950 shadow-lg">
        <CardTitle>Supprimer la compagnie</CardTitle>
        <CardDescription>
          La suppression d'une compagnie entraînera automatiquement la suppression de toutes les factures, revenus et dépenses associés à cette compagnie. Assurez-vous d'avoir sauvegardé toutes les informations nécessaires avant de procéder à cette action. Cette opération est irréversible et toutes les données liées seront définitivement perdues.
        </CardDescription>
        <Button type="submit" className="max-w-xs w-full mt-4 bg-red-500 text-white hover:bg-red-600">
          Supprimer
        </Button>
      </div>
    </div>
  );
}
