export type TripDetail = {
  id: string;
  title: string;
  description: string;
  country: string;
  city: string;
  photo?: string;
  createdAt: string;
  canDemand: boolean;
  canCancel: boolean;
};
