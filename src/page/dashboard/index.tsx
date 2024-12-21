import {
  AggregationMetrics,
  CustomersList,
  ProductUsageChart,
  TrendsChart,
} from '@/components/dashboard';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Aggregation */}
      <AggregationMetrics />

      <div className="flex flex-col gap-6 2xl:flex-row">
        {/* Revenue Trends */}
        <TrendsChart />

        {/* Product Usage */}
        <ProductUsageChart />
      </div>

      {/* Customrer Table */}
      <CustomersList />
    </div>
  );
};

export default Dashboard;
