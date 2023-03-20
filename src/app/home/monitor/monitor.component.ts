import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css']
})
export class MonitorComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  goHome() {
    this.router.navigateByUrl('/')
  }
}
