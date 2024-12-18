export interface Trends {
  customer_count_trend: Array<{ day: string; count: number }>;
  revenue_trend: Array<{ day: string; total_revenue: number }>;
}
