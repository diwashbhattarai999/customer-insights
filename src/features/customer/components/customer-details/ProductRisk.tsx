import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { IProductRisk } from '@/interfaces/customers/CustomerDetails';

interface ProductRiskProps {
  productRisk: IProductRisk;
}

const ProductRisk = ({ productRisk }: ProductRiskProps) => (
  <Card className="bg-muted/50">
    <CardHeader>
      <CardTitle>Product Risks</CardTitle>
    </CardHeader>
    <CardContent className="w-full">
      <ChartContainer className="h-full w-full" config={{}}>
        <ResponsiveContainer height="100%" width="100%">
          <BarChart
            data={Object.entries(productRisk || {}).map(([product, risk]) => ({ product, risk }))}
          >
            <XAxis dataKey="product" />
            <YAxis />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="risk" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </CardContent>
  </Card>
);

export default ProductRisk;
