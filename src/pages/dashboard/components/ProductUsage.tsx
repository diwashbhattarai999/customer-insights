'use client';

import { TrendingUp } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { useFetchProductUsage } from '@/pages/dashboard/hooks/useFetchProductUsage';

export const ProductUsage = () => {
  const { data: usageData } = useFetchProductUsage();

  const chartData = Object.entries(usageData ?? {})
    .map(([name, value]) => ({
      name,
      usage: value,
    }))
    .sort((a, b) => b.usage - a.usage);

  const totalUsers = chartData.reduce((acc, { usage }) => acc + usage, 0);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Product Usage Distribution</CardTitle>
        <CardDescription>Current Period</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          className="[&_.recharts-cartesian-axis-tick-value]:whitespace-nowrap"
          config={{}}
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: 0,
              right: 50,
              top: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis
              axisLine={false}
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              type="category"
              width={150}
            />
            <Tooltip content={<ChartTooltipContent />} />
            <Legend />
            <XAxis hide dataKey="usage" type="number" />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} cursor={false} />
            <Bar dataKey="usage" fill="#8884d895" radius={5} />
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
