export type TripDetail = {
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
  createdAt: string;
  canDemand: boolean;
  canCancel: boolean;
};
