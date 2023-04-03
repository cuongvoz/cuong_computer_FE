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
import {ShareService} from "../../service/login/share.service";

@Component({
  selector: 'app-create-pc',
  templateUrl: './create-pc.component.html',
  styleUrls: ['./create-pc.component.css']
})
export class CreatePCComponent implements OnInit {
  nameTitle = 'THÊM MỚI PC'
   isCreate = true;
  formPC = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    price: new FormControl(),
    oldPrice: new FormControl(),
    image: new FormControl(),
    cpu: new FormControl(),
    mainboard: new FormControl(),
    ram: new FormControl(),
    ssd: new FormControl(),
    vga: new FormControl(),
    psu: new FormControl(),
    cases: new FormControl(),
    category: new FormControl({id: 2,name:'PC Gaming'}),
  })
  errorPC = {
    name: false,
    price: false,
    oldPrice: false,
    image: false,
    cpu: false,
    mainboard: false,
    ram: false,
    ssd: false,
    vga: false,
    psu: false,
    cases: false,
  }
  errorMessagePC = {
    name: '',
    price: '',
    oldPrice: '',
    image: '',
    cpu: '',
    mainboard: '',
    ram: '',
    ssd: '',
    vga: '',
    psu: '',
    cases: '',
  }
  reload() {
    this.errorMessagePC = {
      name: '',
      price: '',
      oldPrice: '',
      image: '',
      cpu: '',
      mainboard: '',
      ram: '',
      ssd: '',
      vga: '',
      psu: '',
      cases: '',
    }
    this.errorPC = {
      name: false,
      price: false,
      oldPrice: false,
      image: false,
      cpu: false,
      mainboard: false,
      ram: false,
      ssd: false,
      vga: false,
      psu: false,
      cases: false,
    }
  }
  selectedImage: any ;
  url: any;
  downloadURL: Observable<string> | undefined;
  fb: string | undefined= 'https://anphat.com.vn/media/product/34713_untitled_1.png';
  src: string | undefined;
  constructor(private shareService:ShareService,private router:Router,private title:Title,private productService:ProductService,private storage: AngularFireStorage,private activate:ActivatedRoute) { }
  isLoading = false;
  ngOnInit(): void {
    this.title.setTitle('Thêm mới PC')
    this.loader()
  }
  loader() {
    this.activate.paramMap.subscribe(next => {
      let id = next.get('id')
      if (id != null && id != 'null') {
        this.isCreate = false;
        this.title.setTitle('Chỉnh sửa PC')
        this.nameTitle = 'CHỈNH SỬA PC'
        this.productService.findById(id).subscribe(
          next => {
            this.formPC.patchValue(next)
            this.fb = next.image
          }
        )
        this.fb = this.formPC.controls.image.value
        this.selectedImage = this.formPC.controls.image.value
      }
    })
  }
  showPreview(event: any) {
    this.errorPC.image = false;
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

            this.formPC.patchValue({image: url});
            this.src = url;
            console.log('link: ', this.fb);
            this.src = url;
          });
        })
      )
      .subscribe();
  }

  createPC() {
    this.reload();
    this.productService.createPC(this.formPC.value).subscribe(
      next => {
        let image = this.formPC.controls.image.value
        if (this.isCreate) {
          Swal.fire({
            title:'Bạn đã thêm PC ' + this.formPC.controls.name.value +' vào kho!',
            imageUrl: image + '',
            showConfirmButton: false,
            timer: 2000,
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'Custom image',
          })
        } else {
          Swal.fire({
            title:'Bạn đã chỉnh sửa PC ' + this.formPC.controls.name.value +' thành công!',
            imageUrl: image + '',
            showConfirmButton: false,
            timer: 2000,
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'Custom image',
          })
        }
        this.shareService.sendClickEvent()
        this.formPC.reset()
        this.router.navigateByUrl('/manager/product')
      },error => {
        for (let i = 0; i < error.error.length; i++) {
          if (error.error[i].field == 'name') {
            this.errorPC.name = true;
            this.errorMessagePC.name = error.error[i].defaultMessage;
            this.formPC.controls.name.reset()
          } else if(error.error[i].field == 'price') {
            this.errorPC.price = true;
            this.errorMessagePC.price = error.error[i].defaultMessage;
            this.formPC.controls.price.reset()
          } else if(error.error[i].field == 'oldPrice') {
            this.errorPC.oldPrice = true;
            this.errorMessagePC.oldPrice = error.error[i].defaultMessage;
            this.formPC.controls.oldPrice.reset()
          }
          else if(error.error[i].field == 'image') {
            this.errorPC.image = true;
            this.errorMessagePC.image = error.error[i].defaultMessage;
            this.formPC.controls.image.reset()
          }else if(error.error[i].field == 'cpu') {
            this.errorPC.cpu = true;
            this.errorMessagePC.cpu = error.error[i].defaultMessage;
            this.formPC.controls.cpu.reset()
          }else if(error.error[i].field == 'mainboard') {
            this.errorPC.mainboard = true;
            this.errorMessagePC.mainboard = error.error[i].defaultMessage;
            this.formPC.controls.mainboard.reset()
          }else if(error.error[i].field == 'ssd') {
            this.errorPC.ssd = true;
            this.errorMessagePC.ssd = error.error[i].defaultMessage;
            this.formPC.controls.ssd.reset()
          }else if(error.error[i].field == 'vga') {
            this.errorPC.vga = true;
            this.errorMessagePC.vga = error.error[i].defaultMessage;
            this.formPC.controls.vga.reset()
          }else if(error.error[i].field == 'ram') {
            this.errorPC.ram = true;
            this.errorMessagePC.ram = error.error[i].defaultMessage;
            this.formPC.controls.ram.reset()
          }else if(error.error[i].field == 'psu') {
            this.errorPC.psu = true;
            this.errorMessagePC.psu = error.error[i].defaultMessage;
            this.formPC.controls.psu.reset()
          }else if(error.error[i].field == 'cases') {
            this.errorPC.cases = true;
            this.errorMessagePC.cases = error.error[i].defaultMessage;
            this.formPC.controls.cases.reset()
          }
        }
      }
    )
  }


}
