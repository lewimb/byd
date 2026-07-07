export interface Customer {
  name: string;
  location: string;
}

export interface Testimonial {
  id: number;
  customer: Customer;
  vehicle: string;
  rating: number;
  review: string;
}
