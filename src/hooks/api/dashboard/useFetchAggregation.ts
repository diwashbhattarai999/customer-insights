import { IAggregation } from '@/interfaces/dashboard/Aggregation';
import { api } from '@/lib/api-client';
import { useSuspenseQuery } from '@tanstack/react-query';

const fetchAggregation = async () => {
  const { data } = await api.get('/customers/insights');
  return data;
};

export const useFetchAggregation = () => {
  return useSuspenseQuery<IAggregation>({
    queryKey: ['aggregation'],
    queryFn: fetchAggregation,
  });
};
