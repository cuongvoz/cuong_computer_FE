import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-pc-gaming',
  templateUrl: './pc-gaming.component.html',
  styleUrls: ['./pc-gaming.component.css']
})
export class PcGamingComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  goHome() {
    this.router.navigateByUrl('/')
  }
}
