import { QUERY_KEYS } from '@/constants/queryKeys';
import { ITransaction } from '@/interfaces/customers/CustomerDetails';
import { TPeriod } from '@/interfaces/dashboard/CustomerInsights';
import { useSuspenseQuery } from '@tanstack/react-query';

import { fetchTransactions } from '../services/customer.details.service';

interface IUseFetchTransactions {
  customerId: string | number;
  period: TPeriod;
  amount: number;
  anomalous: boolean;
}

export const useFetchTransactions = ({
  customerId,
  amount,
  anomalous,
  period,
}: IUseFetchTransactions) => {
  return useSuspenseQuery<ITransaction>({
    queryKey: [QUERY_KEYS.transactions, customerId, period, amount, anomalous],
    queryFn: () => fetchTransactions({ customerId, period, amount, anomalous }),
  });
};
