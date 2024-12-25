import { ICustomer } from '@/interfaces/dashboard/Customer';
import { ICustomerInsights } from '@/interfaces/dashboard/CustomerInsights';
import { IProductUsage } from '@/interfaces/dashboard/ProductUsage';
import { ITrends } from '@/interfaces/dashboard/RevenueTrends';
import { api } from '@/lib/api-client';

/**
 * Fetches the customers from the API
 * @returns {Promise<Array<ICustomerDetails>>} The customers
 */
export const fetchCustomers = async (): Promise<ICustomer> => {
  const { data } = await api.get<ICustomer>('/customers');
  return data;
};

/**
 * Fetches the customer insights from the API
 * @returns {Promise<ICustomerInsights>} The customer insights
 */
export const fetchCustomerInsights = async (): Promise<ICustomerInsights> => {
  const { data } = await api.get<ICustomerInsights>('/customers/insights');
  return data;
};

/**
 * Fetches the product usage from the API
 * @returns {Promise<IProductUsage>} The product usage
 */
export const fetchProductUsage = async (): Promise<IProductUsage> => {
  const { data } = await api.get<IProductUsage>('/products/usage');
  return data;
};

/**
 * Fetches the revenue trends from the API
 * @returns {Promise<ITrends>} The revenue trends
 */
export const fetchTrends = async (): Promise<ITrends> => {
  const { data } = await api.get<ITrends>('/revenue/trends');
  return data;
};
