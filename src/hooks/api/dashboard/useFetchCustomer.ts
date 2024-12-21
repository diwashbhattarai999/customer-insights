import { ICustomer } from '@/interfaces/dashboard/Customer';
import { api } from '@/lib/api-client';
import { useSuspenseQuery } from '@tanstack/react-query';

const fetchCustomers = async () => {
  const { data } = await api.get('/customers');
  return data;
};

export const useFetchCustomers = () => {
  return useSuspenseQuery<Array<ICustomer>>({
    queryKey: ['customers'],
    queryFn: fetchCustomers,
  });
};
