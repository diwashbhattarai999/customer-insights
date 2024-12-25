import { QUERY_KEYS } from '@/constants/queryKeys';
import { fetchRevenueTrends } from '@/features/dashboard/services/dashboard.service';
import { TPeriod } from '@/interfaces/dashboard/CustomerInsights';
import { IRevenueTrends } from '@/interfaces/dashboard/RevenueTrends';
import { useSuspenseQuery } from '@tanstack/react-query';

interface IUseFetchRevenueTrends {
  period?: TPeriod;
}

export const useFetchRevenueTrends = ({ period }: IUseFetchRevenueTrends) => {
  return useSuspenseQuery<IRevenueTrends>({
    queryKey: [QUERY_KEYS.revenueTrends, period],
    queryFn: () => fetchRevenueTrends({ period }),
  });
};
