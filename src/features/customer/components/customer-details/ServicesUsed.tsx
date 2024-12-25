'use client';

import { TrendingUp } from 'lucide-react';
import { Label, Pie, PieChart, Sector } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { IServiceUsed } from '@/interfaces/customers/CustomerDetails';

const COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
];

const ServicesUsed = ({ deposits, loans, mobile_banking }: IServiceUsed) => {
  const chartData = [
    {
      name: 'Mobile Banking',
      value: mobile_banking.active_devices,
      fill: COLORS[0],
    },
    {
      name: 'Loans',
      value: loans.length,
      fill: COLORS[1],
    },
    {
      name: 'Fixed Deposits',
      value: deposits.fixed,
      fill: COLORS[2],
    },
    {
      name: 'Savings',
      value: deposits.savings,
      fill: COLORS[3],
    },
  ];

  return (
    <Card className="flex flex-col bg-muted/50">
      <CardHeader className="pb-0">
        <CardTitle>Services Used</CardTitle>
        <CardDescription>Service Usage Overview</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col md:flex-row">
        {/* Pie Chart */}
        <ChartContainer className="mx-auto aspect-square max-h-[250px] md:w-1/2" config={{}}>
          <PieChart height={250} width={250}>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} cursor={false} />
            <Pie
              data={chartData}
              dataKey="value"
              innerRadius={60}
              nameKey="name"
              outerRadius={80}
              strokeWidth={5}
              activeShape={({ outerRadius = 0, ...props }) => (
                <Sector {...props} outerRadius={outerRadius + 10} />
              )}
            >
              {chartData.map((entry, index) => (
                <Label key={`label-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>

        {/* Indicators */}
        <div className="flex flex-col justify-center gap-4 p-4 md:w-1/2">
          {chartData.map((entry) => (
            <div key={entry.name} className="flex items-center">
              <div
                className="mr-3 h-4 w-4 rounded-full"
                style={{ backgroundColor: entry.fill }}
              ></div>
              <div>
                <span className="font-medium">{entry.name}:</span>{' '}
                <span className="text-muted-foreground">{entry.value}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing services data usage statistics.
        </div>
      </CardFooter>
    </Card>
  );
};

export default ServicesUsed;
