import React from "react";
import CustomersList from "@/components/dashboard/CustomerList";
import AggregationMetrics from "@/components/dashboard/AggregationMetrics";
import TrendsChart from "@/components/dashboard/TrendsChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockCustomers, mockAggregation, mockTrends } from "@/mockdata";

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <AggregationMetrics aggregation={mockAggregation} />
      <div className="grid gap-6">
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Revenue Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <TrendsChart trends={mockTrends} />
          </CardContent>
        </Card>
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Customer Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <CustomersList customers={mockCustomers} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
