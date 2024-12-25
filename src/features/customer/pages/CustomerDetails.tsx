import { useParams } from 'react-router';

import BackBreadcrumb from '@/components/back-breadcrumb';
import {
  ChurnProbability,
  PersonalInfo,
  ProductRisk,
  ServicesUsed,
  Transactions,
} from '@/features/customer/components/customer-details';
import { useFetchCustomerDetails } from '@/features/customer/hooks/useFetchCustomerDetails';

const CustomerDetails = () => {
  const { customerId } = useParams<{ customerId: string }>();
  const { data } = useFetchCustomerDetails({ customerId: customerId || '' });
  const { personalInfo, servicesUsed, recommendedService, churnProbability, productRisk } = data;

  return (
    <div className="space-y-12">
      <BackBreadcrumb />
      <PersonalInfo
        {...personalInfo}
        recommended_service={recommendedService.recommended_service}
      />
      <div className="grid gap-4 md:grid-cols-2">
        <ServicesUsed {...servicesUsed} />
        <ChurnProbability {...churnProbability} />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <ProductRisk productRisk={productRisk} />

        <Transactions customerId={customerId || ''} />
      </div>
    </div>
  );
};

export default CustomerDetails;
