export interface Trends {
  customer_count: Array<{ day: string; count: number }>;
  revenue_trend: Array<{ day: string; total_revenue: number }>;
}
