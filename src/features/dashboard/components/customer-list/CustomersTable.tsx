import { useMemo } from 'react';
import { useNavigate } from 'react-router';

import { format } from 'date-fns';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useFetchCustomers } from '@/features/dashboard/hooks/useFetchCustomer';
import { ICustomerDetails, TSegment } from '@/interfaces/dashboard/Customer';
import { TPeriod } from '@/interfaces/dashboard/CustomerInsights';

interface CustomersTableProps {
  segmentFilter: TSegment | 'All';
  periodFilter: Exclude<TPeriod, 'year'>;
  searchTerm: string;
  sortConfig: { key: keyof ICustomerDetails; direction: 'asc' | 'desc' } | null;
  requestSort: (key: keyof ICustomerDetails) => void;
}

export const CustomersTable = ({
  segmentFilter,
  periodFilter,
  searchTerm,
  sortConfig,
  requestSort,
}: CustomersTableProps) => {
  const navigate = useNavigate();

  const { data } = useFetchCustomers({
    segment: segmentFilter !== 'All' ? segmentFilter : undefined,
    customer_name: searchTerm,
    period: periodFilter,
  });
  const { customers } = data || { customers: [] };

  const sortedCustomers = useMemo(() => {
    const sortableCustomers = [...customers];
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

  const handleRowClick = (customerId: string | number) => {
    navigate(`/customers/${customerId}`);
  };

  return (
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
          {sortedCustomers.map((customer) => (
            <TableRow
              key={customer.customer_id}
              className="cursor-pointer"
              onClick={() => {
                handleRowClick(customer.customer_id);
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
  );
};
