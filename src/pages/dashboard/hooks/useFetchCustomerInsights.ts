import { QUERY_KEYS } from '@/constants/queryKeys';
import { ICustomerInsights, TPeriod } from '@/interfaces/dashboard/CustomerInsights';
import { fetchCustomerInsights } from '@/pages/dashboard/services/dashboard.service';
import { useSuspenseQuery } from '@tanstack/react-query';

interface IUseFetchCustomerInsights {
  period?: TPeriod;
}

export const useFetchCustomerInsights = ({ period }: IUseFetchCustomerInsights) => {
  return useSuspenseQuery<ICustomerInsights>({
    queryKey: [QUERY_KEYS.customerInsights, period],
    queryFn: () => fetchCustomerInsights({ period }),
  });
};
