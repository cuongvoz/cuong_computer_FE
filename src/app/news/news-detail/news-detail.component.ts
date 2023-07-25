import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent implements OnInit {
  news = 4;
  title = '';
  currentTime = new Date();
  formattedTime = this.currentTime.toLocaleString();
  title1 = 'Tất cả các linh kiện đều giảm nhiệt nhưng giá của VGA vẫn còn "Hơi đắt"'
  title2 = 'DẪN ĐẦU PHONG CÁCH – CHINH PHỤC THỬ THÁCH'
  title3 = 'NHẬN NGAY QUÀ TẶNG TỔNG TRỊ GIÁ LÊN ĐẾN 15 TRIỆU ĐỒNG KHI MUA SẢN PHẨM ASUS TUF GAMING!!!'
  title4 = 'Dying Light Enhanced Edition sẽ được phát tặng miễn phí'
  constructor(private activate:ActivatedRoute,private titlez:Title) { }

  ngOnInit(): void {
    window.scroll(0,0)
    this.titlez.setTitle('Tin tức')
    this.activate.paramMap.subscribe(next => {
      let id = next.get('id')
      this.news = parseInt(id);
      switch (this.news) {
        case 1:
          this.title = this.title1;
          break;
        case 2:
          this.title = this.title2;
          break;
        case 3:
          this.title = this.title3;
          break;
        case 4:
          this.title = this.title4;
          break;
      }

    })
  }
  change(id) {
    window.scroll(0,140)
    this.news = id;
    switch (this.news) {
    case 1:
      this.title = this.title1;
      break;
    case 2:
      this.title = this.title2;
      break;
    case 3:
      this.title = this.title3;
      break;
    case 4:
      this.title = this.title4;
      break;
    }
  }
}
