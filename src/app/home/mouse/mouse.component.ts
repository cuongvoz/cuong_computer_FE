import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-mouse',
  templateUrl: './mouse.component.html',
  styleUrls: ['./mouse.component.css']
})
export class MouseComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  goHome() {
    this.router.navigateByUrl('/')
  }

}
