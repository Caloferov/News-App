import { Component, ViewChild } from '@angular/core';
import { IonInfiniteScroll, IonSearchbar } from '@ionic/angular';
import { FetchRSSNewsService } from '../fetching-services/rss/fetch-RSS-news.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ClickedOutsideService } from '../clicked-outside/clicked-outside.service';
import { ThemeService } from '../theme-service/theme.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(IonInfiniteScroll, { read: true, static: true }) infiniteScroll: IonInfiniteScroll;

  @ViewChild('searchbar', { static: false }) searchbar: IonSearchbar;

  articles = [];
  backupArticles = [];
  showPopover: boolean = false;
  showSearchbar: boolean = false;

  constructor(
    private fetchRSSNewsService: FetchRSSNewsService,
    private iab: InAppBrowser,
    public clickedOutsideService: ClickedOutsideService,
    public themeService: ThemeService
  ) { }

  ngOnInit() {
    this.fetchRSSNewsService.fetchRSS(this.fetchRSSNewsService.dirRssUrl).subscribe(resp => {
      this.extractDirRSS(resp);
    }
    )

    this.clickedOutsideService.itsClickedOnSub.subscribe({
      next: (clickedOn) => {
        if (clickedOn === 'content') {
          this.showSearchbar = false;
          this.showPopover = false;
        }
        if (clickedOn === 'middleHeader') {
          this.showPopover = false;
        }

      }
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

  openArticle(url) {
    if (!this.showPopover) {
      const browser = this.iab.create(url);
    } else {
      this.showPopover = false;
    }
  }

  showSearch() {
    this.showSearchbar = !this.showSearchbar;
    if (this.showSearchbar) {
      this.searchbar.setFocus();
      this.backupArticles = this.articles
    }
    this.showPopover = false;
  }

  showPopoverMenu() {
    this.showPopover = !this.showPopover
  }

  onScroll(event) {
    console.log(event)
  }

  onSearchValueChange(event) {
    let searchValue = event.detail.value;
    this.articles = this.backupArticles.filter(article => article.title.toLowerCase().includes(searchValue.toLowerCase()));
    console.log(this.articles)
  }

}
