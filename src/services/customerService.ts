import { mockCustomers } from "@/mockdata";

import { Customer } from "../interfaces/Customer";

export const getCustomersBySegment = (segment: string): Customer[] => {
  return mockCustomers.filter((customer) => customer.segment === segment);
};
