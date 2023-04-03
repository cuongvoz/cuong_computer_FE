import {Bill} from "./bill";
import {Product} from "./product";

export interface BuyHistory {
  id?:number;
  quantity?:number,
  bill?:Bill,
  product?:Product
}
