import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';

import { format } from 'date-fns';
import { ArrowUpDown, MoreHorizontal, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ICustomerDetails, TSegment } from '@/interfaces/dashboard/Customer';
import { useFetchCustomers } from '@/pages/dashboard/hooks/useFetchCustomer';

export const CustomersList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [segmentFilter, setSegmentFilter] = useState<TSegment | 'All'>('All');
  const [sortConfig, setSortConfig] = useState<{
    key: keyof ICustomerDetails;
    direction: 'asc' | 'desc';
  } | null>(null);

  const navigate = useNavigate();

  const { data } = useFetchCustomers({
    segment: segmentFilter !== 'All' ? segmentFilter : undefined,
  });
  const { customers } = data || { customers: [] };

  const sortedCustomers = useMemo(() => {
    const sortableCustomers = customers ? [...customers] : [];
    if (sortConfig !== null) {
      sortableCustomers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableCustomers;
  }, [customers, sortConfig]);

  const filteredCustomers = sortedCustomers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
              <Select
                value={segmentFilter}
                onValueChange={(value: TSegment | 'All') => {
                  setSegmentFilter(value);
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
            </div>
          </div>

          <div className="max-h-96 w-full overflow-auto">
            <Table className="w-full">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        requestSort('name');
                      }}
                    >
                      Name
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                  </TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Segment</TableHead>
                  <TableHead>Signup Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <TableRow
                    key={customer.customer_id}
                    className="cursor-pointer"
                    onClick={() => {
                      navigate(`/customers/${customer.customer_id}`);
                      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                    }}
                  >
                    <TableCell className="font-medium">{customer.customer_id}</TableCell>
                    <TableCell>{customer.name}</TableCell>
                    <TableCell>{customer.email}</TableCell>
                    <TableCell>{customer.segment}</TableCell>
                    <TableCell>{format(new Date(customer.signup_date), 'MMM dd, yyyy')}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button className="h-8 w-8 p-0" variant="ghost">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>View details</DropdownMenuItem>
                          <DropdownMenuItem>Edit customer</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Delete customer</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
