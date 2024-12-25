import {
  IChurnProbability,
  IPersonalInfo,
  IProductRisk,
  IRecommendedService,
  IServiceUsed,
  ITransaction,
} from '@/interfaces/customers/CustomerDetails';
import {
  fetchChurnProbability,
  fetchPersonalInfo,
  fetchProductRisk,
  fetchRecommendedService,
  fetchServicesUsed,
  fetchTransactions,
} from '@/services/customer.details.service';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useFetchCustomerDetails = (customerId: string | number) => {
  const {
    data: personalInfo,
    isLoading: isLoadingPersonalInfo,
    error: errorPersonalInfo,
  } = useSuspenseQuery<IPersonalInfo>({
    queryKey: ['customer', customerId, 'personal_info'],
    queryFn: () => fetchPersonalInfo(customerId),
  });

  const {
    data: servicesUsed,
    isLoading: isLoadingServicesUsed,
    error: errorServicesUsed,
  } = useSuspenseQuery<IServiceUsed>({
    queryKey: ['customer', customerId, 'services_used'],
    queryFn: () => fetchServicesUsed(customerId),
  });

  const {
    data: recommendedService,
    isLoading: isLoadingRecommendedService,
    error: errorRecommendedService,
  } = useSuspenseQuery<IRecommendedService>({
    queryKey: ['customer', customerId, 'recommended_service'],
    queryFn: () => fetchRecommendedService(customerId),
  });

  const {
    data: churnProbability,
    isLoading: isLoadingChurnProbability,
    error: errorChurnProbability,
  } = useSuspenseQuery<IChurnProbability>({
    queryKey: ['customer', customerId, 'churn_probability'],
    queryFn: () => fetchChurnProbability(customerId),
  });

  const {
    data: transactions,
    isLoading: isLoadingTransactions,
    error: errorTransactions,
  } = useSuspenseQuery<ITransaction>({
    queryKey: ['customer', customerId, 'transactions'],
    queryFn: () => fetchTransactions(customerId),
  });

  const {
    data: productRisk,
    isLoading: isLoadingProductRisk,
    error: errorProductRisk,
  } = useSuspenseQuery<IProductRisk>({
    queryKey: ['customer', customerId, 'product_risk'],
    queryFn: () => fetchProductRisk(customerId),
  });

  // Combine the loading and error states
  const isLoading = [
    isLoadingPersonalInfo,
    isLoadingServicesUsed,
    isLoadingRecommendedService,
    isLoadingChurnProbability,
    isLoadingTransactions,
    isLoadingProductRisk,
  ].some((loading) => loading);

  const error =
    errorPersonalInfo ||
    errorServicesUsed ||
    errorRecommendedService ||
    errorChurnProbability ||
    errorTransactions ||
    errorProductRisk;

  // Combine all data
  const data = {
    personalInfo,
    servicesUsed,
    recommendedService,
    churnProbability,
    transactions,
    productRisk,
  };

  return { data, isLoading, error };
};
