'use client';

import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, XAxis, YAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useFetchProductUsage } from '@/pages/dashboard/hooks/useFetchProductUsage';

const chartConfig = {
  users: {
    label: 'Users',
    color: 'hsl(var(--chart-1))',
  },
  'Student Loan': {
    label: 'Student Loan',
    color: 'hsl(var(--chart-1))',
  },
  'Savings Plan': {
    label: 'Savings Plan',
    color: 'hsl(var(--chart-2))',
  },
  'Savings Account': {
    label: 'Savings Account',
    color: 'hsl(var(--chart-3))',
  },
  'Personal Loan': {
    label: 'Personal Loan',
    color: 'hsl(var(--chart-4))',
  },
  'Mobile Banking': {
    label: 'Mobile Banking',
    color: 'hsl(var(--chart-5))',
  },
  'Home Loan': {
    label: 'Home Loan',
    color: 'hsl(var(--chart-6))',
  },
  'Fixed Deposit': {
    label: 'Fixed Deposit',
    color: 'hsl(var(--chart-7))',
  },
  'Credit Card': {
    label: 'Credit Card',
    color: 'hsl(var(--chart-8))',
  },
  'Car Loan': {
    label: 'Car Loan',
    color: 'hsl(var(--chart-9))',
  },
  'Business Loan': {
    label: 'Business Loan',
    color: 'hsl(var(--chart-10))',
  },
} satisfies ChartConfig;

const ProductUsage = () => {
  const { data: usageData, isLoading, error } = useFetchProductUsage();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading product usage data</div>;

  const chartData = Object.entries(usageData).map(([name, value]) => ({
    product: name,
    users: value,
    fill: chartConfig[name as keyof typeof chartConfig].color,
  }));

  const totalUsers = chartData.reduce((sum, item) => sum + item.users, 0);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Product Usage Distribution</CardTitle>
        <CardDescription>Current Period</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          className="[&_.recharts-cartesian-axis-tick-value]:whitespace-nowrap"
          config={chartConfig}
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
              right: 30,
              top: 5,
              bottom: 5,
            }}
          >
            <YAxis
              axisLine={false}
              dataKey="product"
              tickFormatter={(value) => chartConfig[value as keyof typeof chartConfig]?.label}
              tickLine={false}
              tickMargin={10}
              type="category"
              width={110}
            />
            <XAxis hide dataKey="users" type="number" />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} cursor={false} />
            <Bar dataKey="users" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Total Users: {totalUsers} <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing distribution of users across all products
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductUsage;
