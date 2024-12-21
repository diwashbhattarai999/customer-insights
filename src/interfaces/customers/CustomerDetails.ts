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
  transaction_id: number;
  transaction_date: string;
  amount: number;
  is_anomalous: boolean;
}

export interface IProductRisk {
  'Mobile Banking': number;
  Loans: number;
  Deposits: number;
}
