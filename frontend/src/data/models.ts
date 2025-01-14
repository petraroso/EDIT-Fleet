export interface User {
  _id?: string;
  username: string;
  email: string;
  role: "User" | "Admin";
}

export interface Report {
  _id: string;
  title: string;
  description: string;
  vehicle: string;
  user: string;
}

export interface Reservation {
  _id: string;
  vehicle_type: string;
  period: string;
  purpose: string;
  approved: boolean;
  vehicle: string;
  user: string;
}

export interface Vehicle {
  _id: string;
  name: string;
  type: string;
  available: boolean;
}
