import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  constructor(private title:Title) { }

  ngOnInit(): void {
    window.scroll(0,0)
    this.title.setTitle('Tin tức')
  }

}
