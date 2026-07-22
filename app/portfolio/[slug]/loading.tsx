import { Skeleton } from "@/components/ui/skeleton";

export default function ProjectLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-28 pb-24 sm:px-6 lg:px-8 lg:pt-36 lg:pb-32">
      <Skeleton className="h-4 w-56" />
      <Skeleton className="mt-6 aspect-[16/9] w-full rounded-2xl sm:aspect-[21/9]" />

      <div className="mt-12 grid gap-10 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-9 w-2/3" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <Skeleton className="h-48 w-full rounded-lg" />
      </div>

      <div className="mt-16 grid auto-rows-[220px] grid-cols-2 gap-3 md:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-full w-full rounded-lg" />
        ))}
      </div>
    </div>
  );
}
