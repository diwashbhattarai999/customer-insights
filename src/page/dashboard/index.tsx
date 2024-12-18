// import React from "react";
// import CustomersList from "@/components/dashboard/CustomerList";
// import AggregationMetrics from "@/components/dashboard/AggregationMetrics";
// import TrendsChart from "@/components/dashboard/TrendsChart";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { mockCustomers, mockAggregation, mockTrends } from "@/mockdata";

// const Dashboard: React.FC = () => {
//   return (
//     <div className="space-y-6">
//       <h1 className="text-3xl font-bold">Dashboard</h1>
//       <AggregationMetrics aggregation={mockAggregation} />
//       <div className="grid gap-6">
//         <Card className="col-span-full">
//           <CardHeader>
//             <CardTitle>Revenue Trends</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <TrendsChart trends={mockTrends} />
//           </CardContent>
//         </Card>
//         <Card className="col-span-full">
//           <CardHeader>
//             <CardTitle>Customer Overview</CardTitle>
//           </CardHeader>
//           <CardContent>
//             <CustomersList customers={mockCustomers} />
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;


import React, { useEffect, useState } from "react";
import CustomersList from "@/components/dashboard/CustomerList";
import AggregationMetrics from "@/components/dashboard/AggregationMetrics";
import TrendsChart from "@/components/dashboard/TrendsChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Dashboard: React.FC = () => {
  const [customers, setCustomers] = useState([]);
  const [aggregation, setAggregation] = useState({});
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [customersResponse, aggregationResponse, trendsResponse] = await Promise.all([
          fetch("http://localhost:8000/api/customers"),
          fetch("http://localhost:8000/api/customers/insights"),
          fetch("http://localhost:8000/api/revenue/trends"),
        ]);

        if (!customersResponse.ok || !aggregationResponse.ok || !trendsResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const customersData = await customersResponse.json();
        const aggregationData = await aggregationResponse.json();
        const trendsData = await trendsResponse.json();

        setCustomers(customersData);
        setAggregation(aggregationData);
        setTrends(trendsData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <AggregationMetrics aggregation={aggregation} />
      <div className="grid gap-6">
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Revenue Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <TrendsChart trends={trends} />
          </CardContent>
        </Card>
        <Card className="col-span-full">
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
