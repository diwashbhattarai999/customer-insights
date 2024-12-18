export interface Customer {
  customer_id: number;
  name: string;
  email: string;
  phone_number: string;
  segment: "High" | "Low" | "Barely";
  signup_date: string;
  profile_image: string;
}
