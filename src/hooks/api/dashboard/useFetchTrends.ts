import { ITrends } from '@/interfaces/dashboard/Trends';
import { api } from '@/lib/api-client';
import { useSuspenseQuery } from '@tanstack/react-query';

const fetchTrends = async () => {
  const { data } = await api.get('/revenue/trends');
  return data;
};

export const useFetchTrends = () => {
  return useSuspenseQuery<ITrends>({
    queryKey: ['trends'],
    queryFn: fetchTrends,
  });
};
