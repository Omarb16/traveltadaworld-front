export type Trip = {
  id: string;
  title: string;
  description: string;
  destination: Destination;
  photo?: string;
};

export type Destination = {
  pays: string;
  ville: string;
};
