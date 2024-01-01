import { clothes } from "./clothes";

export interface orders{
  _id:string;
  userID:string;
  laundryManagerID:string;
  laundryName:string;
  status:string;
  customerName:string;
  paymentStatus:boolean;
  items:clothes[];
  updatedAt:Date;
}