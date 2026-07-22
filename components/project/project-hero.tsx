import Image from "next/image";
import { blurDataURL } from "@/lib/placeholder";

export function ProjectHero({ image, title }: { image: string; title: string }) {
  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-muted sm:aspect-[21/9]">
      <Image
        src={image}
        alt={title}
        fill
        priority
        placeholder="blur"
        blurDataURL={blurDataURL(1400, 700)}
        sizes="(min-width: 1280px) 1200px, 100vw"
        className="object-cover"
      />
    </div>
  );
}
