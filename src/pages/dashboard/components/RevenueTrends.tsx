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
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TPeriod } from '@/interfaces/dashboard/CustomerInsights';
import { useFetchRevenueTrends } from '@/pages/dashboard/hooks/useFetchRevenueTrends';

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

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

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
        <Card>
          <CardHeader>
            <CardTitle>Customer Growth Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer height={300} width="100%">
              <LineChart
                data={trends?.customer_trends.count_trend || []}
                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="period"
                  tickFormatter={(value) => formatDate(value)}
                  label={{
                    value: 'Time Period',
                    position: 'bottom',
                    offset: -5,
                    style: { fontSize: 12, fontWeight: 'bold' },
                  }}
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
                <Tooltip
                  formatter={(value) => value.toLocaleString()}
                  labelFormatter={(value) => formatDate(value)}
                />
                <Legend align="left" verticalAlign="bottom" />
                <Line
                  dataKey="new_customers"
                  name="New Customers"
                  stroke="#8884d8"
                  type="monotone"
                  yAxisId="left"
                />
                <Line
                  dataKey="cumulative_customers"
                  name="Cumulative Customers"
                  stroke="#82ca9d"
                  type="monotone"
                  yAxisId="right"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Segment Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer height={300} width="100%">
              <PieChart>
                <Pie
                  label
                  cx="50%"
                  cy="50%"
                  data={trends?.customer_trends.segment_distribution || []}
                  dataKey="count"
                  fill="#8884d8"
                  nameKey="segment"
                  outerRadius={80}
                >
                  {trends?.customer_trends.segment_distribution.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 xl:col-span-1">
          <CardHeader>
            <CardTitle>Revenue by Period</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer height={300} width="100%">
              <BarChart
                data={trends?.revenue_trends.revenue_by_period || []}
                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="period"
                  tickFormatter={(value) => formatDate(value)}
                  label={{
                    value: 'Time Period',
                    position: 'bottom',
                    offset: -5,
                    style: { fontSize: 12, fontWeight: 'bold' },
                  }}
                />
                <YAxis
                  label={{
                    value: 'Revenue',
                    angle: -90,
                    position: 'insideLeft',
                    style: { fontSize: 12, fontWeight: 'bold' },
                  }}
                />
                <Tooltip
                  formatter={(value) => formatCurrency(value as number)}
                  labelFormatter={(value) => formatDate(value)}
                />
                <Legend align="left" verticalAlign="bottom" />
                <Bar dataKey="total_revenue" fill="#8884d8" name="Total Revenue" />
                <Bar dataKey="average_transaction" fill="#82ca9d" name="Avg Transaction" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Product Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer height={450} width="100%">
              <BarChart
                data={trends?.revenue_trends.product_performance || []}
                margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="period"
                  tickFormatter={(value) => formatDate(value)}
                  label={{
                    value: 'Time Period',
                    position: 'bottom',
                    offset: 10,
                    style: { fontSize: 14, fontWeight: 'bold' },
                  }}
                />
                <YAxis
                  yAxisId="left"
                  label={{
                    value: 'Revenue',
                    angle: -90,
                    style: { fontSize: 14, fontWeight: 'bold' },
                  }}
                />
                <YAxis
                  orientation="right"
                  yAxisId="right"
                  label={{
                    value: 'Transaction Count',
                    angle: 90,
                    style: { fontSize: 14, fontWeight: 'bold' },
                  }}
                />
                <Tooltip
                  formatter={(value) => formatCurrency(value as number)}
                  labelFormatter={(value) => formatDate(value)}
                />
                <Legend align="left" verticalAlign="bottom" />{' '}
                <Bar dataKey="revenue" fill="#8884d8" name="Revenue" yAxisId="left" />
                <Bar
                  dataKey="transaction_count"
                  fill="#82ca9d"
                  name="Transaction Count"
                  yAxisId="right"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
