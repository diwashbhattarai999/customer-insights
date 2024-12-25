import { Suspense } from 'react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CustomerInsightsCards, CustomersList } from '@/pages/dashboard/components';

import { RevenueTrends } from './components/RevenueTrends';
import { CustomerInsightsSkeleton, RevenueTrendsSkeleton } from './components/skeletons';
import CustomerListSkeleton from './components/skeletons/CustomerListSkeleton';

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-bold sm:text-xl">
        Welcome back, <span className="text-primary">John Doe</span>
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
        </TabsList>

        <TabsContent value="revenue">
          {/* Revenue Trends */}
          <Suspense fallback={<RevenueTrendsSkeleton />}>
            <RevenueTrends />
          </Suspense>
        </TabsContent>
        <TabsContent value="customers">
          <Suspense fallback={<CustomerListSkeleton />}>
            <CustomersList />
          </Suspense>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
