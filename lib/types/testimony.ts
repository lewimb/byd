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
  /** Delivery/handover photo. Omitted until real customer photos are collected. */
  photo?: string;
}
