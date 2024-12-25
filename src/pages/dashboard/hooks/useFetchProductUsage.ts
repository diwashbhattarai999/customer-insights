import { IProductUsage } from '@/interfaces/dashboard/ProductUsage';
import { fetchProductUsage } from '@/pages/dashboard/services/dashboard.service';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useFetchProductUsage = () => {
  return useSuspenseQuery<IProductUsage>({
    queryKey: ['product-usage'],
    queryFn: fetchProductUsage,
  });
};
