import { ICustomer, TSegment } from '@/interfaces/dashboard/Customer';
import { ICustomerInsights, TPeriod } from '@/interfaces/dashboard/CustomerInsights';
import { IProductUsage } from '@/interfaces/dashboard/ProductUsage';
import { IRevenueTrends } from '@/interfaces/dashboard/RevenueTrends';
import { api } from '@/lib/api-client';

/**
 * Fetches the customers from the API
 * @returns {Promise<Array<ICustomerDetails>>} The customers
 */
export const fetchCustomers = async ({ segment }: { segment?: TSegment }): Promise<ICustomer> => {
  const { data } = await api.get<ICustomer>('/customers', { params: { segment } });
  return data;
};

/**
 * Fetches the customer insights from the API
 * @returns {Promise<ICustomerInsights>} The customer insights
 */
export const fetchCustomerInsights = async ({
  period,
}: {
  period?: TPeriod;
}): Promise<ICustomerInsights> => {
  const { data } = await api.get<ICustomerInsights>('/customers/insights', { params: { period } });
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
 * @returns {Promise<IRevenueTrends>} The revenue trends
 */
export const fetchRevenueTrends = async ({
  period,
}: {
  period?: TPeriod;
}): Promise<IRevenueTrends> => {
  const { data } = await api.get<IRevenueTrends>('/revenue/trends', { params: { period } });
  return data;
};
