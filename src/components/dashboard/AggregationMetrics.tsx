import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFetchAggregation } from '@/hooks/api/dashboard/useFetchAggregation';

const AggregationMetrics = () => {
  const { data: aggregation } = useFetchAggregation();

  const { wow_change, average_revenue, current_week_customers, last_week_customers } = aggregation;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Product Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{current_week_customers}</div>
          <p className="text-xs text-muted-foreground">Unique customers</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Last Week's Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{last_week_customers}</div>
          <p className="text-xs text-muted-foreground">Unique customers</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Week-over-Week Change</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{wow_change.toFixed(2)}%</div>
          <p className={`text-xs ${wow_change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {wow_change >= 0 ? 'Increase' : 'Decrease'} from last week
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Current Average Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${average_revenue.current.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">Per customer</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Last Week's Average Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${average_revenue.last_week.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">Per customer</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AggregationMetrics;
