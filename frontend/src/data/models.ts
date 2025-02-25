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
  vehicle: Vehicle;
  user: User;
  solved: boolean;
}

export interface Reservation {
  _id: string;
  vehicleType: string;
  startDate: Date;
  endDate: Date;
  purpose: string;
  approved: boolean;
  vehicle: Vehicle;
  user: User;
}

export interface Vehicle {
  _id: string;
  name: string;
  type: string;
  available: boolean;
  technicalDate: Date;
}
