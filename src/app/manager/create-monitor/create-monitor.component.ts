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

@Component({
  selector: 'app-create-monitor',
  templateUrl: './create-monitor.component.html',
  styleUrls: ['./create-monitor.component.css']
})
export class CreateMonitorComponent implements OnInit {
  nameTitle = 'Thêm mới màn hình'
  isCreate = true;
  products:Product[];
  formMonitor = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    price: new FormControl(),
    oldPrice: new FormControl(),
    image: new FormControl(),
    screenSize: new FormControl(),
    resolution: new FormControl(),
    scanFrequency: new FormControl(),
    aspectRatio: new FormControl(),
    connector: new FormControl(),
    panels: new FormControl(),
    category: new FormControl({id: 4,name:'Màn hình'}),
  })
  errorMonitor = {
    name: false,
    price: false,
    oldPrice: false,
    image: false,
    screenSize: false,
    resolution: false,
    scanFrequency: false,
    aspectRatio: false,
    connector: false,
    panels: false,
  }
  errorMessageMonitor = {
    name: '',
    price: '',
    oldPrice: '',
    image: '',
    screenSize: '',
    resolution: '',
    scanFrequency: '',
    aspectRatio: '',
    connector: '',
    panels: '',
  }
  reload() {
    this.errorMonitor = {
      name: false,
      price: false,
      oldPrice: false,
      image: false,
      screenSize: false,
      resolution: false,
      scanFrequency: false,
      aspectRatio: false,
      connector: false,
      panels: false,
    }
    this.errorMessageMonitor = {
      name: '',
      price: '',
      oldPrice: '',
      image: '',
      screenSize: '',
      resolution: '',
      scanFrequency: '',
      aspectRatio: '',
      connector: '',
      panels: '',
    }
  }
  selectedImage: any ;
  url: any;
  downloadURL: Observable<string> | undefined;
  fb: string | undefined= 'https://fptshop.com.vn/Uploads/Originals/2022/8/26/637971113774126791_man-hinh-dell-ultrasharp-u2422h-trang-dd.jpg';
  src: string | undefined;
  constructor(private router:Router,private productService:ProductService,private storage: AngularFireStorage,private title:Title,private activate:ActivatedRoute) { }
  isLoading = false;
  ngOnInit(): void {
    this.loader()
  }
  loader() {
    this.activate.paramMap.subscribe(next => {
      let id = next.get('id')
      if (id != null && id != 'null') {
        this.isCreate = false;
        this.title.setTitle('Chỉnh sửa màn hình')
        this.nameTitle = 'Chỉnh sửa màn hình'
        this.productService.findById(id).subscribe(
          next => {
            this.formMonitor.patchValue(next)
            this.fb = next.image
          }
      )
        this.selectedImage = this.formMonitor.controls.image.value
      }
    })
  }
  showPreview(event: any) {
    this.errorMonitor.image = false;
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
            this.formMonitor.patchValue({image: url});
            this.src = url;
            console.log('link: ', this.fb);
            this.src = url;
          });
        })
      )
      .subscribe();
  }

  createMonitor() {
    this.reload();
    this.productService.createMonitor(this.formMonitor.value).subscribe(
      next => {
        let image = this.formMonitor.controls.image.value
        if (this.isCreate) {
          Swal.fire({
            title:'Bạn đã thêm màn hình ' + this.formMonitor.controls.name.value +' vào kho!',
            imageUrl: image + '',
            showConfirmButton: false,
            timer: 2000,
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'Custom image',
          })
        } else {
          Swal.fire({
            title:'Bạn đã chỉnh sửa màn hình ' + this.formMonitor.controls.name.value +' thành công!',
            imageUrl: image + '',
            showConfirmButton: false,
            timer: 2000,
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'Custom image',
          })
        }
        this.formMonitor.reset()
        this.router.navigateByUrl('/manager')
      },error => {
        for (let i = 0; i < error.error.length; i++) {
          if (error.error[i].field == 'name') {
            this.errorMonitor.name = true;
            this.errorMessageMonitor.name = error.error[i].defaultMessage;
            this.formMonitor.controls.name.reset()
          } else if(error.error[i].field == 'price') {
            this.errorMonitor.price = true;
            this.errorMessageMonitor.price = error.error[i].defaultMessage;
            this.formMonitor.controls.price.reset()
          } else if(error.error[i].field == 'oldPrice') {
            this.errorMonitor.oldPrice = true;
            this.errorMessageMonitor.oldPrice = error.error[i].defaultMessage;
            this.formMonitor.controls.oldPrice.reset()

          }
          else if(error.error[i].field == 'image') {
            this.errorMonitor.image = true;
            this.errorMessageMonitor.image = error.error[i].defaultMessage;
            this.formMonitor.controls.image.reset()
          }else if(error.error[i].field == 'screenSize') {
            this.errorMonitor.screenSize = true;
            this.errorMessageMonitor.screenSize = error.error[i].defaultMessage;
            this.formMonitor.controls.screenSize.reset()
          }else if(error.error[i].field == 'resolution') {
            this.errorMonitor.resolution = true;
            this.errorMessageMonitor.resolution = error.error[i].defaultMessage;
            this.formMonitor.controls.resolution.reset()
          }else if(error.error[i].field == 'scanFrequency') {
            this.errorMonitor.scanFrequency = true;
            this.errorMessageMonitor.scanFrequency = error.error[i].defaultMessage;
            this.formMonitor.controls.scanFrequency.reset()
          }else if(error.error[i].field == 'aspectRatio') {
            this.errorMonitor.aspectRatio = true;
            this.errorMessageMonitor.aspectRatio = error.error[i].defaultMessage;
            this.formMonitor.controls.aspectRatio.reset()

          }else if(error.error[i].field == 'connector') {
            this.errorMonitor.connector = true;
            this.errorMessageMonitor.connector = error.error[i].defaultMessage;
            this.formMonitor.controls.connector.reset()
          }else if(error.error[i].field == 'panels') {
            this.errorMonitor.panels = true;
            this.errorMessageMonitor.panels = error.error[i].defaultMessage;
            this.formMonitor.controls.panels.reset()
          }
        }
      }
    )
  }

}
