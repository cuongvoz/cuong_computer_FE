import { Component, OnInit } from '@angular/core';
import {Product} from "../../entity/product";
import {FormControl, FormGroup} from "@angular/forms";
import {Observable} from "rxjs";
import {ProductService} from "../../service/product/product.service";
import {AngularFireStorage} from "@angular/fire/storage";
import {finalize} from "rxjs/operators";
import Swal from "sweetalert2";
import {Title} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {ListService} from "../../service/product/list.service";
import {ShareService} from "../../service/login/share.service";

@Component({
  selector: 'app-create-mouse',
  templateUrl: './create-mouse.component.html',
  styleUrls: ['./create-mouse.component.css']
})
export class CreateMouseComponent implements OnInit {
  nameTitle = 'THÊM MỚI CHUỘT'
  isCreate = true;
  products:Product[];
  formMouse = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    price: new FormControl(),
    oldPrice: new FormControl(),
    image: new FormControl(),
    dpi: new FormControl(),
    sensor: new FormControl(),
    weight: new FormControl(),
    compatible: new FormControl(),
    connect: new FormControl(),
    os: new FormControl(),
    reliability: new FormControl(),
    localBrand: new FormControl({name: 'RAZER',
      id: 12}),
    category: new FormControl({id: 5,name:'Chuột'}),
  })
  errorMouse = {
    name: false,
    price: false,
    oldPrice: false,
    image: false,
    dpi: false,
    sensor: false,
    weight: false,
    compatible: false,
    connect: false,
    os: false,
    reliability: false,
  }
  errorMessageMouse = {
    name: '',
    price: '',
    oldPrice: '',
    image: '',
    dpi: '',
    sensor: '',
    weight: '',
    compatible: '',
    connect: '',
    os: '',
    reliability: ''
  }
  reload() {
    this.errorMessageMouse = {
      name: '',
      price: '',
      oldPrice: '',
      image: '',
      dpi: '',
      sensor: '',
      weight: '',
      compatible: '',
      connect: '',
      os: '',
      reliability: ''
    }
    this.errorMouse = {
      name: false,
      price: false,
      oldPrice: false,
      image: false,
      dpi: false,
      sensor: false,
      weight: false,
      compatible: false,
      connect: false,
      os: false,
      reliability: false
    }
  }
  selectedImage: any ;
  url: any;
  downloadURL: Observable<string> | undefined;
  fb: string | undefined= 'https://hanoicomputercdn.com/media/product/53012_mouse_logitech_g102_lightsync_rgb_black_0000_1.jpg';
  src: string | undefined;
  brand = [];
  constructor(private shareService:ShareService,private listService:ListService,private router:Router,private productService:ProductService,private storage: AngularFireStorage,private title:Title,private activate:ActivatedRoute) { }
  isLoading = false;
  ngOnInit(): void {
    this.loader();
    this.loadlist();
  }
  loadlist() {
    let brands = this.listService.getBrandMouse();
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
  compareFun(item1,item2){
    return item1 && item2 ? item1.id === item2.id : item1 === item2
  }
  loader() {
    this.activate.paramMap.subscribe(next => {
      let id = next.get('id')
      if (id != null && id != 'null') {
        this.isCreate = false;
        this.title.setTitle('Chỉnh sửa chuột')
        this.nameTitle = 'CHỈNH SỬA CHUỘT'
        this.productService.findById(id).subscribe(
          next => {this.formMouse.patchValue(next)
        this.fb = next.image}
        )
        this.fb = this.formMouse.controls.image.value
        this.selectedImage = this.formMouse.controls.image.value
      }
    })
  }
  showPreview(event: any) {
    this.errorMouse.image = false;
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

            this.formMouse.patchValue({image: url});
            this.src = url;
            console.log('link: ', this.fb);
            this.src = url;
          });
        })
      )
      .subscribe();
  }

  createMouse() {
    this.reload();
    this.productService.createMouse(this.formMouse.value).subscribe(
      next => {
        let image = this.formMouse.controls.image.value
        if (this.isCreate) {
          Swal.fire({
            title:'Bạn đã thêm chuột ' + this.formMouse.controls.name.value +' vào kho!',
            imageUrl: image + '',
            showConfirmButton: false,
            timer: 2000,
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'Custom image',
          })
        } else {
          Swal.fire({
            title:'Bạn đã chỉnh sửa chuột ' + this.formMouse.controls.name.value +' thành công!',
            imageUrl: image + '',
            showConfirmButton: false,
            timer: 2000,
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'Custom image',
          })
        }
        this.shareService.sendClickEvent()
        this.formMouse.reset()
        this.router.navigateByUrl('/manager/product')
      },error => {
        console.log(error)
        for (let i = 0; i < error.error.length; i++) {
          if (error.error[i].field == 'name') {
            this.errorMouse.name = true;
            this.errorMessageMouse.name = error.error[i].defaultMessage;
            this.formMouse.controls.name.reset()
          } else if(error.error[i].field == 'price') {
            this.errorMouse.price = true;
            this.errorMessageMouse.price = error.error[i].defaultMessage;
            this.formMouse.controls.price.reset()
          } else if(error.error[i].field == 'oldPrice') {
            this.errorMouse.oldPrice = true;
            this.errorMessageMouse.oldPrice = error.error[i].defaultMessage;
            this.formMouse.controls.oldPrice.reset()
          }
          else if(error.error[i].field == 'image') {
            this.errorMouse.image = true;
            this.errorMessageMouse.image = error.error[i].defaultMessage;
            this.formMouse.controls.image.reset()
          }else if(error.error[i].field == 'dpi') {
            this.errorMouse.dpi = true;
            this.errorMessageMouse.dpi = error.error[i].defaultMessage;
            this.formMouse.controls.dpi.reset()
          }else if(error.error[i].field == 'sensor') {
            this.errorMouse.sensor = true;

            this.errorMessageMouse.sensor = error.error[i].defaultMessage;
            this.formMouse.controls.sensor.reset()
          }else if(error.error[i].field == 'weight') {
            this.errorMouse.weight = true;

            this.errorMessageMouse.weight = error.error[i].defaultMessage;
            this.formMouse.controls.weight.reset()
          }else if(error.error[i].field == 'compatible') {
            this.errorMouse.compatible = true;
            this.errorMessageMouse.compatible = error.error[i].defaultMessage;
            this.formMouse.controls.compatible.reset()
          }else if(error.error[i].field == 'connect') {
            this.errorMouse.connect = true;
            this.errorMessageMouse.connect = error.error[i].defaultMessage;
            this.formMouse.controls.connect.reset()
          }else if(error.error[i].field == 'os') {
            this.errorMouse.os = true;
            this.errorMessageMouse.os = error.error[i].defaultMessage;
            this.formMouse.controls.os.reset()
          }else if(error.error[i].field == 'reliability') {
            this.errorMouse.reliability = true;
            this.errorMessageMouse.reliability = error.error[i].defaultMessage;
            this.formMouse.controls.reliability.reset()
          }
        }
      }
    )
  }

}
