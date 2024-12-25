import { ITrends } from '@/interfaces/dashboard/RevenueTrends';
import { fetchTrends } from '@/services/dashboard.service';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useFetchTrends = () => {
  return useSuspenseQuery<ITrends>({
    queryKey: ['trends'],
    queryFn: fetchTrends,
  });
};
