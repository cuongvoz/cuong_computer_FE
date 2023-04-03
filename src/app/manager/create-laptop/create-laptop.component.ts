import { Component, OnInit } from '@angular/core';
import {Product} from "../../entity/product";
import {FormControl, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {ProductService} from "../../service/product/product.service";
import {AngularFireStorage} from "@angular/fire/storage";
import {finalize} from "rxjs/operators";
import Swal from "sweetalert2";
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {ListService} from "../../service/product/list.service";
import {ShareService} from "../../service/login/share.service";

@Component({
  selector: 'app-create-laptop',
  templateUrl: './create-laptop.component.html',
  styleUrls: ['./create-laptop.component.css']
})
export class CreateLaptopComponent implements OnInit {
  nameTitle = 'THÊM MỚI LAPTOP'
  isCreate = true;
  products:Product[];
  brand = [];
  formLaptop = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    price: new FormControl(),
    oldPrice: new FormControl(),
    image: new FormControl(),
    cpu: new FormControl(),
    hardDrive: new FormControl(),
    ram: new FormControl(),
    monitor: new FormControl(),
    vga: new FormControl(),
    pin: new FormControl(),
    color: new FormControl(),
    weight: new FormControl(),
    os: new FormControl(),
    localBrand: new FormControl({id:2,name:'Lenovo'}),
    category: new FormControl({id: 1,name:'Laptop'}),
  })
  errorLaptop = {
    name: false,
    price: false,
    oldPrice: false,
    image: false,
    cpu: false,
    hardDrive: false,
    ram: false,
    monitor: false,
    vga: false,
    pin: false,
    color: false,
    weight: false,
    os: false
  }
  errorMessageLaptop = {
    name: '',
    price: '',
    oldPrice: '',
    image: '',
    cpu: '',
    hardDrive: '',
    ram: '',
    monitor: '',
    vga: '',
    pin: '',
    color: '',
    weight: '',
    os: ''
  }
  reload() {

    this.errorLaptop = {
      name: false,
      price: false,
      oldPrice: false,
      image: false,
      cpu: false,
      hardDrive: false,
      ram: false,
      monitor: false,
      vga: false,
      pin: false,
      color: false,
      weight: false,
      os: false
    }
    this.errorMessageLaptop = {
      name: '',
      price: '',
      oldPrice: '',
      image: '',
      cpu: '',
      hardDrive: '',
      ram: '',
      monitor: '',
      vga: '',
      pin: '',
      color: '',
      weight: '',
      os: ''
    }
  }
  selectedImage: any ;
  url: any;
  downloadURL: Observable<string> | undefined;
  fb: string | undefined= 'https://hanoicomputercdn.com/media/product/66311_hacom_asus_gaming_zephyrus_duo_gx650rw_12.png';
  src: string | undefined;
  constructor(private shareService:ShareService,private listService:ListService,private router:Router,private productService:ProductService,private storage: AngularFireStorage,private title:Title,private activate:ActivatedRoute) { }
  isLoading = false;
  ngOnInit(): void {
    this.loadlist();
    this.loader()
  }
  loadlist() {
    let brands = this.listService.getBrandLaptop();
    if (brands != undefined) {
      for (let i = 0; i < brands.length; i++) {
        let brand = {
          id: brands[i].id,
          name: brands[i].name
        }
        this.brand.push(brand)
      }
    }
  }
  loader() {
    this.activate.paramMap.subscribe(next => {
      let id = next.get('id')
      if (id != null && id != 'null') {
        this.isCreate = false;
        this.title.setTitle('Chỉnh sửa laptop')
        this.nameTitle = 'CHỈNH SỬA LAPTOP'
        this.productService.findById(id).subscribe(
          next => {

            this.formLaptop.patchValue(next)
            console.log(next)
            this.fb = next.image
            console.log(this.formLaptop.value)
          }
        )
        this.fb = this.formLaptop.controls.image.value
        this.selectedImage = this.formLaptop.controls.image.value
      }
    })
  }
  compareFun(item1,item2){
    return item1 && item2 ? item1.id === item2.id : item1 === item2
  }

  showPreview(event: any) {
    this.errorLaptop.image = false;
    this.selectedImage = event.target.files[0];
    const filePath = this.selectedImage.name;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, this.selectedImage);
    this.isLoading = true
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe(url => {
            if (url) {
              this.fb = url;
            }
            this.isLoading = false;
            this.formLaptop.patchValue({image: url});
            this.src = url;
            console.log('link: ', this.fb);
            this.src = url;
          });
        })
      )
      .subscribe();
  }

  createLaptop() {
    this.reload();

    this.productService.createLaptop(this.formLaptop.value).subscribe(
      next => {
        let image = this.formLaptop.controls.image.value
        if (this.isCreate) {
          Swal.fire({
            title:'Bạn đã thêm laptop ' + this.formLaptop.controls.name.value +' vào kho!',
            imageUrl: image + '',
            showConfirmButton: false,
            timer: 2000,
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'Custom image',
          })
        } else {
          Swal.fire({
            title:'Bạn đã chỉnh sửa laptop ' + this.formLaptop.controls.name.value +' thành công!',
            imageUrl: image + '',
            showConfirmButton: false,
            timer: 2000,
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'Custom image',
          })
        }
        this.shareService.sendClickEvent()
        this.formLaptop.reset()
        this.router.navigateByUrl('/manager/product')
      },error => {
        console.log(error)
        for (let i = 0; i < error.error.length; i++) {
          if (error.error[i].field == 'name') {
            this.errorLaptop.name = true;
            this.errorMessageLaptop.name = error.error[i].defaultMessage;
            this.formLaptop.controls.name.reset()
          } else if(error.error[i].field == 'price') {
            this.errorLaptop.price = true;
            this.errorMessageLaptop.price = error.error[i].defaultMessage;
            this.formLaptop.controls.price.reset()
          } else if(error.error[i].field == 'oldPrice') {
            this.errorLaptop.oldPrice = true;
            this.errorMessageLaptop.oldPrice = error.error[i].defaultMessage;
            this.formLaptop.controls.oldPrice.reset()
          }
          else if(error.error[i].field == 'image') {
            this.errorLaptop.image = true;
            this.errorMessageLaptop.image = error.error[i].defaultMessage;
            this.formLaptop.controls.image.reset()
          }else if(error.error[i].field == 'cpu') {
            this.errorLaptop.cpu = true;
            this.errorMessageLaptop.cpu = error.error[i].defaultMessage;
            this.formLaptop.controls.cpu.reset()
          }else if(error.error[i].field == 'hardDrive') {
            this.errorLaptop.hardDrive = true;
            this.errorMessageLaptop.hardDrive = error.error[i].defaultMessage;
            this.formLaptop.controls.hardDrive.reset()
          }else if(error.error[i].field == 'ram') {

            this.errorLaptop.ram = true;
            this.errorMessageLaptop.ram = error.error[i].defaultMessage;
            this.formLaptop.controls.ram.reset()
          }else if(error.error[i].field == 'vga') {
            this.errorLaptop.vga = true;
            this.errorMessageLaptop.vga = error.error[i].defaultMessage;
            this.formLaptop.controls.vga.reset()

          }else if(error.error[i].field == 'color') {
            this.errorLaptop.color = true;
            this.errorMessageLaptop.color = error.error[i].defaultMessage;
            this.formLaptop.controls.color.reset()
          }else if(error.error[i].field == 'monitor') {
            this.errorLaptop.monitor = true;
            this.errorMessageLaptop.monitor = error.error[i].defaultMessage;
            this.formLaptop.controls.monitor.reset()
          }else if(error.error[i].field == 'pin') {
            this.errorLaptop.pin = true;
            this.errorMessageLaptop.pin = error.error[i].defaultMessage;
            this.formLaptop.controls.pin.reset()
          }
          else if(error.error[i].field == 'weight') {
            this.errorLaptop.weight = true;
            this.errorMessageLaptop.weight = error.error[i].defaultMessage;
            this.formLaptop.controls.weight.reset()
          }
          else if(error.error[i].field == 'os') {
            this.errorLaptop.os = true;
            this.errorMessageLaptop.os = error.error[i].defaultMessage;
            this.formLaptop.controls.os.reset()
          }
        }
      }
    )
  }

}
