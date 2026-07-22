"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { blurDataURL } from "@/lib/placeholder";

export function Hero() {
  return (
    <section className="relative flex h-[92svh] min-h-[560px] w-full items-end overflow-hidden bg-primary">
      <Image
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
        alt="O bucătărie Hardwick personalizată, cu insulă din marmură cu vinișoare simetrice și tâmplărie din stejar"
        fill
        priority
        placeholder="blur"
        blurDataURL={blurDataURL(1920, 1080)}
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-black/10" />
      <div className="absolute inset-x-0 top-0 h-28 bg-linear-to-b from-black/65 to-transparent sm:h-36" aria-hidden />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-4 text-xs font-medium tracking-[0.3em] text-white/70 uppercase"
        >
          Design · Producție · Instalare
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl text-4xl font-medium leading-[1.1] tracking-tight text-white text-balance sm:text-5xl lg:text-6xl"
        >
          Mobilier Custom Fără Compromis
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-5 max-w-lg text-base text-white/80 sm:text-lg"
        >
          Design. Producție. Instalare.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-9 flex flex-wrap items-center gap-4"
        >
          <Button asChild size="lg">
            <Link href="/portfolio">Vezi Portofoliul</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white">
            <Link href="/contact">Solicită o Ofertă</Link>
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 sm:block"
        aria-hidden
      >
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
          <ArrowDown className="size-5 text-white/70" />
        </motion.div>
      </motion.div>
    </section>
  );
}
