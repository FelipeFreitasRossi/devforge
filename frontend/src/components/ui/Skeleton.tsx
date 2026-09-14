interface SkeletonProps {
  className?: string;
}

/** Bloco cinza pulsante — use no lugar de spinners enquanto os dados carregam. */
export function Skeleton({ className = '' }: SkeletonProps) {
  return <div className={`skeleton ${className}`} aria-hidden="true" />;
}

/** Esqueleto de toda a /minha-area, com o mesmo formato do layout real. */
export function StudentAreaSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-10 md:space-y-14">
      <Skeleton className="h-48 w-full" />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
      </div>

      <Skeleton className="h-40 w-full" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Skeleton className="h-64 lg:col-span-2" />
        <Skeleton className="h-64" />
      </div>
    </div>
  );
}
