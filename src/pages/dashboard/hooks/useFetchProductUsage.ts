import { QUERY_KEYS } from '@/constants/queryKeys';
import { IProductUsage } from '@/interfaces/dashboard/ProductUsage';
import { fetchProductUsage } from '@/pages/dashboard/services/dashboard.service';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useFetchProductUsage = () => {
  return useSuspenseQuery<IProductUsage>({
    queryKey: [QUERY_KEYS.productUsage],
    queryFn: fetchProductUsage,
  });
};
