import { QUERY_KEYS } from '@/constants/queryKeys';
import { fetchCustomers } from '@/features/dashboard/services/dashboard.service';
import { ICustomer, TSegment } from '@/interfaces/dashboard/Customer';
import { TPeriod } from '@/interfaces/dashboard/CustomerInsights';
import { useSuspenseQuery } from '@tanstack/react-query';

interface IUseFetchCustomers {
  segment?: TSegment;
  customer_name?: string;
  period?: Exclude<TPeriod, 'year'>;
}

export const useFetchCustomers = ({ segment, customer_name, period }: IUseFetchCustomers) => {
  return useSuspenseQuery<ICustomer>({
    queryKey: [QUERY_KEYS.customers, segment, customer_name, period],
    queryFn: () => fetchCustomers({ segment, customer_name, period }),
  });
};
