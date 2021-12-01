export type Trip = {
  id: string;
  title: string;
  dateBegin: string;
  dateEnd: string;
  description: string;
  detail: string;
  price: number;
  country: string;
  city: string;
  photo?: string;
  travelers: any[];
};
