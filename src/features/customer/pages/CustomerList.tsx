import { useState } from 'react';

import { Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CustomersTable } from '@/features/dashboard/components/customer-list/CustomersTable';
import { ICustomerDetails, TSegment } from '@/interfaces/dashboard/Customer';
import { TPeriod } from '@/interfaces/dashboard/CustomerInsights';

const CustomerList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [segmentFilter, setSegmentFilter] = useState<TSegment | 'All'>('All');
  const [periodFilter, setPeriodFilter] = useState<Exclude<TPeriod, 'year'>>('month');
  const [sortConfig, setSortConfig] = useState<{
    key: keyof ICustomerDetails;
    direction: 'asc' | 'desc';
  } | null>(null);

  const requestSort = (key: keyof ICustomerDetails) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="w-full space-y-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Customer List</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters and Search Section */}
          <div className="flex items-center justify-between gap-4">
            {/* Search Box */}
            <div className="relative flex w-full items-center space-x-2">
              <Input
                className="w-full"
                placeholder="Search customers..."
                type="text"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                }}
              />
              <Button className="absolute right-0" size="icon" variant="ghost">
                <Search className="h-4 w-4" />
              </Button>
            </div>

            {/* Filters Section */}
            <div className="flex w-full items-center space-x-4">
              {/* Segment Filter */}
              <Select
                value={segmentFilter}
                onValueChange={(value) => {
                  setSegmentFilter(value as TSegment | 'All');
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Segment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Segments</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Low">Low</SelectItem>
                </SelectContent>
              </Select>

              {/* Period Filter */}
              <Select
                value={periodFilter}
                onValueChange={(value) => {
                  setPeriodFilter(value as Exclude<TPeriod, 'year'>);
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Customers Table */}
          <CustomersTable
            className="max-h-[calc(100vh-18rem)]"
            periodFilter={periodFilter}
            requestSort={requestSort}
            searchTerm={searchTerm}
            segmentFilter={segmentFilter}
            sortConfig={sortConfig}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerList;
