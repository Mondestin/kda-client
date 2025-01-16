// Define all API response types
export interface Route {
  id: string;
  company: string;
  departureTime: string;
  arrivalTime: string;
  from: string;
  to: string;
  duration: string;
  distance: string;
  price: number;
  transfers: number;
  amenities: {
    wifi: boolean;
    power: boolean;
    food: boolean;
    ac: boolean;
    entertainment: boolean;
    wheelchair: boolean;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  address: string;
  profileImage: string;
}

export interface Trip {
  id: string;
  date: string;
  from: string;
  to: string;
  company: string;
  price: string;
  status: 'Completed' | 'Upcoming' | 'Cancelled';
  ticketNumber: string;
}