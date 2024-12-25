import { QUERY_KEYS } from '@/constants/queryKeys';
import { fetchCustomers } from '@/features/dashboard/services/dashboard.service';
import { ICustomer, TSegment } from '@/interfaces/dashboard/Customer';
import { useSuspenseQuery } from '@tanstack/react-query';

interface IUseFetchCustomers {
  segment?: TSegment;
}

export const useFetchCustomers = ({ segment }: IUseFetchCustomers) => {
  return useSuspenseQuery<ICustomer>({
    queryKey: [QUERY_KEYS.customers, segment],
    queryFn: () => fetchCustomers({ segment }),
  });
};
