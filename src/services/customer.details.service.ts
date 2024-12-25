import {
  IChurnProbability,
  IPersonalInfo,
  IProductRisk,
  IRecommendedService,
  IServiceUsed,
  ITransaction,
} from '@/interfaces/customers/CustomerDetails';
import { api } from '@/lib/api-client';

/**
 * Fetches the personal information of a customer
 * @param customerId - The ID of the customer
 * @returns {Promise<IPersonalInfo>} The personal information
 */
export const fetchPersonalInfo = async (customerId: string | number): Promise<IPersonalInfo> => {
  const { data } = await api.get<IPersonalInfo>(`/customer/${customerId}/personal_info`);
  return data;
};

/**
 * Fetches the services used by a customer
 * @param customerId - The ID of the customer
 * @returns {Promise<IServiceUsed>} The services used
 */
export const fetchServicesUsed = async (customerId: string | number): Promise<IServiceUsed> => {
  const { data } = await api.get<IServiceUsed>(`/customer/${customerId}/services_used`);
  return data;
};

/**
 * Fetches the recommended service for a customer
 * @param customerId - The ID of the customer
 * @returns {Promise<IRecommendedService>} The recommended service
 */
export const fetchRecommendedService = async (
  customerId: string | number
): Promise<IRecommendedService> => {
  const { data } = await api.get<IRecommendedService>(
    `/customer/${customerId}/recommended_service`
  );
  return data;
};

/**
 * Fetches the churn probability for a customer
 * @param customerId - The ID of the customer
 * @returns {Promise<IChurnProbability>} The churn probability
 */
export const fetchChurnProbability = async (
  customerId: string | number
): Promise<IChurnProbability> => {
  const { data } = await api.get<IChurnProbability>(`/customer/${customerId}/churn_probability`);
  return data;
};

/**
 * Fetches the transactions of a customer
 * @param customerId - The ID of the customer
 * @returns {Promise<ITransaction>} The transactions
 */
export const fetchTransactions = async (customerId: string | number): Promise<ITransaction> => {
  const { data } = await api.get<ITransaction>(`/customer/${customerId}/transactions`);
  return data;
};

/**
 * Fetches the product risk for a customer
 * @param customerId - The ID of the customer
 * @returns {Promise<IProductRisk>} The product risk
 */
export const fetchProductRisk = async (customerId: string | number): Promise<IProductRisk> => {
  const { data } = await api.get<IProductRisk>(`/customer/${customerId}/product_risk`);
  return data;
};
