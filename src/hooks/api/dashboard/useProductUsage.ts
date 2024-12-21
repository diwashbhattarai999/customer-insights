import { IProductUsage } from '@/interfaces/dashboard/ProductUsage';
import { api } from '@/lib/api-client';
import { useSuspenseQuery } from '@tanstack/react-query';

const fetchProductUsage = async () => {
  const { data } = await api.get('/products/usage');
  return data;
};

export const useProductUsage = () => {
  return useSuspenseQuery<IProductUsage>({
    queryKey: ['product-usage'],
    queryFn: fetchProductUsage,
  });
};
