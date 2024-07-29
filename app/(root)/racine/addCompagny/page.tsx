"use client"
import { useRouter } from "next/navigation"
import React, {useState} from "react"
import {
  CardDescription,
  CardTitle,
} from "@/components/ui/card"
import { toast } from "react-hot-toast";
import { Loader2 } from "lucide-react"
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

const formSchema = z
  .object({
    name: z.string(),
    email: z.string().email(),
    tel: z.string(),
    address: z.string(),
  });

export default function AddCompagny() {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name:"",
            email:"",
            tel:"",
            address:"",
        },
    });

    const [loading, setLoading] = useState(false); 
    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
          setLoading(true)
          const response = await fetch("/api/compagnies/", {
              method: "POST",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
          });
      
          if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.error);
          }
          router.push("/racine");
        } catch (error: any) {
            toast.error(error.message || "An error occurred while logging in");
            console.error("Login error:", error);
        }finally{
          setLoading(false)
      }
      };
  return (
    <div className=" h-screen w-full overflow-hidden flex items-center justify-center">

       <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(handleSubmit)}
          className="max-w-md w-full flex flex-col gap-4 border px-4 py-12 rounded-xl border-slate-950 shadow-lg"
        >
       <CardTitle className="text-xl">Ajouter une compagnie</CardTitle>
        <CardDescription>
         Entrer les informations de la compagnie
        </CardDescription>
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => {
                return (
                    <FormItem>
                    <FormLabel>Nom de la Compagnie</FormLabel>
                    <FormControl>
                        <Input
                        placeholder="Compagnie"
                        type="text"
                        {...field}
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                );
                }}
            />
            <FormField
            control={form.control}
            name="tel"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Téléphone</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="330000000"
                      type="tel"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => {
                return (
                    <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input
                        placeholder="Email"
                        type="email"
                        {...field}
                        />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                );
                }}
            />
            <FormField
            control={form.control}
            name="address"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Adresse</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ouest Foire, Dakar, Sénégal"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button type="submit" className="w-full">
            
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Valider"}
          </Button>
          <Link href={"/racine"}>
          Racine
          </Link>
        </form>
      </Form>

      
    </div>
  )
}