"use client";

import * as React from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Counter from "yet-another-react-lightbox/plugins/counter";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/counter.css";
import { Expand } from "lucide-react";
import { blurDataURL } from "@/lib/placeholder";
import { cn } from "@/lib/utils";

const TALL_INDEXES = new Set([0, 3, 7]);

export function ProjectGallery({ images, title }: { images: string[]; title: string }) {
  const [index, setIndex] = React.useState(-1);

  const slides = images.map((src) => ({ src }));

  return (
    <>
      <div className="grid auto-rows-[180px] grid-cols-2 gap-2 sm:auto-rows-[220px] sm:gap-3 md:grid-cols-3 md:auto-rows-[260px]">
        {images.map((src, i) => (
          <button
            key={src + i}
            type="button"
            onClick={() => setIndex(i)}
            className={cn(
              "group relative overflow-hidden rounded-lg bg-muted focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2",
              TALL_INDEXES.has(i) && "row-span-2"
            )}
            aria-label={`Deschide imaginea ${i + 1} din galeria ${title} pe tot ecranul`}
          >
            <Image
              src={src}
              alt={`${title} — fotografia ${i + 1}`}
              fill
              placeholder="blur"
              blurDataURL={blurDataURL()}
              loading="lazy"
              sizes="(min-width: 768px) 33vw, 50vw"
              className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/25">
              <Expand
                className="size-5 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden
              />
            </div>
          </button>
        ))}
      </div>

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        index={index}
        slides={slides}
        plugins={[Zoom, Thumbnails, Counter]}
        animation={{ swipe: 300 }}
        carousel={{ preload: 2 }}
        zoom={{ maxZoomPixelRatio: 3, scrollToZoom: true }}
        styles={{ container: { backgroundColor: "rgba(15, 14, 13, 0.96)" } }}
      />
    </>
  );
}
