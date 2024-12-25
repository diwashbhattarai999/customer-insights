export interface ITrends {
  period: string;
  summary: {
    total_customers: number;
    total_revenue: number;
    average_transaction: number;
    anomaly_rate: number;
    revenue_growth: number;
  };
  customer_trends: {
    count_trend: Array<{
      period: string;
      new_customers: number;
      cumulative_customers: number;
    }>;
    segment_distribution: Array<{
      segment: 'Barely' | 'High' | 'Low';
      period: string;
      count: number;
    }>;
  };
  revenue_trends: {
    revenue_by_period: Array<{
      period: string;
      total_revenue: number;
      average_transaction: number;
      transaction_count: number;
      anomaly_count: number;
    }>;
    product_performance: Array<{
      product__category: 'Banking' | 'Deposit' | 'Loan';
      period: string;
      revenue: number;
      transaction_count: number;
    }>;
  };
}
