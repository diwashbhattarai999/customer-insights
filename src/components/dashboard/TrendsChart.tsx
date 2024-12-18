import React from 'react';

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Trends } from '@/interfaces/Trends';

interface Props {
  trends: Trends;
}

const TrendsChart: React.FC<Props> = ({ trends }) => {
  const combinedData = trends.revenue_trend.map((revenue, index) => ({
    day: revenue.day,
    revenue: revenue.total_revenue,
    customers: trends.customer_count_trend[index]?.count || 0,
  }));

  return (
    <ChartContainer
      className="h-[300px] w-full"
      config={{
        revenue: {
          label: 'Revenue',
          color: 'hsl(var(--chart-1))',
        },
        customers: {
          label: 'Customers',
          color: 'hsl(var(--chart-2))',
        },
      }}
    >
      <ResponsiveContainer height="100%" width="100%">
        <LineChart data={combinedData} margin={{ top: 5, right: 10, left: 10, bottom: 35 }}>
          <XAxis
            angle={-45}
            axisLine={false}
            dataKey="day"
            fontSize={12}
            height={70}
            stroke="#888888"
            textAnchor="end"
            tickLine={false}
          />
          <YAxis
            axisLine={false}
            fontSize={12}
            stroke="#888888"
            tickFormatter={(value) => `$${value}`}
            tickLine={false}
            yAxisId="left"
          />
          <YAxis
            axisLine={false}
            fontSize={12}
            orientation="right"
            stroke="#888888"
            tickLine={false}
            yAxisId="right"
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            dataKey="revenue"
            strokeWidth={2}
            type="monotone"
            yAxisId="left"
            activeDot={{
              r: 6,
              style: { fill: 'var(--color-revenue)', opacity: 0.8 },
            }}
          />
          <Line
            dataKey="customers"
            strokeWidth={2}
            type="monotone"
            yAxisId="right"
            activeDot={{
              r: 6,
              style: { fill: 'var(--color-customers)', opacity: 0.8 },
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default TrendsChart;
