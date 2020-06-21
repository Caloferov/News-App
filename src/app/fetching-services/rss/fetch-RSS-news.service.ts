import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class FetchRSSNewsService {
  // corsProxyUrl = 'https://cors-proxy.htmldriven.com/?url=';
  corsProxyUrl = 'https://cors-anywhere.herokuapp.com/'
  dirRssUrl = 'https://dir.bg/feeds/rss';

  articles;

  // Hard to read Image sources for those RSS feeds:
  // faktiRssUrl = this.corsProxyUrl + 'https://fakti.bg/feed';
  // chasa24RssUrl = this.corsProxyUrl + 'https://www.24chasa.bg/Rss';


  constructor(private http: HttpClient) {
    // this.getAllData();
  }

  // async getAllData() {
  //   await this.getRSSAndPushNodeItemsToArray(this.dirRssUrl);
  //   await this.getRSSAndPushNodeItemsToArray(this.faktiRssUrl);
  //   await this.getRSSAndPushNodeItemsToArray(this.chasa24RssUrl);
  // }

  fetchRSS(url) {
    return this.http.get(url, { responseType: 'text' })
  }

  extractDirRSS(RSSResponse) {
    let source = new DOMParser().parseFromString(RSSResponse, "text/xml").querySelector("channel > title").innerHTML;
    let nodeList = new DOMParser().parseFromString(RSSResponse, "text/xml").querySelectorAll('item');

    for (var i = 0, ref = nodeList.length; i < ref; i++) {
      let title = nodeList[i].querySelector('title').innerHTML;
      let link = nodeList[i].querySelector('link').innerHTML;
      let pubDate = nodeList[i].querySelector('pubDate').innerHTML;
      let imageURL = nodeList[i].querySelector('enclosure').attributes[0].nodeValue;

      let article = {
        source,
        title,
        link,
        pubDate,
        imageURL
      }

      this.articles.push(article);
    }
  }

}
