import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Subject } from 'rxjs';
import { AppRate } from '@ionic-native/app-rate/ngx';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  showContent = 'content'
  showPopover: boolean = false;
  showSearchbar: boolean = false;
  resetSearchValueSub = new Subject<any>();

  constructor(private platform: Platform,
    private appRate: AppRate
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
    // set certain preferences
    this.appRate.preferences.storeAppURL = {
      ios: 'novonews',
      android: 'market://details?id=novonews',
    }

    this.appRate.promptForRating(true);

  }

  goHome() {
    this.showContent = 'content';
    this.showPopover = false;
  }
}
