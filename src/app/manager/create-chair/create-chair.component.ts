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
  selector: 'app-create-chair',
  templateUrl: './create-chair.component.html',
  styleUrls: ['./create-chair.component.css']
})
export class CreateChairComponent implements OnInit {
  nameTitle = 'THÊM MỚI GHẾ'
  isCreate = true;
  products:Product[];
  formChair = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    price: new FormControl(),
    oldPrice: new FormControl(),
    image: new FormControl(),
    material: new FormControl(),
    kneelings: new FormControl(),
    brand: new FormControl(),
    model: new FormControl(),
    backrest: new FormControl(),
    category: new FormControl({id: 6,name:'Ghế'}),

  })
  errorChair = {
    name: false,
    price: false,
    oldPrice: false,
    image: false,
    material: false,
    kneelings: false,
    brand: false,
    model: false,
    backrest: false,
  }
  errorMessageChair = {
    name: '',
    price: '',
    oldPrice: '',
    image: '',
    material: '',
    kneelings: '',
    brand: '',
    model: '',
    backrest: '',
  }
  reload() {
    this.errorMessageChair = {
      name: '',
      price: '',
      oldPrice: '',
      image: '',
      material: '',
      kneelings: '',
      brand: '',
      model: '',
      backrest: '',
    }
    this.errorChair = {
      name: false,
      price: false,
      oldPrice: false,
      image: false,
      material: false,
      kneelings: false,
      brand: false,
      model: false,
      backrest: false,
    }
  }
  selectedImage: any;
  url: any;
  downloadURL: Observable<string> | undefined;
  fb: string | undefined= 'https://minhancomputercdn.com/media/product/5808_gh____ch__i_game___a_ch___c_n__ng_cluvens_scorpion_computer_cockpit.jpg';
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
        this.title.setTitle('Chỉnh sửa ghế')
        this.nameTitle = 'CHỈNH SỬA GHẾ'
        this.productService.findById(id).subscribe(
          next => {
            this.formChair.patchValue(next)
            this.fb = next.image
          }
        )
        this.fb = this.formChair.controls.image.value
        this.selectedImage = this.formChair.controls.image.value
      }
    })
  }
  showPreview(event: any) {
    this.errorChair.image = false;
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
            this.formChair.patchValue({image: url});
            this.src = url;
            console.log('link: ', this.fb);
          });
        })
      )
      .subscribe();
  }

  createChair() {
    this.reload();
    this.productService.createChair(this.formChair.value).subscribe(
      next => {
        if (this.isCreate) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Bạn đã thêm ghế ' + this.formChair.controls.name.value +' vào kho!',
            showConfirmButton: false,
            timer: 1500
          })
        } else {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Bạn đã chỉnh sửa ghế ' + this.formChair.controls.name.value +' thành công!',
            showConfirmButton: false,
            timer: 1500
          })
        }
        this.router.navigateByUrl('/manager')
        this.formChair.reset()
      },error => {
        for (let i = 0; i < error.error.length; i++) {
          if (error.error[i].field == 'name') {
            this.errorChair.name = true;
            this.errorMessageChair.name = error.error[i].defaultMessage;
            this.formChair.controls.name.reset()
          } else if(error.error[i].field == 'price') {
            this.errorChair.price = true;
            this.errorMessageChair.price = error.error[i].defaultMessage;
            this.formChair.controls.price.reset()
          } else if(error.error[i].field == 'oldPrice') {
            this.errorChair.oldPrice = true;
            this.errorMessageChair.oldPrice = error.error[i].defaultMessage;
            this.formChair.controls.oldPrice.reset()
          }
          else if(error.error[i].field == 'image') {
            this.errorChair.image = true;
            this.errorMessageChair.image = error.error[i].defaultMessage;
            this.formChair.controls.image.reset()
          }else if(error.error[i].field == 'material') {
            this.errorChair.material = true;
            this.errorMessageChair.material = error.error[i].defaultMessage;
            this.formChair.controls.material.reset()
          }else if(error.error[i].field == 'kneelings') {
            this.errorChair.kneelings = true;
            this.errorMessageChair.kneelings = error.error[i].defaultMessage;
            this.formChair.controls.kneelings.reset()
          }else if(error.error[i].field == 'model') {
            this.errorChair.model = true;
            this.errorMessageChair.model = error.error[i].defaultMessage;
            this.formChair.controls.model.reset()
          }else if(error.error[i].field == 'backrest') {
            this.errorChair.backrest = true;
            this.errorMessageChair.backrest = error.error[i].defaultMessage;
            this.formChair.controls.backrest.reset()
          }else if(error.error[i].field == 'brand') {
            this.errorChair.brand = true;
            this.errorMessageChair.brand = error.error[i].defaultMessage;
            this.formChair.controls.brand.reset()
          }
        }
      }
    )
  }
}
