import { useState } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useFetchCustomerInsights } from '@/features/dashboard/hooks/useFetchCustomerInsights';
import { TPeriod } from '@/interfaces/dashboard/CustomerInsights';

export const CustomerInsightsCards = () => {
  const [period, setPeriod] = useState<TPeriod>('week');
  const { data: insights } = useFetchCustomerInsights({ period });

  const { wow_change, average_revenue, current_period_customers, last_period_customers } = insights;
  const { current, last_period, revenue_change_percentage } = average_revenue;

  const formatPercentage = (value: number | null) =>
    value === null ? 'N/A' : `${value.toFixed(2)}%`;

  const formatCurrency = (value: number | null) =>
    value === null ? 'N/A' : `$${value.toFixed(2)}`;

  const getPeriod = () => {
    switch (period) {
      case 'day':
        return 'Today';
      case 'week':
        return 'Week';
      case 'month':
        return 'Month';
      case 'year':
        return 'Year';
      default:
        return 'N/A';
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-row items-center justify-between gap-4">
        <h2 className="text-center font-semibold text-secondary-foreground sm:text-xl md:text-left md:text-2xl">
          Customer Insights
        </h2>
        <Select
          value={period}
          onValueChange={(value) => {
            setPeriod(value as TPeriod);
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

      {/* Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        <Card className="flex flex-col justify-between bg-blue-100">
          <CardHeader>
            <CardTitle>
              Revenue {getPeriod() === 'Today' ? 'Today' : `This ${getPeriod()}`}
            </CardTitle>
            <CardDescription>
              Performance
              {getPeriod() === 'Today' ? ' for ' : ' This '}
              {getPeriod()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">{formatCurrency(current)}</div>
          </CardContent>
        </Card>

        <Card className="flex flex-col justify-between bg-gray-100">
          <CardHeader>
            <CardTitle>
              {/* Last Period Revenue */}
              Revenue {getPeriod() === 'Today' ? 'Yesterday' : `Last ${getPeriod()}`}
            </CardTitle>
            <CardDescription>Performance Last {getPeriod()}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-700">{formatCurrency(last_period)}</div>
          </CardContent>
        </Card>

        <Card className="flex flex-col justify-between bg-green-100">
          <CardHeader>
            <CardTitle>WoW Change</CardTitle>
            <CardDescription>Week-on-Week Customer Growth</CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${
                wow_change !== null && wow_change > 0
                  ? 'text-green-700'
                  : wow_change < 0
                    ? 'text-red-700'
                    : ''
              }`}
            >
              {formatPercentage(wow_change)}
            </div>
          </CardContent>
        </Card>

        <Card className="flex flex-col justify-between bg-purple-100">
          <CardHeader>
            <CardTitle>Revenue Change Percentage</CardTitle>
            <CardDescription>
              Compared to
              {getPeriod() === 'Today' ? '' : ' This '}
              {getPeriod()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className={`text-2xl font-bold ${
                revenue_change_percentage !== null && revenue_change_percentage > 0
                  ? 'text-green-700'
                  : revenue_change_percentage < 0
                    ? 'text-red-700'
                    : ''
              }`}
            >
              {formatPercentage(revenue_change_percentage)}
            </div>
          </CardContent>
        </Card>

        <Card className="flex flex-col justify-between bg-yellow-100">
          <CardHeader>
            <CardTitle>Period Customers</CardTitle>
            <CardDescription>Current vs Last {getPeriod()}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-yellow-700">
              Current: {current_period_customers}
            </div>
            <div className="text-xl font-bold text-yellow-600">Last: {last_period_customers}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
