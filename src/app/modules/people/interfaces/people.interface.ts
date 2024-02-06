export interface Person {
  id?: string;
  name: string;
  username: string;
  email: string;
  phone: number;
  website: string;
  company: string;
  address: Address;
}

export interface Address {
  street: string;
  city: string;
  zipcode: number;
}
