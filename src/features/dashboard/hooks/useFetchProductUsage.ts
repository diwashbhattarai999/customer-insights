import { QUERY_KEYS } from '@/constants/queryKeys';
import { fetchProductUsage } from '@/features/dashboard/services/dashboard.service';
import { IProductUsage } from '@/interfaces/dashboard/ProductUsage';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useFetchProductUsage = () => {
  return useSuspenseQuery<IProductUsage>({
    queryKey: [QUERY_KEYS.productUsage],
    queryFn: fetchProductUsage,
  });
};
