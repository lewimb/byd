export interface Car {
  id: number;
  name: string;
  type: string;
  rangeKm: number;
  price: number;
  image: string;
}

export interface CarType {
  id: number;
  name: string;
  detail: string;
}
