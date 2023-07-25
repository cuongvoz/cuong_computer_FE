import {User} from "./user";

export interface Bill {
  id?:number,
  buyDate?:string,
  totalPayment?:number,
  quantity?:number,
  user?:User
  note?:string,
  name?:string,
  email?:string,
  address?:string,
  phoneNumber?:string,
}
