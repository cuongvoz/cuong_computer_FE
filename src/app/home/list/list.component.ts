import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../../entity/product";
import {ProductService} from "../../service/product/product.service";
import {Title} from "@angular/platform-browser";
import Swal from "sweetalert2";
import {Cart} from "../../entity/cart";
import {TokenService} from "../../service/login/token.service";
import {ShareService} from "../../service/login/share.service";
import {User} from "../../entity/user";
import {LoginService} from "../../service/login/login.service";
import {FormControl, FormGroup} from "@angular/forms";
import {ListService} from "../../service/product/list.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  category = '';
  cart: Cart[] = [{}, {}]
  products: Product[] = [];
  user: User;
  first:boolean;
  typePaging = 0;
  minPrice = 0;
  maxPrice = 0;
  last:boolean;
  number: number;
  isLogged = false;
  id: number;
  nameSearch = ''
  load = 'yes'
  CPUofPC = []
  priceOfPC = []
  brand = [];
  brandMouse = [];
  brandKeyboard = [];
  brandMonitor = [];
  brandChair = [];
  brandAll = []
  brandSearch = [];
  constructor(private listService:ListService,private loginService: LoginService, private share: ShareService, private token: TokenService, private title: Title, private router: Router, private productService: ProductService, private activate: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.loadlist()
    this.loadCheckBox()
    this.isLogged = this.token.isLogger()
    this.share.getClickEvent().subscribe(
      next => {
        this.loadCheckBox()
        this.isLogged = this.token.isLogger()
        this.loader();
      }
    )
    window.scroll(0, 0)
    this.loader();
  }
  loadlist() {
    this.activate.paramMap.subscribe(next => {
      let name = next.get('name');
      this.nameSearch = name
      let category = next.get('category');
      this.findCategory(category);
      this.id = parseInt(category)
      if (name != null && name != 'null') {
        if (category != '7') {
          this.productService.getProductByCategoryAndName(category, name).subscribe(
            next => this.getProductList(next)
          )
          this.typePaging = 3;
        } else {
          this.productService.getAllProductByName(name).subscribe(
            next => this.getProductList(next)
          )
          this.typePaging = 2;
        }
      } else {
        if (category != '7') {
          this.productService.getProductByCategory(category).subscribe(
            next => this.getProductList(next)
          )
          this.typePaging = 1;
        } else {
          this.productService.getAllProduct().subscribe(
            next => this.getProductList(next)
          )
          this.typePaging = 0;
        }
      }
      if (this.products.length == 0) {
        this.load = 'none'
      } else {
        this.load = 'yes'
      }
    })
  }
  loader() {
    if (this.isLogged) {
      this.loginService.profile(this.token.getId()).subscribe(next => this.user = next)
    }

  }
  findCategory(id: string) {
    switch (id) {
      case '7':
        this.category = 'Tất cả danh mục';
        this.title.setTitle('Tất cả danh mục');
        break;
      case "1":
        this.category = 'Laptop';
        this.title.setTitle('Laptop');
        break;
      case "2":
        this.category = 'PC Gaming';
        this.title.setTitle('PC Gaming');
        break;
      case "5":
        this.category = 'Chuột';
        this.title.setTitle('Chuột');
        break;
      case "3":
        this.category = 'Bàn phím';
        this.title.setTitle('Bàn phím');
        break;
      case "4":
        this.category = 'Màn hình';
        this.title.setTitle('Màn hình');
        break;
      case "6":
        this.category = 'Ghế';
        this.title.setTitle('Ghế');
        break;
    }
  }

  click(product: Product) {
    this.share.sendClickEvent();
    if (this.isLogged) {
      if (product.quantity > 0) {
        this.token.addToCart(product, this.user)
      } else {
        Swal.fire({
          title: 'Hết mất rồi :(',
          imageUrl: 'https://i.imgur.com/dKc3V77.png',
          text: 'Hiện tại ' + product.category.name.toLowerCase() + ' ' + product.name + ' của bên mình đã hết' +
            ' mong quý khách thông cảm cho sự bất tiện này, quý khách vui lòng chọn sản phẩm khác.',
          showConfirmButton: true,
          imageWidth: 200,
          imageHeight: 200,
          imageAlt: 'Custom image',
          confirmButtonColor: '#005ec4',
          confirmButtonText: 'Xác nhận',
        })
      }
    } else {
      if (product.quantity > 0) {
        this.token.addCartSession(product)
        this.share.sendClickEvent()
      } else {
        Swal.fire({
          title: 'Hết mất rồi :(',
          imageUrl: 'https://i.imgur.com/dKc3V77.png',
          text: 'Hiện tại ' + product.category.name.toLowerCase() + ' ' + product.name + ' của bên mình đã hết' +
            ' mong quý khách thông cảm cho sự bất tiện này, quý khách vui lòng chọn sản phẩm khác.',
          showConfirmButton: true,
          imageWidth: 200,
          imageHeight: 200,
          imageAlt: 'Custom image',
          confirmButtonColor: '#005ec4',
          confirmButtonText: 'Xác nhận',
        })
      }

    }
  }
  changePage(page: number) {
    this.productService.paging('?page='+page,this.id,this.nameSearch,this.typePaging,this.minPrice,this.maxPrice,this.brandSearch).subscribe(next => this.getProductList(next));
  }
  goHome() {
    this.router.navigateByUrl('/')
  }
  loadCheckBox() {

    this.brandAll = this.listService.getAllBrand()
    this.brandChair = this.listService.getBrandChair();
    this.brandMonitor = this.listService.getBrandMonitor()
    this.brandKeyboard = this.listService.getBrandKeyboard();
    this.brand = this.listService.getBrandLaptop();
    this.priceOfPC = this.listService.getPricePC();
    this.CPUofPC = this.listService.getCPUPC();
    this.brandMouse = this.listService.getBrandMouse();
  }
  getProductList(products: any) {
    this.products = products['content']
    this.first = products['first'];
    this.last = products['last'];
    this.number = products['number'];
  }


  searchByPrice(price: string, oldPrice: string) {
    this.minPrice = parseInt(price);
    this.maxPrice = parseInt(oldPrice);
    this.productService.searchPrice(price, oldPrice, this.id).subscribe(
      next => {
        this.getProductList(next);
      }
    )
    this.typePaging = 4;
  }
  searchCpu(index:number) {
    this.typePaging = 6
    this.CPUofPC[index].check = !this.CPUofPC[index].check;
    let cpu = []
    for (let i = 0; i < this.CPUofPC.length; i++) {
      if (this.CPUofPC[i].check) {
        cpu.push(this.CPUofPC[i].value)
      }
    }
    this.brandSearch = cpu;
    if (cpu.length == 0) {
      if (this.id == 7) {
        this.productService.getAllProduct().subscribe(
          next => this.getProductList(next)
        )
      } else {
        this.productService.getProductByCategory(this.id+'').subscribe(
          next => this.getProductList(next)
        )
      }
    } else {
      if (cpu.length == 1) {
        cpu.push(cpu[0])
      }
      this.productService.searchCPUandCategory(cpu).subscribe(
        next => {
          this.getProductList(next)
        }
      )
    }

  }
  checkBoxBrandAll(index: number) {
    this.brandAll[index].check = !this.brandAll[index].check;
    let brand = []
    for (let i = 0; i < this.brandAll.length; i++) {
      if (this.brandAll[i].check) {
        brand.push(this.brandAll[i].id)
      }
    }
    this.typePaging = 5;
    this.brandSearch = brand;
    if (brand.length == 0) {
      this.productService.getAllProduct().subscribe(
        next => {this.getProductList(next)
          this.typePaging = 0;
        }
      )
    } else {
      this.productService.searchBrand(this.id,brand).subscribe(
        next => {
          this.getProductList(next)
        }
      )
    }
  }
  checkBoxBrand(index: number) {
    this.brand[index].check = !this.brand[index].check;
    let brand = []
    for (let i = 0; i < this.brand.length; i++) {
      if (this.brand[i].check) {
        brand.push(this.brand[i].id)
      }
    }
    this.typePaging = 5;
    this.brandSearch = brand;
    if (brand.length == 0) {
        this.productService.getProductByCategory(this.id.toString()).subscribe(
          next => {
            this.getProductList(next)
            this.typePaging = 1;
          })
    } else {
      this.productService.searchBrand(this.id,brand).subscribe(
        next => {
          this.getProductList(next)
        }
      )
    }
  }
  checkBoxBrandChair(index: number) {
    this.brandChair[index].check = !this.brandChair[index].check;
    let brand = []
    for (let i = 0; i < this.brandChair.length; i++) {
      if (this.brandChair[i].check) {
        brand.push(this.brandChair[i].id)
      }
    }
    this.typePaging = 5;
    this.brandSearch = brand;

    if (brand.length == 0) {
      this.productService.getProductByCategory(this.id+'').subscribe(
        next => {
          this.getProductList(next)
          this.typePaging = 1;
        })
    } else {
      this.productService.searchBrand(this.id,brand).subscribe(
        next => {
          this.getProductList(next)
        }
      )
    }
  }
  checkBoxBrandMonitor(index: number) {
    this.brandMonitor[index].check = !this.brandMonitor[index].check;
    let brand = []
    for (let i = 0; i < this.brandMonitor.length; i++) {
      if (this.brandMonitor[i].check) {
        brand.push(this.brandMonitor[i].id)
      }
    }
    this.typePaging = 5;
    this.brandSearch = brand;

    if (brand.length == 0) {
      this.productService.getProductByCategory(this.id+'').subscribe(
        next => {
          this.getProductList(next)
          this.typePaging = 1;
        })
    } else {
      this.productService.searchBrand(this.id,brand).subscribe(
        next => {
          this.getProductList(next)
        }
      )
    }
  }
  checkBoxPricePC(index: number) {
    let price = []
    this.typePaging = 4;
    this.priceOfPC[index].check =!this.priceOfPC[index].check;
    for (let i = 0; i < this.priceOfPC.length; i++) {
      if (this.priceOfPC[i].check) {
        price.push(this.priceOfPC[i].value)
      }
    }
    if (price.length == 0) {
      this.productService.getProductByCategory(this.id+'').subscribe(next => {
        this.getProductList(next)
        this.typePaging = 1;
      })
    } else {
      if (price[0] != undefined && price[price.length-1] != undefined) {
        let minPrice = price[0].split(",")[0];
        let maxPrice = price[price.length-1].split(",")[1];
        this.minPrice = minPrice;
        this.maxPrice = maxPrice;
        this.productService.searchPrice(minPrice,maxPrice,this.id).subscribe(next => this.getProductList(next))
      }
    }


  }

  checkBoxBrandMouse(index: number) {
    this.brandMouse[index].check = !this.brandMouse[index].check;
    let brand = []
    for (let i = 0; i < this.brandMouse.length; i++) {
      if (this.brandMouse[i].check) {
        brand.push(this.brandMouse[i].id)
      }
    }
    this.typePaging = 5;
    this.brandSearch = brand;
    if (brand.length == 0) {
        this.productService.getProductByCategory(this.id+'').subscribe(
          next => {
            this.getProductList(next)
            this.typePaging = 1;
          } )
    } else {
      this.productService.searchBrand(this.id,brand).subscribe(
        next => {
          this.getProductList(next)
        }
      )
    }
  }

  checkBoxBrandKeyBoard(index: number) {
    this.brandKeyboard[index].check = !this.brandKeyboard[index].check;
    let brand = []
    for (let i = 0; i < this.brandKeyboard.length; i++) {
      if (this.brandKeyboard[i].check) {
        brand.push(this.brandKeyboard[i].id)
      }
    }
    this.typePaging = 5;
    this.brandSearch = brand;
    if (brand.length == 0) {
        this.productService.getProductByCategory(this.id+'').subscribe(
          next => {this.getProductList(next)
      this.typePaging = 1}
        )
    } else {
      this.productService.searchBrand(this.id,brand).subscribe(
        next => {
          this.getProductList(next)
        }
      )
    }
  }
}
