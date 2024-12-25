export interface ICustomerInsights {
  wow_change: number;
  average_revenue: {
    current: number;
    last_week: number;
    revenue_change_percentage: number;
  };
  current_week_customers: number;
  last_week_customers: number;
}
