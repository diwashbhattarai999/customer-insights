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
  transactionData: ITransaction;
}

const Transactions = ({ transactionData }: ITransactionsProps) => {
  const { summary, transactions } = transactionData;

  return (
    <Card className="bg-muted/50">
      <CardHeader>
        <CardTitle>Transaction Summary</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Summary Section */}
        <div className="mb-6 grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold">Total Transactions</h3>
            <p className="text-muted-foreground">{summary.total_transactions}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Total Amount</h3>
            <p className="text-muted-foreground">${summary.total_amount.toLocaleString()}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Anomalous Transactions</h3>
            <p className="text-muted-foreground">{summary.anomalous_transactions}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Period</h3>
            <p className="text-muted-foreground">{summary.period}</p>
          </div>
        </div>

        {/* Transaction Details Section */}
        <h3 className="mb-4 text-lg font-semibold">Recent Transactions</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Anomalous</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.slice(0, 5).map((txn) => (
              <TableRow key={txn.transaction_id}>
                <TableCell>{txn.transaction_id}</TableCell>
                <TableCell>{format(new Date(txn.transaction_date), 'MMM dd, yyyy')}</TableCell>
                <TableCell>${txn.amount}</TableCell>
                <TableCell>{txn.product_name}</TableCell>
                <TableCell>{txn.product_category}</TableCell>
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
};

export default Transactions;
