export interface ICustomerInsights {
  wow_change: number;
  average_revenue: {
    current: number;
    last_period: number;
    revenue_change_percentage: number;
  };
  current_period_customers: number;
  last_period_customers: number;
}

export type TPeriod = 'day' | 'week' | 'month' | 'year' | 'all';
