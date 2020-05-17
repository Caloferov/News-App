import { Component, ViewChild } from '@angular/core';
import { FetchNewsService } from '../fetch-news.service';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(IonInfiniteScroll, {
    read: true,
    static: true
  }) infiniteScroll: IonInfiniteScroll;

  constructor(public fetchNewsService: FetchNewsService) { }


  loadData(event) {
    console.log(event);
    event.target.complete();

    // App logic to determine if all data is loaded
    // and disable the infinite scroll
    if (this.fetchNewsService.articles.length > 100) {
      event.target.disabled = true;
    }

  }

  ngOnInit() {

  }
}
