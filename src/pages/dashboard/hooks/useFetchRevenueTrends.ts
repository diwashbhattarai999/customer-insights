import { QUERY_KEYS } from '@/constants/queryKeys';
import { TPeriod } from '@/interfaces/dashboard/CustomerInsights';
import { IRevenueTrends } from '@/interfaces/dashboard/RevenueTrends';
import { fetchRevenueTrends } from '@/pages/dashboard/services/dashboard.service';
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
