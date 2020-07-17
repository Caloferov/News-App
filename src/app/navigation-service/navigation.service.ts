import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Subject } from 'rxjs';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  showContent = 'content'
  showPopover: boolean = false;
  showSearchbar: boolean = false;
  resetSearchValueSub = new Subject<any>();

  constructor(private platform: Platform,
    private iab: InAppBrowser,
  ) {
    //Processing back button/gesture in order:
    this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
      if (this.showPopover) {
        this.showPopover = false;
      } else {
        processNextHandler();
      }
    });

    this.platform.backButton.subscribeWithPriority(9, (processNextHandler) => {
      if (this.showSearchbar) {
        this.resetSearchValueSub.next();
        this.showSearchbar = false;
      } else {
        processNextHandler();
      }
    });

    this.platform.backButton.subscribeWithPriority(8, (processNextHandler) => {
      if (this.showContent === 'about') {
        this.showContent = 'content';
      } else {
        processNextHandler();
      }
    });

    this.platform.backButton.subscribeWithPriority(-1, () => {
      navigator['app'].exitApp();
    });
  }

  navigateToAbout() {
    this.showContent = 'about';
    this.showPopover = false;
    this.showSearchbar = false;
  }

  navigateToRatePlayStore() {
    let playStoreUrl = "https://play.google.com/store/apps/details?id=com.novonews.android"
    const browser = this.iab.create(playStoreUrl);
  }

  goHome() {
    this.showContent = 'content';
    this.showPopover = false;
  }
}
