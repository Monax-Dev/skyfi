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
import { set } from "mongoose";

const formSchema = z.object({
    username: z.string({
        message: "Votre Nom complet est requis",
        invalid_type_error: "Votre Nom complet est invalide",
    }),
    email: z
        .string()
        .email({ message: "Votre email de la compagnie est invalide" }),
    tel: z.string({
        message: "Votre numéro de téléphone de la compagnie est requis",
        invalid_type_error: "Votre numéro de téléphone de la compagnie est invalide",
    }),
    // password: z.string({
    //     message: "Votre mot de passse est requise",
    //     invalid_type_error: "Votre mot de passse est invalide",
    // }).min(6, "Votre mot de passse doit contenir au moins 6 caractères"),
});

export default function Profil() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [isModified, setIsModified] = useState(false);
  const [idUser, setIdUser] = useState("");
  const [user, setUser] = useState({
    username: "",
    email: "",
    tel: "",
  });

  useEffect(() => {
      fetch(`/api/users/me`)
        .then((res) => res.json())
        .then((data) => {
            setUser(data.data);
            setIdUser(data.data._id);
            setTitle(data.data.username);
        });
  }, [setTitle]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user.username,
      email: user.email,
      tel: user.tel,
    },
  });

  useEffect(() => {
    form.reset(user);
  }, [user, form]);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/users/me`, {
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
        <Toaster position='bottom-right'/> 
      <div className="hidden sm:flex">
        <CardTitle>Bonjour {title}</CardTitle>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="w-full flex flex-col gap-4 border px-4 py-12 rounded-xl border-slate-950 shadow-lg"
        >
          <CardTitle className="text-xl">Modifier mes informations</CardTitle>
          <CardDescription>Entrer les nouvelles informations de la compagnie</CardDescription>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prénom & Nom </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Simon Diouf"
                      type="text"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        setUser({ ...user, username: e.target.value });
                        setTitle(e.target.value);
                        setIsModified(true);
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
                        setUser({ ...user, tel: e.target.value });
                        setIsModified(true);
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
                        setUser({ ...user, email: e.target.value });
                        setIsModified(true);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="max-w-xs w-full mt-4" disabled={!isModified}> 
            {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Valider"}
          </Button>
        </form>
      </Form>
      {/* <div className="w-full flex flex-col gap-4 border px-4 py-12 rounded-xl border-slate-950 shadow-lg">
        <CardTitle>Supprimer la user</CardTitle>
        <CardDescription>
          La suppression d&apos;une compagnie entraînera automatiquement la suppression de toutes les factures, revenus et dépenses associés à cette compagnie. Assurez-vous d&apos;avoir sauvegardé toutes les informations nécessaires avant de procéder à cette action. Cette opération est irréversible et toutes les données liées seront définitivement perdues.
        </CardDescription>
        <Button type="submit" className="max-w-xs w-full mt-4 bg-red-500 text-white hover:bg-red-600">
          Supprimer
        </Button>
      </div> */}
    </div>
  );
}
