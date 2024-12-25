import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IChurnProbability } from '@/interfaces/customers/CustomerDetails';

const ChurnProbability = ({ graph, value }: IChurnProbability) => {
  const data = graph.map((val, index) => ({
    name: `Period ${index + 1}`,
    churn: val,
  }));

  return (
    <Card className="bg-muted/50">
      <CardHeader>
        <CardTitle>Churn Probability</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <div className="mb-2 text-4xl font-bold">{value}%</div>
          <ResponsiveContainer height={200} width="100%">
            <LineChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line dataKey="churn" dot={false} stroke="#8884d8" strokeWidth={2} type="monotone" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChurnProbability;
