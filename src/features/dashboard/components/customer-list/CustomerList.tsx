import { Suspense, useState } from 'react';

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
import { ICustomerDetails, TSegment } from '@/interfaces/dashboard/Customer';
import { TPeriod } from '@/interfaces/dashboard/CustomerInsights';

import { CustomerListSkeleton } from '../skeletons';

import { CustomersTable } from './CustomersTable';

export const CustomersList = () => {
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
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Customer Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full space-y-4">
          <div className="flex items-center justify-between gap-4">
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
              <Button className="absolute right-0" size={'icon'} variant="ghost">
                <Search className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex w-full items-center space-x-4">
              {/* Segment Filter Dropdown */}
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

              {/* Period Filter Dropdown */}
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
                  <SelectItem value="day">Today</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="all">All</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Suspense fallback={<CustomerListSkeleton />}>
            <CustomersTable
              periodFilter={periodFilter}
              requestSort={requestSort}
              searchTerm={searchTerm}
              segmentFilter={segmentFilter}
              sortConfig={sortConfig}
            />
          </Suspense>
        </div>
      </CardContent>
    </Card>
  );
};
