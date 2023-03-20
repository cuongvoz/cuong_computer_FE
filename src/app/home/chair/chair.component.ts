import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-chair',
  templateUrl: './chair.component.html',
  styleUrls: ['./chair.component.css']
})
export class ChairComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  goHome() {
    this.router.navigateByUrl('/')
  }
}
