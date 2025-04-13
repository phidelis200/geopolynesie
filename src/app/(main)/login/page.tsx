"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  email: z.string().email({
    message: "Veuillez entrer un email valide",
  }),
  password: z.string().min(1, {
    message: "Le mot de passe est requis",
  }),
});

const LoginPage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Une erreur est survenue");
      }

      // Redirect to dashboard or home page
      window.location.href = "/admin/dashboard";
    } catch (error) {
      console.error("Login error:", error);
      // Handle error (you might want to add toast notification here)
    }
  }

  return (
    <main className="flex-grow pt-24">
      {/* Header */}
      <div
        className="bg-ocean-800 text-white py-16 md:py-24"
        data-aos="fade-down"
      >
        <div className="container max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Connexion</h1>
          <p className="text-xl text-ocean-100 max-w-3xl mx-auto">
            Accédez à votre espace personnel pour gérer vos projets et suivre
            vos demandes.
          </p>
        </div>
      </div>

      <div className="py-16">
        <div className="container max-w-md mx-auto px-4">
          <div className="bg-white rounded-lg border p-8" data-aos="fade-up">
            <h2 className="text-2xl font-bold text-ocean-800 mb-6">
              Identifiez-vous
            </h2>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">E-mail*</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="email@example.com"
                          className="w-full px-4 py-2 border !border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:!ring-ocean-500"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">
                        Mot de passe*
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          className="w-full px-4 py-2 border !border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:!ring-ocean-500"
                          {...field}
                          placeholder=".........."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-ocean-600 hover:bg-ocean-700 text-white py-3 rounded-md transition-colors flex items-center justify-center cursor-pointer"
                >
                  <LogIn size={18} className="mr-2" />
                  Se connecter
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
