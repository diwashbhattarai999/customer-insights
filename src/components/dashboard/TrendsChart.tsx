import React from "react";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Trends } from "@/interfaces/Trends";

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
      config={{
        revenue: {
          label: "Revenue",
          color: "hsl(var(--chart-1))",
        },
        customers: {
          label: "Customers",
          color: "hsl(var(--chart-2))",
        },
      }}
      className="w-full h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={combinedData}
          margin={{ top: 5, right: 10, left: 10, bottom: 35 }}
        >
          <XAxis
            dataKey="day"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            angle={-45}
            textAnchor="end"
            height={70}
          />
          <YAxis
            yAxisId="left"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `$${value}`}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="revenue"
            strokeWidth={2}
            activeDot={{
              r: 6,
              style: { fill: "var(--color-revenue)", opacity: 0.8 },
            }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="customers"
            strokeWidth={2}
            activeDot={{
              r: 6,
              style: { fill: "var(--color-customers)", opacity: 0.8 },
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default TrendsChart;
