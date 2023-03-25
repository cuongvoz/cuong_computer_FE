import { Component, OnInit } from '@angular/core';
import {Product} from "../entity/product";
import {ProductService} from "../service/product/product.service";
import {FormControl, FormGroup} from "@angular/forms";
import Swal from "sweetalert2";
import {Observable} from "rxjs";
import {finalize} from "rxjs/operators";
import {AngularFireStorage} from "@angular/fire/storage";

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {
  products:Product[];
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
  })
  errorPC = {
    id: false,
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
    id: '',
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
      id: '',
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
      id: false,
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
  selectedImage: any = 'https://media.tenor.com/pw9ZsUdsEYgAAAAj/capoo-blue-cat.gif';
  url: any;
  downloadURL: Observable<string> | undefined;
  fb: string | undefined= 'https://media.tenor.com/pw9ZsUdsEYgAAAAj/capoo-blue-cat.gif';
  src: string | undefined;
  constructor(private productService:ProductService,private storage: AngularFireStorage) { }
  isLoading = false;
  ngOnInit(): void {
    this.loader()
  }
  loader() {
    this.productService.getHome('?size=4').subscribe(
      next => {this.products = next['content']}
    )
  }
  showPreview(event: any) {
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


            // console.log('link: ', this.fb);
          });
        })
      )
      .subscribe();
  }

  createPC() {
    this.reload();
    this.productService.createPC(this.formPC.value).subscribe(
      next => {
        console.log(next)
        let image = this.formPC.controls.image.value
        console.log('thành công')
        Swal.fire({
          title:'Bạn đã thêm sản phẩm ' + this.formPC.controls.name.value +' vào kho!',
          imageUrl: image + '',
          showConfirmButton: false,
          timer: 2000,
          imageWidth: 200,
          imageHeight: 200,
          imageAlt: 'Custom image',
        })
        document.getElementById('dissmiss').click()
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
