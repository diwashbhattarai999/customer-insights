import { Line, LineChart, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { useFetchTrends } from '@/hooks/api/dashboard/useFetchTrends';

const TrendsChart = () => {
  const { data: trends, isLoading, error } = useFetchTrends();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading trends</div>;

  // Map the revenue and customer trends data into a combined structure
  const combinedData = trends?.revenue_trends.revenue_by_period.map((revenue, index) => {
    const customerTrend = trends.customer_trends.count_trend[index];
    return {
      day: revenue.period,
      revenue: revenue.total_revenue,
      customers: customerTrend ? customerTrend.cumulative_customers : 0,
    };
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Revenue Trends</CardTitle>
      </CardHeader>
      <CardContent className="mt-20">
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
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing revenue trends for the past 7 days
        </div>
      </CardFooter>
    </Card>
  );
};

export default TrendsChart;
