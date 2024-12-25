import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const CustomerListSkeleton = () => (
  <div className="max-h-96 w-full overflow-auto">
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">
            <Skeleton className="h-6 w-24" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-6 w-24" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-6 w-24" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-6 w-24" />
          </TableHead>
          <TableHead>
            <Skeleton className="h-6 w-24" />
          </TableHead>
          <TableHead className="text-right">
            <Skeleton className="h-6 w-24" />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(5)].map((_, idx) => (
          <TableRow key={idx}>
            <TableCell>
              <Skeleton className="h-6 w-20" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-6 w-32" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-6 w-48" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-6 w-32" />
            </TableCell>
            <TableCell>
              <Skeleton className="h-6 w-32" />
            </TableCell>
            <TableCell className="text-right">
              <Skeleton className="h-6 w-16" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

export default CustomerListSkeleton;
