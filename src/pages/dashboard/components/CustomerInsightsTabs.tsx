import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const CustomerInsightsTabs = () => {
  return (
    <Tabs className="w-fit" defaultValue="revenue">
      <TabsList className="flex justify-center">
        <TabsTrigger value="revenue">Revenue</TabsTrigger>
        <TabsTrigger value="customers">Customers</TabsTrigger>
      </TabsList>

      <TabsContent value="revenue">
        <div>
          {/* Add a chart here for revenue trends */}
          <p>Revenue trends and more details...</p>
        </div>
      </TabsContent>

      <TabsContent value="customers">
        <div>
          {/* Add customer insights here */}
          <p>Customer trends and breakdown...</p>
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default CustomerInsightsTabs;
