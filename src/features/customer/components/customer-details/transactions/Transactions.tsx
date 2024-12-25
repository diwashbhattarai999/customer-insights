import { Suspense, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TPeriod } from '@/interfaces/dashboard/CustomerInsights';

import TransactionsTable from './TransactionTable';

interface IFilters {
  period: TPeriod;
  amount: number;
  anomalous: boolean;
}

const Transactions = ({ customerId }: { customerId: string }) => {
  const [filters, setFilters] = useState<IFilters>({
    period: 'all',
    amount: 0,
    anomalous: false,
  });

  const handleFilterChange = (key: keyof typeof filters, value: string | number | boolean) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Card className="flex size-full flex-col rounded-lg border bg-muted/50 shadow-md">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>

      {/* Filter Section */}
      <div className="mb-6 flex flex-wrap gap-4 px-4">
        <Select
          defaultValue="all"
          onValueChange={(value) => {
            handleFilterChange('period', value);
          }}
        >
          <SelectTrigger className="w-fit sm:w-[180px]">
            <SelectValue placeholder="Select Period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="day">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
            <SelectItem value="year">This Year</SelectItem>
          </SelectContent>
        </Select>

        <Input
          className="w-40"
          placeholder="Min Amount"
          type="number"
          onChange={(e) => {
            handleFilterChange('amount', Number(e.target.value));
          }}
        />

        <Select
          defaultValue="false"
          onValueChange={(value) => {
            handleFilterChange('anomalous', value === 'true');
          }}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Anomalous" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="false">All</SelectItem>
            <SelectItem value="true">Anomalous Only</SelectItem>
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          onClick={() => {
            setFilters({ period: 'all', amount: 0, anomalous: false });
          }}
        >
          Reset Filters
        </Button>
      </div>

      <Suspense fallback={<div>Loading transactions...</div>}>
        <TransactionsTable customerId={customerId} filters={filters} />
      </Suspense>
    </Card>
  );
};

export default Transactions;
