"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/lib/site";
import { WhatsappIcon } from "@/components/shared/social-icons";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const WHATSAPP_MESSAGE = "Bună! Aș dori mai multe detalii despre mobilierul custom Hardwick.";

export function WhatsAppButton() {
  const href = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.a
          href={href}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={`Scrie-ne pe WhatsApp la ${siteConfig.phone}`}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          className="fixed bottom-6 left-6 z-40 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-colors hover:bg-[#20bd5a] focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 sm:bottom-8 sm:left-8"
        >
          <WhatsappIcon className="size-7" />
        </motion.a>
      </TooltipTrigger>
      <TooltipContent side="right">Scrie-ne pe WhatsApp</TooltipContent>
    </Tooltip>
  );
}
