export type Trip = {
  title: string;
  organisateur: string;
  description: string;
  destination: Destination;
  photo?: string;
  dateVoyage : number;
};

export type Destination = {
  pays: string;
  ville: string;
};
