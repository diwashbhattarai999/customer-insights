import { useState } from 'react';

import { format } from 'date-fns';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { useTheme } from '@/components/theme-provider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useFetchRevenueTrends } from '@/features/dashboard/hooks/useFetchRevenueTrends';
import { TPeriod } from '@/interfaces/dashboard/CustomerInsights';

export const RevenueTrends = () => {
  const [selectedPeriod, setSelectedPeriod] = useState<TPeriod>('month');
  const { data: trends } = useFetchRevenueTrends({ period: selectedPeriod });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMMM dd, yyyy');
  };

  const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))'];

  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-medium">Revenue Trends</h2>
        <Select
          value={selectedPeriod}
          onValueChange={(value) => {
            setSelectedPeriod(value as 'day' | 'week' | 'month');
          }}
        >
          <SelectTrigger className="w-fit sm:w-[180px]">
            <SelectValue placeholder="Select Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Cards Section */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {/* Total Customers */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {trends?.summary.total_customers.toLocaleString() || 'Loading...'}
            </div>
          </CardContent>
        </Card>

        {/* Total Revenue */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(trends?.summary.total_revenue || 0)}
            </div>
          </CardContent>
        </Card>

        {/* Avg Transaction */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Transaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(trends?.summary.average_transaction || 0)}
            </div>
          </CardContent>
        </Card>

        {/* Anomaly Rate */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Anomaly Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatPercentage(trends?.summary.anomaly_rate || 0)}
            </div>
          </CardContent>
        </Card>

        {/* Revenue Growth */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {formatPercentage(trends?.summary.revenue_growth || 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
        {/* Customer Growth Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Growth Trend</CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            <ChartContainer
              className="size-full"
              config={{
                new_customers: {
                  label: 'New Customers',
                  color: 'hsl(var(--chart-1))',
                },
                cumulative_customers: {
                  label: 'Cumulative Customers',
                  color: 'hsl(var(--chart-2))',
                },
              }}
            >
              <LineChart
                data={trends?.customer_trends.count_trend || []}
                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="period"
                  label={{ value: 'Time Period', position: 'bottom' }}
                  tickFormatter={(value) => formatDate(value)}
                  tickMargin={8}
                />
                <YAxis
                  yAxisId="left"
                  label={{
                    value: 'New Customers',
                    angle: -90,
                    style: { fontSize: 12, fontWeight: 'bold' },
                  }}
                />
                <YAxis
                  orientation="right"
                  yAxisId="right"
                  label={{
                    value: 'Cumulative Customers',
                    angle: 90,
                    style: { fontSize: 12, fontWeight: 'bold' },
                  }}
                />
                <ChartTooltip
                  content={<ChartTooltipContent />}
                  labelFormatter={(value) => formatDate(value)}
                />
                <Line
                  dataKey="new_customers"
                  dot={false}
                  name="New Customers"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                  yAxisId="left"
                />
                <Line
                  dataKey="cumulative_customers"
                  dot={false}
                  name="Cumulative Customers"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                  yAxisId="right"
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Segment Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer className="h-[300px] w-full" config={{}}>
              <PieChart>
                <Pie
                  label
                  cx="50%"
                  cy="50%"
                  data={trends?.customer_trends.segment_distribution || []}
                  dataKey="count"
                  nameKey="segment"
                  outerRadius={80}
                >
                  {trends?.customer_trends.segment_distribution.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Revenue by Period */}
        <Card className="lg:col-span-2 xl:col-span-1">
          <CardHeader>
            <CardTitle>Revenue by Period</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer className="h-[300px] w-full" config={{}}>
              <LineChart
                data={trends?.revenue_trends.revenue_by_period || []}
                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="period"
                  label={{ value: 'Time Period', position: 'bottom' }}
                  tickFormatter={(value) => formatDate(value)}
                />
                <YAxis
                  label={{
                    value: 'Revenue',
                    angle: -90,
                    style: { fontSize: 12, fontWeight: 'bold' },
                  }}
                />
                <Tooltip
                  content={<ChartTooltipContent />}
                  cursor={{ fill: isDark ? '#ffffff10' : '#00000010' }}
                  labelFormatter={(value) => formatDate(value)}
                />
                <Legend align="left" verticalAlign="bottom" />

                <Line
                  dataKey="total_revenue"
                  dot={false}
                  name="Total Revenue"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                />
                <Line
                  dataKey="average_transaction"
                  dot={false}
                  name="Avg Transaction"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Product Performance */}
        <Card className="xl:col-span-3">
          <CardHeader>
            <CardTitle>Product Performance</CardTitle>
          </CardHeader>
          <CardContent className="w-full">
            <ChartContainer
              className="h-[450px] w-full"
              config={{
                product__category: {
                  label: 'Product Category',
                  color: 'hsl(var(--chart-1))',
                },
                revenue: {
                  label: 'Total Revenue',
                  color: 'hsl(var(--chart-2))',
                },
                transaction_count: {
                  label: 'Transaction Count',
                  color: 'hsl(var(--chart-3))',
                },
              }}
            >
              <BarChart
                data={trends?.revenue_trends.product_performance || []}
                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />

                {/* X-Axis with both Date and Category */}
                <XAxis
                  dataKey="period"
                  tickFormatter={(value, index) => {
                    // Format the label to show date and category together
                    const category =
                      trends?.revenue_trends.product_performance[index]?.product__category || '';
                    return `${formatDate(value)} - ${category}`;
                  }}
                />

                <YAxis
                  label={{
                    value: 'Revenue & Transaction Count',
                    angle: -90,
                    position: 'insideLeft',
                  }}
                />

                {/* Custom Tooltip with Category, Date, Revenue, and Transaction Count */}
                <Tooltip
                  content={(props) => {
                    const { active, payload } = props;
                    if (active && payload && payload.length) {
                      const { period, product__category, revenue, transaction_count } =
                        payload[0].payload;
                      return (
                        <div className="rounded-md bg-white p-2 shadow-md">
                          <div>
                            <strong>Period:</strong> {formatDate(period)}
                          </div>
                          <div>
                            <strong>Category:</strong> {product__category}
                          </div>
                          <div>
                            <strong>Revenue:</strong> {formatCurrency(revenue)}
                          </div>
                          <div>
                            <strong>Transaction Count:</strong> {transaction_count}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />

                {/* Custom Legend */}
                <ChartLegend
                  align="left"
                  content={() => (
                    <div className="flex space-x-2">
                      <div className="flex items-center">
                        <div
                          className="mr-1 h-3 w-3"
                          style={{
                            backgroundColor: 'hsl(var(--chart-2))', // Color for Revenue
                          }}
                        ></div>
                        <span>Revenue</span>
                      </div>
                      <div className="flex items-center">
                        <div
                          className="mr-1 h-3 w-3"
                          style={{
                            backgroundColor: 'hsl(var(--chart-3))', // Color for Transaction Count
                          }}
                        ></div>
                        <span>Transaction Count</span>
                      </div>
                    </div>
                  )}
                />

                {/* Render stacked Bar for each period */}
                {['revenue', 'transaction_count'].map((key, index) => (
                  <Bar
                    key={key}
                    dataKey={key}
                    fill={`hsl(var(--chart-${index + 2}))`}
                    name={key === 'revenue' ? 'Revenue' : 'Transaction Count'}
                    stackId="stack"
                  />
                ))}
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
