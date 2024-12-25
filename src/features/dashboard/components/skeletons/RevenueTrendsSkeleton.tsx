import { Skeleton } from '@/components/ui/skeleton';

export const RevenueTrendsSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-[24px] w-[150px]" />
        <Skeleton className="h-[32px] w-[180px]" />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="w-full">
            <Skeleton className="mb-4 h-[50px]" />
            <Skeleton className="mb-2 h-[32px]" />
            <Skeleton className="h-[24px] w-[80%]" />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="w-full">
            <Skeleton className="mb-4 h-[20px]" />
            <Skeleton className="h-[200px]" />
          </div>
        ))}
      </div>
    </div>
  );
};
