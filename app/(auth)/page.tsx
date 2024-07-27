"use client";
import Image from "next/image"
import { useRouter } from "next/navigation"
import React, {useState} from "react"
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


const formSchema = z
  .object({
    email: z.string().email(),
    password: z.string(),
  });

export default function Login() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [loading, setLoading] = useState(false); 

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true)
      // const response = await fetch("/api/auth/[...nextauth]", {
      //     method: "POST",
      //     headers: {
      //         "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(values),
      // });
  
      // if (!response.ok) {
      //     const errorData = await response.json();
      //     throw new Error(errorData.error);
      // }
      console.log("Login values:", values);
      router.push("/");
    } catch (error: any) {
        toast.error(error.message || "An error occurred while logging in");
        console.error("Login error:", error);
    }finally{
      setLoading(false)
  }
  };
  return (
    <div className="w-full lg:grid h-screen lg:grid-cols-2 overflow-hidden">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Se connecter</h1>
            <p className="text-balance text-muted-foreground">
              Entrer vos identifiants pour accéder à votre compte
            </p>
          </div>
          <div className="grid gap-4">
          <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="max-w-md w-full flex flex-col gap-4"
        >
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
            name="password"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button type="submit" className="w-full">
            
          {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Valider"}
          </Button>
        </form>
      </Form>
          </div>
          {/* <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="#" className="underline">
              Sign up
            </Link>
          </div> */}
        </div>
      </div>
      <div className="hidden bg-muted lg:block relative">
        <Image
          src="/cool-background.png"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale backdrop-blur-md"
        />
        <h1 className="absolute bottom-0  right-0 text-4xl font-black text-center text-white p-4">SKYFI</h1>
      </div>
    </div>
  )
}
