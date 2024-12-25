import { ICustomerInsights } from '@/interfaces/dashboard/CustomerInsights';
import { fetchCustomerInsights } from '@/services/dashboard.service';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useFetchCustomerInsights = () => {
  return useSuspenseQuery<ICustomerInsights>({
    queryKey: ['aggregation'],
    queryFn: fetchCustomerInsights,
  });
};
