import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../../entity/product";
import {LaptopService} from "../../service/laptop/laptop.service";

@Component({
  selector: 'app-laptop',
  templateUrl: './laptop.component.html',
  styleUrls: ['./laptop.component.css']
})
export class LaptopComponent implements OnInit {
  laptops:Product[];
  constructor(private router:Router,private laptopService:LaptopService,private activate:ActivatedRoute) { }

  ngOnInit(): void {
    this.loader();
  }
  loader() {
    this.activate.paramMap.subscribe(next => {
      let name = next.get('name');
      console.log(name)

      if (name != null) {
        this.laptopService.searchLaptop(name).subscribe(data => {
          this.laptops = data['content'];
        })
      } else {
        this.laptopService.getAll().subscribe(data => {
          this.laptops = data['content'];
        })
      }
    })
  }

  goHome() {
    this.router.navigateByUrl('/')
  }
}
