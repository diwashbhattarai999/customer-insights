import React from 'react';

import AggregationMetrics from '@/components/dashboard/AggregationMetrics';
import CustomersList from '@/components/dashboard/CustomerList';
import TrendsChart from '@/components/dashboard/TrendsChart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFetchAggregation } from '@/hooks/api/useFetchAggregation';
import { useFetchCustomers } from '@/hooks/api/useFetchCustomer';
import { useFetchTrends } from '@/hooks/api/useFetchTrends';

const Dashboard: React.FC = () => {
  const {
    data: customers,
    isLoading: isCustomerLoading,
    error: isCustomerError,
  } = useFetchCustomers();

  const {
    data: aggregation,
    isLoading: isAggregationLoading,
    error: isAggregationError,
  } = useFetchAggregation();

  const { data: trends, isLoading: isTrendsLoading, error: isTrendsError } = useFetchTrends();

  if (isCustomerLoading || isAggregationLoading || isTrendsLoading) {
    return <div>Loading...</div>;
  }

  if (isCustomerError || isAggregationError || isTrendsError) {
    return <div>Error...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <AggregationMetrics aggregation={aggregation} />
      <div className="flex gap-6">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Revenue Trends</CardTitle>
          </CardHeader>
          <CardContent className="mt-20">
            <TrendsChart trends={trends} />
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Customer Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <CustomersList customers={customers} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
