import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class FetchNewsService {
  corsProxyUrl = 'https://cors-proxy.htmldriven.com/?url=';
  dirRssUrl = 'https://dir.bg/feeds/rss';
  faktiRssUrl = this.corsProxyUrl + 'https://fakti.bg/feed';
  chasa24RssUrl = this.corsProxyUrl + 'https://www.24chasa.bg/Rss';

  allItemsArr = [];

  constructor(private http: HttpClient) {
    this.getAllData();
    console.log(this.allItemsArr);
  }

  async getAllData() {
    await this.getRSSAndPushNodeItemsToArray(this.dirRssUrl);
    await this.getRSSAndPushNodeItemsToArray(this.faktiRssUrl);
    await this.getRSSAndPushNodeItemsToArray(this.chasa24RssUrl);

  }

  getRSSAndPushNodeItemsToArray(url) {
    this.http.get(url, { responseType: 'text' }).subscribe((resp) => {
      let nodeList = new window.DOMParser().parseFromString(resp, "text/xml").querySelectorAll('item');
      for (var i = 0, ref = nodeList.length; i < ref; i++) {
        this.allItemsArr.push(nodeList[i]);
      }
    });
  }

}
