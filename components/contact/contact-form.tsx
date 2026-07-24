"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Send, AlertCircle } from "lucide-react";
import { contactSchema, type ContactFormValues } from "@/lib/contact-schema";
import { siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

export function ContactForm() {
  const [submitted, setSubmitted] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);
  const formRenderedAt = React.useRef(Date.now());

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", message: "", company: "" },
  });

  async function onSubmit(values: ContactFormValues) {
    setErrorMessage(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, formRenderedAt: formRenderedAt.current }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.message || "Trimiterea mesajului a eșuat. Te rugăm să încerci din nou.");
      }

      setSubmitted(true);
      form.reset();
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Trimiterea mesajului a eșuat. Te rugăm să încerci din nou.");
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-3 rounded-lg border border-border bg-muted/40 px-6 py-16 text-center">
        <CheckCircle2 className="size-8 text-gold" strokeWidth={1.25} aria-hidden />
        <p className="text-lg font-medium">Mesajul tău a fost trimis</p>
        <p className="max-w-sm text-sm text-muted-foreground">
          Îți mulțumim! Te vom contacta în curând la adresa de email furnizată. Dacă e urgent, scrie-ne direct la{" "}
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
        {/* Honeypot: hidden from real visitors via CSS, so only bots fill it. */}
        <div className="absolute left-[-9999px] opacity-0" aria-hidden="true">
          <label htmlFor="company">Nu completa acest câmp</label>
          <input
            id="company"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            {...form.register("company")}
          />
        </div>

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

        {errorMessage ? (
          <div className="flex items-start gap-2.5 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden />
            <p>{errorMessage}</p>
          </div>
        ) : null}

        <Button type="submit" size="lg" disabled={form.formState.isSubmitting} className="w-full sm:w-auto">
          {form.formState.isSubmitting ? "Se trimite…" : "Trimite Mesajul"}
          <Send className="size-4" aria-hidden />
        </Button>
      </form>
    </Form>
  );
}
