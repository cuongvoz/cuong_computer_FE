import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.css']
})
export class KeyboardComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  goHome() {
    this.router.navigateByUrl('/')
  }
}
