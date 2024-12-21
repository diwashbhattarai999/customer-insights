import { format } from 'date-fns';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ITransaction } from '@/interfaces/customers/CustomerDetails';

interface ITransactionsProps {
  transactions: Array<ITransaction>;
}

const Transactions = ({ transactions }: ITransactionsProps) => (
  <Card className="bg-muted/50">
    <CardHeader>
      <CardTitle>Recent Transactions</CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Anomalous</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions?.slice(0, 5).map((txn) => (
            <TableRow key={txn.transaction_id}>
              <TableCell>{txn.transaction_id}</TableCell>
              <TableCell>{format(txn.transaction_date, 'MMM dd, yyyy')}</TableCell>
              <TableCell>{txn.amount}</TableCell>
              <TableCell>
                <Badge variant={txn.is_anomalous ? 'destructive' : 'secondary'}>
                  {txn.is_anomalous ? 'Yes' : 'No'}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

export default Transactions;
