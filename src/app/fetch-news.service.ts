import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class FetchNewsService {
  // corsProxyUrl = 'https://cors-proxy.htmldriven.com/?url=';
  corsProxyUrl = 'https://cors-anywhere.herokuapp.com/'
  dirRssUrl = 'https://dir.bg/feeds/rss';
  faktiRssUrl = this.corsProxyUrl + 'https://fakti.bg/feed';
  chasa24RssUrl = this.corsProxyUrl + 'https://www.24chasa.bg/Rss';

  articles = [];

  constructor(private http: HttpClient) {
    this.getAllData();
    console.log(this.articles);
  }

  async getAllData() {
    await this.getRSSAndPushNodeItemsToArray(this.dirRssUrl);
    // await this.getRSSAndPushNodeItemsToArray(this.faktiRssUrl);
    // await this.getRSSAndPushNodeItemsToArray(this.chasa24RssUrl);

  }

  getRSSAndPushNodeItemsToArray(url) {
    this.http.get(url, { responseType: 'text' }).subscribe(async (resp) => {
      let nodeList = new window.DOMParser().parseFromString(resp, "text/xml").querySelectorAll('item');
    
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
    });
  }

}
