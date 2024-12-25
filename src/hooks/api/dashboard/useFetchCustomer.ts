import { ICustomer } from '@/interfaces/dashboard/Customer';
import { fetchCustomers } from '@/services/dashboard.service';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useFetchCustomers = () => {
  return useSuspenseQuery<ICustomer>({
    queryKey: ['customers'],
    queryFn: fetchCustomers,
  });
};
