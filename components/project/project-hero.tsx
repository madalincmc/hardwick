import Image from "next/image";
import { blurDataURL } from "@/lib/placeholder";

interface ProjectHeroProps {
  image: string;
  title: string;
  category: string;
  location: string;
}

export function ProjectHero({ image, title, category, location }: ProjectHeroProps) {
  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-muted sm:aspect-[21/9]">
      <Image
        src={image}
        alt={`${title} — mobilă la comandă, ${category}, ${location}`}
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
