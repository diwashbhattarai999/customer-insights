export interface ICustomer {
  analytics: {
    total_customers: number;
    segment_distribution: {
      Barely: number;
      High: number;
      Low: number;
    };
    average_customer_value: number;
    customer_acquisition_trend: {
      count: string;
    };
  };
  customers: Array<ICustomerDetails>;
}

export interface ICustomerDetails {
  customer_id: number;
  name: string;
  email: string;
  phone_number: string;
  segment: 'High' | 'Low' | 'Barely';
  signup_date: string;
  profile_image: string;
}
