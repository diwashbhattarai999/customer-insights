import { format } from 'date-fns';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCaption,
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
    <Card className="flex flex-col justify-between rounded-lg border bg-muted/50 shadow-md">
      <div>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>

        <CardContent>
          <Table className="mb-8 border-t border-muted">
            <TableHeader>
              <TableRow>
                <TableHead className="text-left">Transaction ID</TableHead>
                <TableHead className="text-left">Date</TableHead>
                <TableHead className="text-left">Amount</TableHead>
                <TableHead className="text-left">Product</TableHead>
                <TableHead className="text-left">Category</TableHead>
                <TableHead className="text-left">Anomalous</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.slice(0, 5).map((txn) => (
                <TableRow key={txn.transaction_id}>
                  <TableCell className="text-sm">{txn.transaction_id}</TableCell>
                  <TableCell className="text-sm">
                    {format(new Date(txn.transaction_date), 'MMM dd, yyyy')}
                  </TableCell>
                  <TableCell className="text-sm font-medium">
                    ${txn.amount.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-sm">{txn.product_name}</TableCell>
                  <TableCell className="text-sm">{txn.product_category}</TableCell>
                  <TableCell className="text-sm">
                    <Badge variant={txn.is_anomalous ? 'destructive' : 'secondary'}>
                      {txn.is_anomalous ? 'Yes' : 'No'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

            <TableCaption></TableCaption>
          </Table>
        </CardContent>
      </div>

      <CardFooter>
        {/* Summary Section */}
        <div className="flex flex-wrap justify-between gap-4">
          <div className="flex items-center gap-2">
            <h4 className="font-medium">Total Transactions</h4>
            <p className="text-muted-foreground">{summary.total_transactions}</p>
          </div>
          <div className="flex items-center gap-2">
            <h4 className="font-medium">Total Amount</h4>
            <p className="text-muted-foreground">${summary.total_amount.toLocaleString()}</p>
          </div>
          <div className="flex items-center gap-2">
            <h4 className="font-medium">Anomalous Transactions</h4>
            <p className="text-xl font-semibold text-destructive">
              {summary.anomalous_transactions}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <h4 className="font-medium">Period</h4>
            <p className="text-muted-foreground">{summary.period}</p>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default Transactions;
