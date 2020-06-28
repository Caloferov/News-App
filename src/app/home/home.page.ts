import { Component, ViewChild } from '@angular/core';
import { IonInfiniteScroll, IonSearchbar } from '@ionic/angular';
import { FetchRSSNewsService } from '../fetching-services/rss/fetch-RSS-news.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ClickedOutsideService } from '../clicked-outside/clicked-outside.service';
import { ThemeService } from '../theme-service/theme.service';
import { NavigationService } from '../navigation-service/navigation.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChild(IonInfiniteScroll, { read: true, static: true }) infiniteScroll: IonInfiniteScroll;
  @ViewChild('searchbar', { static: false }) searchbar: IonSearchbar;

  headerMarginTop = 0;
  backupArticles = [];
  searchValue;
  lastYScrollValue: any;
  animateMargin: boolean = true;
  currScrollTop: any;
  scrollWasDown: boolean;
  scrollDirection: string;
  scrollHasEnded: boolean;
  absMargin: number;

  constructor(
    private navigationService: NavigationService,
    private fetchRSSNewsService: FetchRSSNewsService,
    private iab: InAppBrowser,
    public clickedOutsideService: ClickedOutsideService,
    public themeService: ThemeService
  ) { }

  ngOnInit() {
    this.clickedOutsideService.itsClickedOnSub.subscribe({
      next: (clickedOn) => {
        if (clickedOn === 'content') {
          this.navigationService.showSearchbar = false;
          this.navigationService.showPopover = false;
        }
        if (clickedOn === 'middleHeader') {
          this.navigationService.showPopover = false;
        }
      }
    }
    )

    this.navigationService.resetSearchValueSub.subscribe(() => {
      this.resetSearch();
    });
  }

  ngAfterViewInit() {
    this.fetchRSSNewsService.articles = [];
    this.fetchRSSNewsService.fetchRSS(this.fetchRSSNewsService.dirRssUrl).subscribe(resp => {
      this.fetchRSSNewsService.extractDirRSS(resp);

      this.fetchRSSNewsService.fetchRSS(this.fetchRSSNewsService.faktiRssUrl).subscribe(resp => {
        this.fetchRSSNewsService.extractFaktiRSS(resp);

        this.fetchRSSNewsService.fetchRSS(this.fetchRSSNewsService.chasa24RssUrl).subscribe(resp => {
          this.fetchRSSNewsService.extract24chasa(resp);
        });
      });
    }
    );
  }

  infiniteLoadData(event) {
    // Load more data here 

    // Stops the loading animation when data is loaded
    // event.target.complete();


    // App logic to determine if all data is loaded
    // and disable the infinite scroll
    if (this.fetchRSSNewsService.allLoaded == true) {
      event.target.disabled = true;
    }
  }


  openArticle(url) {
    if (!this.navigationService.showPopover) {
      const browser = this.iab.create(url);
    } else {
      this.navigationService.showPopover = false;
    }
  }

  showSearch() {
    this.navigationService.showSearchbar = !this.navigationService.showSearchbar;
    if (this.navigationService.showSearchbar) {
      this.searchbar.setFocus();
      this.backupArticles = this.fetchRSSNewsService.articles
    } else {
      this.searchValue = null;
    }
    this.navigationService.showPopover = false;
  }

  resetSearch() {
    this.searchValue = null;
    this.fetchRSSNewsService.articles = this.backupArticles.filter(article => article.title.toLowerCase().includes(''));
  }

  showPopoverMenu() {
    this.navigationService.showPopover = !this.navigationService.showPopover
  }

  onScroll(event) {
    this.currScrollTop = event.detail.scrollTop;
    this.animateMargin = false;
    if (this.currScrollTop > this.lastYScrollValue) {
      // Scrolling down
      if (this.headerMarginTop > -56) {
        let step = this.currScrollTop - this.lastYScrollValue;
        let bufferMargin = this.headerMarginTop - step;
        if (bufferMargin < -56) {
          this.headerMarginTop = -56;
        } else {
          this.headerMarginTop = bufferMargin;
        }
        this.scrollDirection = "down";
      }
    } else {
      // Scrolling up
      this.scrollDirection = "up";
      if (this.headerMarginTop < 0) {
        let step = this.lastYScrollValue - this.currScrollTop;
        let bufferMargin = this.headerMarginTop + step;
        if (bufferMargin > 0) {
          this.headerMarginTop = 0
        } else {
          this.headerMarginTop = bufferMargin;
        }
      }
    }
    this.absMargin = Math.abs(this.headerMarginTop);
    this.lastYScrollValue = this.currScrollTop;
    this.navigationService.showPopover = false;
  }

  onScrollEnd() {
    // this.scrollHasEnded = true;
  }

  onTouchEnd() {
    // this.animateMargin = true;

    //   if (this.scrollDirection === 'down') {
    //     this.headerMarginTop = -56;
    //   } else {
    //     this.headerMarginTop = 0;
    //   }
  }

  onSearchValueChange(event) {
    this.searchValue = event.detail.value;
    this.fetchRSSNewsService.articles = this.backupArticles.filter(
      article => article.title.toLowerCase().includes(this.searchValue.toLowerCase()));
  }

}
