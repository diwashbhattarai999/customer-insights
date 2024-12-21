export interface IAggregation {
  wow_change: number;
  average_revenue: {
    current: number;
    last_week: number;
  };
  current_week_customers: number;
  last_week_customers: number;
}
