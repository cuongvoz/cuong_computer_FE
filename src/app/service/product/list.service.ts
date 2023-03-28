import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  brandMouse = [
    {
      name: 'RAZER',
      check: false
    },
    {
      name: 'Logitech',
      check: false
    },{
      name: 'Steelseries',
      check: false
    },{
      name: 'Newmen',
      check: false
    },{
      name: 'MSI',
      check: false
    },
  ];
  brand = [
    {
      name: 'Lenovo',
      check: false
    },
    {
      name: 'HP',
      check: false
    },
    {
      name: 'Acer',
      check: false
    },
    {
      name: 'Asus',
      check: false
    },
    {
      name: 'MSI',
      check: false
    },
    {
      name: 'GIGABYTE',
      check: false
    },
  ];
  CPUofPC = [
    {
      name: 'Gaming PC AMD',
      value:'AMD',
      check: false
    },
    {
      value:'Intel',
      name: 'Gaming PC Intel',
      check: false
    },
  ]
  priceOfPC = [
    {
      name:'PC từ 9 -15 Triệu',
      value: '9000000,15999999',
      check: false
    },
    {
      name:'PC từ 16 -20 Triệu',
      value: '16000000,20999999',
      check: false
    },
    {
      name:'PC từ 21 -30 Triệu',
      value: '21000000,30999999',
      check: false
    },
    {
      name:'PC từ 31 -49 Triệu',
      value: '31000000,49999999',
      check: false
    },
    {
      name:'PC từ 50 -60 Triệu',
      value: '50000000,60000000',
      check: false
    },
    {
      name:'PC từ 61 -70 Triệu',
      value: '61000000,70000000',
      check: false
    },
    {
      name:'PC từ 71 -85 Triệu',
      value: '71000000,85000000',
      check: false
    },
    {
      name:'PC trên 86 Triệu',
      value: '85000000,999995999000',
      check: false
    },
  ]
  constructor() { }
}
