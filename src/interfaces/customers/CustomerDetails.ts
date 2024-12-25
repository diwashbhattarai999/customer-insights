export interface IPersonalInfo {
  name: string;
  email: string;
  phone_number: string;
  address: string;
}

export interface IServiceUsed {
  mobile_banking: {
    since: string;
    expiry_date: string;
    active_devices: number;
  };
  loans: Array<{
    type: string;
    amount: number;
    due_date: string;
  }>;
  deposits: {
    fixed: number;
    savings: number;
  };
}

export interface IRecommendedService {
  recommended_service: string;
}

export interface IChurnProbability {
  value: number;
  graph: Array<number>;
}

export interface ITransaction {
  summary: {
    total_transactions: number;
    total_amount: number;
    anomalous_transactions: number;
    period: 'all' | 'day' | 'week' | 'month' | 'year';
  };
  transactions: Array<{
    transaction_id: number;
    transaction_date: string;
    amount: number;
    is_anomalous: boolean;
    product_name: string;
    product_category: 'Banking' | 'Deposit';
  }>;
}

export interface IProductRisk {
  MobileBanking: number;
  Loans: number;
  Deposits: number;
}

export interface ISegmentation {
  segmentation: 'High';
}

export interface IProduct {
  product_id: number;
  name: string;
  description: string;
  category: 'Loan';
  risk_factor: number;
}
