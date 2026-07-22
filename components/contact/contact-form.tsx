"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CheckCircle2, Send } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Te rugăm să introduci numele tău."),
  email: z.string().trim().email("Te rugăm să introduci o adresă de email validă."),
  phone: z
    .string()
    .trim()
    .optional()
    .refine((value) => !value || value.length >= 6, "Te rugăm să introduci un număr de telefon valid."),
  message: z.string().trim().min(10, "Povestește-ne puțin mai mult despre proiectul tău."),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [submitted, setSubmitted] = React.useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", message: "" },
  });

  function onSubmit(values: ContactFormValues) {
    const subject = encodeURIComponent(`Cerere de ofertă de la ${values.name}`);
    const bodyLines = [
      values.message,
      "",
      `Nume: ${values.name}`,
      `Email: ${values.email}`,
      values.phone ? `Telefon: ${values.phone}` : undefined,
    ].filter(Boolean);
    const body = encodeURIComponent(bodyLines.join("\n"));

    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
    form.reset();
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-lg border border-border bg-muted/40 px-6 py-16 text-center">
        <CheckCircle2 className="size-8 text-gold" strokeWidth={1.25} aria-hidden />
        <p className="text-lg font-medium">Clientul tău de email ar trebui să se fi deschis acum</p>
        <p className="max-w-sm text-sm text-muted-foreground">
          Dacă nu s-a deschis automat, scrie-ne direct la{" "}
          <a href={`mailto:${siteConfig.email}`} className="underline underline-offset-4">
            {siteConfig.email}
          </a>
          .
        </p>
        <Button variant="outline" className="mt-2" onClick={() => setSubmitted(false)}>
          Trimite un alt mesaj
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
        <div className="grid gap-6 sm:grid-cols-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nume</FormLabel>
                <FormControl>
                  <Input placeholder="Ioana Georgescu" autoComplete="name" {...field} />
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
                  <Input type="email" placeholder="ioana@exemplu.ro" autoComplete="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefon (opțional)</FormLabel>
              <FormControl>
                <Input type="tel" placeholder="+40 712 345 678" autoComplete="tel" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mesaj</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Povestește-ne despre spațiul tău, termenul dorit și ce ai vrea să construim…"
                  rows={6}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" size="lg" disabled={form.formState.isSubmitting} className="w-full sm:w-auto">
          Trimite Mesajul
          <Send className="size-4" aria-hidden />
        </Button>
      </form>
    </Form>
  );
}
