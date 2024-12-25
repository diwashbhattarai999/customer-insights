import { Suspense } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  CustomerInsightsCards,
  CustomersList,
  ProductUsage,
  RevenueTrends,
} from '@/features/dashboard/components';
import {
  CustomerInsightsSkeleton,
  CustomerListSkeleton,
  RevenueTrendsSkeleton,
} from '@/features/dashboard/components/skeletons';

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-bold text-secondary-foreground sm:text-xl">
        Welcome back, <span className="text-secondary-foreground/90"> Diwash Bhattarai</span>
      </h1>

      {/* Customer Insights */}
      <Suspense fallback={<CustomerInsightsSkeleton />}>
        <CustomerInsightsCards />
      </Suspense>

      {/* Detailed Tabs */}
      <Tabs defaultValue="revenue">
        <TabsList className="flex w-fit justify-center">
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="product-usage">Product Usage</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue">
          {/* Revenue Trends */}
          <Suspense fallback={<RevenueTrendsSkeleton />}>
            <RevenueTrends />
          </Suspense>
        </TabsContent>

        {/* Customers List */}
        <TabsContent value="customers">
          <Suspense fallback={<CustomerListSkeleton />}>
            <CustomersList />
          </Suspense>
        </TabsContent>

        {/* Product Usage */}
        <TabsContent value="product-usage">
          <Suspense fallback={<div>Loading...</div>}>
            <ProductUsage />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
