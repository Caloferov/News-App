import { Component, ViewChild } from '@angular/core';
import { IonInfiniteScroll, AnimationController } from '@ionic/angular';
import { FetchRSSNewsService } from '../fetching-services/rss/fetch-RSS-news.service';

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

  articles = [];
  showPopover: boolean = false;

  constructor(private fetchRSSNewsService: FetchRSSNewsService,
     private animationCtrl: AnimationController) { }

  ngOnInit() {
    this.fetchRSSNewsService.fetchRSS(this.fetchRSSNewsService.dirRssUrl).subscribe(resp => {
      this.extractDirRSS(resp);
    }
    )
  }

  infiniteLoadData(event) {
    // Load more data here 

    // Stops the loading animation when data is loaded
    event.target.complete();

    // App logic to determine if all data is loaded
    // and disable the infinite scroll
    if (this.articles.length == 1000) {
      event.target.disabled = true;
    }
  }

  extractDirRSS(RSSResponse) {
    let nodeList = new DOMParser().parseFromString(RSSResponse, "text/xml").querySelectorAll('item');

    for (var i = 0, ref = nodeList.length; i < ref; i++) {
      let title = nodeList[i].querySelector('title').innerHTML;
      let link = nodeList[i].querySelector('link').innerHTML;
      let pubDate = nodeList[i].querySelector('pubDate').innerHTML;
      let imageURL = nodeList[i].querySelector('enclosure').attributes[0].nodeValue;

      let article = {
        title: title,
        link: link,
        pubDate: pubDate,
        imageURL: imageURL
      }

      this.articles.push(article);
    }
  }

}
