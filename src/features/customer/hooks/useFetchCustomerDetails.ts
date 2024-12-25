import {
  fetchChurnProbability,
  fetchPersonalInfo,
  fetchProductRisk,
  fetchRecommendedService,
  fetchServicesUsed,
} from '@/features/customer/services/customer.details.service';
import {
  IChurnProbability,
  IPersonalInfo,
  IProductRisk,
  IRecommendedService,
  IServiceUsed,
} from '@/interfaces/customers/CustomerDetails';
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
    isLoadingProductRisk,
  ].some((loading) => loading);

  const error =
    errorPersonalInfo ||
    errorServicesUsed ||
    errorRecommendedService ||
    errorChurnProbability ||
    errorProductRisk;

  // Combine all data
  const data = {
    personalInfo,
    servicesUsed,
    recommendedService,
    churnProbability,
    productRisk,
  };

  return { data, isLoading, error };
};
