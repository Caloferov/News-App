import { Component } from '@angular/core';
import { FetchNewsService } from '../fetch-news.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public fetchNewsService: FetchNewsService) {}

  ngOnInit() {
    
  }
}
