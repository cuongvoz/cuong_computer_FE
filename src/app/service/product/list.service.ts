import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  getBrandLaptop() {
    return [
      {
        name: 'Lenovo',
        id: 2,
        check: false
      },
      {
        name: 'HP',
        id: 10,
        check: false
      },
      {
        name: 'Acer',
        id: 9,
        check: false
      },
      {
        name: 'Asus',
        id: 8,
        check: false
      },
      {
        name: 'MSI',
        id: 7,
        check: false
      },
      {
        name: 'GIGABYTE',
        id: 6,
        check: false
      },
    ];
  }
  getBrandMouse() {
    return [
      {
        name: 'RAZER',
        id: 12,
        check: false
      },
      {
        name: 'Logitech',
        id: 1,
        check: false
      },{
        name: 'Steelseries',
        id: 11,
        check: false
      },{
        name: 'Newmen',
        id: 3,
        check: false
      },{
        name: 'MSI',
        id: 7,
        check: false
      },
    ];
  }


  getBrandChair() {
    return [
      {
        name: 'E-Dra',
        id: 20,
        check: false
      },{
        name: 'Cooler',
        id: 21,
        check: false
      },{
        name: 'Cougar',
        id: 22,
        check: false
      }
    ]
  }

  getAllBrand() {
    return [
      {
        name: 'Logitech',
        id: 1,
        check: false
      }, {
        name: 'Lenovo',
        id: 2,
        check: false
      }, {
        name: 'Newmen',
        id: 3,
        check: false
      }, {
        name: 'AKKO',
        id: 4,
        check: false
      }, {
        name: 'FL-Esports',
        id: 5,
        check: false
      }, {
        name: 'GIGABYTE',
        id: 6,
        check: false
      }, {
        name: 'MSI',
        id: 7,
        check: false
      }, {
        name: 'Asus',
        id: 8,
        check: false
      }, {
        name: 'Acer',
        id: 9,
        check: false
      }, {
        name: 'HP',
        id: 10,
        check: false
      }, {
        name: 'Steelseries',
        id: 11,
        check: false
      }, {
        name: 'RAZER',
        id: 12,
        check: false
      }, {
        name: 'BenQ',
        id: 14,
        check: false
      }, {
        name: 'LG',
        id: 15,
        check: false
      }, {
        name: 'AOC',
        id: 17,
        check: false
      }, {
        name: 'SamSung',
        id: 18,
        check: false
      }, {
        name: 'Dell',
        id: 19,
        check: false
      }, {
        name: 'E-dra',
        id: 20,
        check: false
      }, {
        name: 'Cooler',
        id: 21,
        check: false
      }, {
        name: 'Cougar',
        id: 22,
        check: false
      }
    ]
  }

  getBrandMonitor() {
    return [
      {
        name: 'BenQ',
        id: 14,
        check: false
      },
      {
        name: 'LG',
        id: 15,
        check: false
      },
      {
        name: 'Acer',
        id: 9,
        check: false
      }, {
        name: 'AOC',
        id: 17,
        check: false
      }, {
        name: 'SamSung',
        id: 18,
        check: false
      }, {
        name: 'Dell',
        id: 19,
        check: false
      },
    ]
  }

  getBrandKeyboard() {
    let brandKeyboard = [
      {
        name: 'Newmen',
        id: 3,
        check: false
      },
      {
        name: 'AKKO',
        id: 4,
        check: false
      },
      {
        name: 'FL-Esports',
        id: 5,
        check: false
      }, {
        name: 'Logitech',
        id: 1,
        check: false
      }
    ];
    return brandKeyboard
  }

  getCPUPC() {
    let CPUofPC = [
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
    return CPUofPC;
  }

  getPricePC() {
    let priceOfPC = [
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
    return priceOfPC
  }

  constructor() { }
}
