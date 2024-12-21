import { useNavigate, useParams } from 'react-router';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import { useCustomerDetails } from '@/hooks/api/customerDetails.ts/useCustomerDetails';

const CustomerDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data } = useCustomerDetails(id || '');

  const {
    personalInfo,
    servicesUsed,
    recommendedService,
    churnProbability,
    transactions,
    productRisk,
  } = data;

  const navigate = useNavigate();

  // Handle back button click
  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="space-y-4">
      {/* Breadcrumb */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink onClick={handleBackClick}>Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Customer Details</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div>Name: {personalInfo?.name}</div>
          <div>Email: {personalInfo?.email}</div>
          <div>Phone: {personalInfo?.phone_number}</div>
          <div>Address: {personalInfo?.address}</div>
        </CardContent>
      </Card>

      {/* Services Used */}
      <Card>
        <CardHeader>
          <CardTitle>Services Used</CardTitle>
        </CardHeader>
        <CardContent>
          <div>Mobile Banking Since: {servicesUsed?.mobile_banking?.since}</div>
          <div>Active Devices: {servicesUsed?.mobile_banking?.active_devices}</div>
          <div>Loans:</div>
          <ul>
            {servicesUsed?.loans?.map((loan, index: number) => (
              <li key={index}>
                {loan.type} - Amount: {loan.amount} - Due: {loan.due_date}
              </li>
            ))}
          </ul>
          <div>Fixed Deposits: {servicesUsed?.deposits?.fixed}</div>
          <div>Savings: {servicesUsed?.deposits?.savings}</div>
        </CardContent>
      </Card>

      {/* Recommended Service */}
      <Card>
        <CardHeader>
          <CardTitle>Recommended Service</CardTitle>
        </CardHeader>
        <CardContent>{recommendedService?.recommended_service}</CardContent>
      </Card>

      {/* Churn Probability */}
      <Card>
        <CardHeader>
          <CardTitle>Churn Probability</CardTitle>
        </CardHeader>
        <CardContent>
          <div>Probability: {churnProbability?.value}</div>
        </CardContent>
      </Card>

      {/* Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Anomalous</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions?.map((txn) => (
                <TableRow key={txn.transaction_id}>
                  <TableCell>{txn.transaction_id}</TableCell>
                  <TableCell>{txn.transaction_date}</TableCell>
                  <TableCell>{txn.amount}</TableCell>
                  <TableCell>{txn.is_anomalous ? 'Yes' : 'No'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Product Risks */}
      <Card>
        <CardHeader>
          <CardTitle>Product Risks</CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            {productRisk &&
              Object.entries(productRisk).map(([product, risk], index) => (
                <li key={index}>
                  {product}: {risk}
                </li>
              ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerDetails;
