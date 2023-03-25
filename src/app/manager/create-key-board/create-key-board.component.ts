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
  selector: 'app-create-key-board',
  templateUrl: './create-key-board.component.html',
  styleUrls: ['./create-key-board.component.css']
})
export class CreateKeyBoardComponent implements OnInit {
  nameTitle = 'THÊM MỚI BÀN PHÍM'
  isCreate = true;
  products:Product[];
  formKeyBoard = new FormGroup({
    id: new FormControl(),
    name: new FormControl(),
    price: new FormControl(),
    oldPrice: new FormControl(),
    image: new FormControl(),
    keyboard: new FormControl(),
    connect: new FormControl(),
    keycap: new FormControl(),
    switchKey: new FormControl(),
    reliability: new FormControl(),
    compatible: new FormControl(),
    category: new FormControl({id: 3,name:'Bàn phím'}),
  })
  errorKeyboard = {
    name: false,
    price: false,
    oldPrice: false,
    image: false,
    keyboard: false,
    connect: false,
    keycap: false,
    switchKey: false,
    reliability: false,
    compatible: false,
  }
  errorMessageKeyboard = {
    name: '',
    price: '',
    oldPrice: '',
    image: '',
    keyboard: '',
    connect: '',
    keycap: '',
    switchKey: '',
    reliability: '',
    compatible: '',
  }
  reload() {
    this.errorMessageKeyboard = {
      name: '',
      price: '',
      oldPrice: '',
      image: '',
      keyboard: '',
      connect: '',
      keycap: '',
      switchKey: '',
      reliability: '',
      compatible: '',
    }
    this.errorKeyboard = {
      name: false,
      price: false,
      oldPrice: false,
      image: false,
      keyboard: false,
      connect: false,
      keycap: false,
      switchKey: false,
      reliability: false,
      compatible: false,
    }
  }
  selectedImage: any;
  url: any;
  downloadURL: Observable<string> | undefined;
  fb: string | undefined= 'https://phucanhcdn.com/media/product/28563_ba__n_phi__m_c___logitech_g_pro_gaming__usb__1.jpg';
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
        this.title.setTitle('Chỉnh sửa bàn phím')
        this.nameTitle = 'CHỈNH SỬA BÀN PHÍM'
        this.productService.findById(id).subscribe(
          next => {
            this.formKeyBoard.patchValue(next)
            this.fb = next.image
          }
        )
        this.fb = this.formKeyBoard.controls.image.value
        this.selectedImage = this.formKeyBoard.controls.image.value
      }
    })
  }
  showPreview(event: any) {
    this.errorKeyboard.image = false;
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
            this.formKeyBoard.patchValue({image: url});
            this.src = url;
            console.log('link: ', this.fb);
            this.src = url;
          });
        })
      )
      .subscribe();
  }

  createKeyboard() {
    this.reload();
    this.productService.createKeyboard(this.formKeyBoard.value).subscribe(
      next => {
        let image = this.formKeyBoard.controls.image.value
        if (this.isCreate) {
          Swal.fire({
            title:'Bạn đã thêm bàn phím ' + this.formKeyBoard.controls.name.value +' vào kho!',
            imageUrl: image + '',
            showConfirmButton: false,
            timer: 2000,
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'Custom image',
          })
        } else {
          Swal.fire({
            title:'Bạn đã chỉnh sửa bàn phím ' + this.formKeyBoard.controls.name.value +' thành công!',
            imageUrl: image + '',
            showConfirmButton: false,
            timer: 2000,
            imageWidth: 200,
            imageHeight: 200,
            imageAlt: 'Custom image',
          })
        }
        this.formKeyBoard.reset()
        this.router.navigateByUrl('/manager')
      },error => {
        for (let i = 0; i < error.error.length; i++) {
          if (error.error[i].field == 'name') {
            this.errorKeyboard.name = true;
            this.errorMessageKeyboard.name = error.error[i].defaultMessage;
            this.formKeyBoard.controls.name.reset()
          } else if(error.error[i].field == 'price') {
            this.errorKeyboard.price = true;
            this.errorMessageKeyboard.price = error.error[i].defaultMessage;
            this.formKeyBoard.controls.price.reset()
          } else if(error.error[i].field == 'oldPrice') {
            this.errorKeyboard.oldPrice = true;
            this.errorMessageKeyboard.oldPrice = error.error[i].defaultMessage;
            this.formKeyBoard.controls.oldPrice.reset()
          }
          else if(error.error[i].field == 'image') {
            this.errorKeyboard.image = true;
            this.errorMessageKeyboard.image = error.error[i].defaultMessage;
            this.formKeyBoard.controls.image.reset()
          }else if(error.error[i].field == 'keyboard') {
            this.errorKeyboard.keyboard = true;
            this.errorMessageKeyboard.keyboard = error.error[i].defaultMessage;
            this.formKeyBoard.controls.keyboard.reset()
          }else if(error.error[i].field == 'connect') {
            this.errorKeyboard.connect = true;
            this.errorMessageKeyboard.connect = error.error[i].defaultMessage;
            this.formKeyBoard.controls.connect.reset()
          }else if(error.error[i].field == 'switchKey') {
            this.errorKeyboard.switchKey = true;
            this.errorMessageKeyboard.switchKey = error.error[i].defaultMessage;
            this.formKeyBoard.controls.switchKey.reset()
          }else if(error.error[i].field == 'reliability') {
            this.errorKeyboard.reliability = true;
            this.errorMessageKeyboard.reliability = error.error[i].defaultMessage;
            this.formKeyBoard.controls.reliability.reset()
          }else if(error.error[i].field == 'keycap') {
            this.errorKeyboard.keycap = true;
            this.errorMessageKeyboard.keycap = error.error[i].defaultMessage;
            this.formKeyBoard.controls.keycap.reset()
          }else if(error.error[i].field == 'compatible') {
            this.errorKeyboard.compatible = true;
            this.errorMessageKeyboard.compatible = error.error[i].defaultMessage;
            this.formKeyBoard.controls.compatible.reset()
          }
        }
      }
    )
  }

}
