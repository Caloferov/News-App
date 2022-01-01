import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class FetchRSSNewsService {
  corsProxyUrl = 'https://thingproxy.freeboard.io/fetch/';
  // Old Proxy - now working any more.
  // corsProxyUrl = 'https://cors-anywhere.herokuapp.com/'
  dirRssUrl = 'https://dir.bg/feeds/rss';
  bufferArcicles = [];
  articles;
  allLoaded: boolean = false;
  showSkeleton: boolean = true;

  // Hard to read Image sources for those RSS feeds:
  faktiRssUrl = this.corsProxyUrl + 'https://fakti.bg/feed';
  chasa24RssUrl = this.corsProxyUrl + 'https://www.24chasa.bg/Rss';


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
    let source = 'dir.bg';
    let nodeList = new DOMParser().parseFromString(RSSResponse, "text/xml").querySelectorAll('item');

    for (let i = 0, ref = nodeList.length; i < ref; i++) {
      let category = nodeList[i].querySelector('category').innerHTML;
      if (category !== "Футбол" && category !== 'Тенис') {
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

        if (i < 5) {
          this.articles.push(article)
        } else {
          this.bufferArcicles.push(article);
        }

        this.showSkeleton = false;
      } else {
        continue;
      }

    }

  }

  extractFaktiRSS(RSSResponse) {
    let source = 'fakti.bg';
    let nodeList = new DOMParser().parseFromString(RSSResponse, "text/xml").querySelectorAll('item');
    let patt = /(["'])(?:\\.|[^\\])*?\1/;
    let patternToExtractImgURL = new RegExp(patt);

    for (let i = 0, ref = nodeList.length; i < ref; i++) {
      let category = nodeList[i].querySelector('category').innerHTML;
      if (category !== "Спорт") {
        let title = nodeList[i].querySelector('title').innerHTML;
        let link = nodeList[i].querySelector('link').innerHTML;
        let pubDate = nodeList[i].querySelector('pubDate').innerHTML;
        let description = nodeList[i].querySelector('description').innerHTML;
        let imageURL = patternToExtractImgURL.exec(description)[0].slice(1, -1);

        let article = {
          source,
          title,
          link,
          pubDate,
          imageURL
        }

        if (i < 5) {
          this.articles.push(article)
        } else {
          this.bufferArcicles.push(article)
        }
      } else {
        continue;
      }
    }
    this.shuffleAndLoadTheRest();
  }

  extract24chasa(RSSResponse) {
    let source = '24 chasa';
    let nodeList = new DOMParser().parseFromString(RSSResponse, "text/xml").querySelectorAll('item');
    // let patt = /(["'])(?:\\.|[^\\])*?\1/;
    // let patternToExtractImgURL = new RegExp(patt);

    for (let i = 0, ref = nodeList.length; i < ref; i++) {
      let category = nodeList[i].querySelector('category').innerHTML;
      if (category !== "Спорт") {
        let title = nodeList[i].querySelector('title').innerHTML;
        let link = nodeList[i].querySelector('link').innerHTML;
        let pubDate = nodeList[i].querySelector('pubDate').innerHTML;
        let description = nodeList[i].querySelector('description').innerHTML;
        // let imageURLexexArray = patternToExtractImgURL.exec(description)
        let imageURL = '';
        // if (imageURLexexArray && imageURLexexArray.length) {
        //   imageURL = imageURLexexArray[0].slice(1, -1);
        //   if (!imageURL.includes('http')) {
        //     imageURL = '';
        //   }
        // } else {
        //   imageURL = '';
        // }

        let article = {
          source,
          title,
          link,
          pubDate,
          imageURL
        }

        this.articles.push(article);
      } else {
        continue;
      }
    }
    this.allLoaded = true;
  }

  shuffleAndLoadTheRest() {
    // Shuffle the array
    for (let i = this.bufferArcicles.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i)
      const temp = this.bufferArcicles[i]
      this.bufferArcicles[i] = this.bufferArcicles[j]
      this.bufferArcicles[j] = temp
    }

    this.articles = [...this.articles, ...this.bufferArcicles]

  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


}
