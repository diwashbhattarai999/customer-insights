export interface Aggregation {
  product_usage: Record<string, number>;
  wow_change: number;
  average_revenue: {
    current: number;
    last_week: number;
  };
}
