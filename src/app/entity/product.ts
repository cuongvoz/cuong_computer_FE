import {Category} from "./category";

export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice: number;
  image: string;
  keyboard: string;
  connect: string;
  keycap: string;
  switchKeyboard: string;
  reliability: string;
  compatible: string;
  cpu: string;
  mainboard: string;
  ram: string;
  ssd: string;
  vga: string;
  psu: string;
  cases: string;
  sensor: string;
  dpi: string;
  material: string;
  kneelings: string;
  brand: string;
  model: string;
  backrest: string;
  hardDrive: string;
  monitor: string;
  pin: string;
  color: string;
  weight: string;
  os: string;
  screenSize: string;
  resolution: string;
  scanFrequency: string;
  aspectRatio: string;
  connector: string;
  panels: string;
  category: Category
}
