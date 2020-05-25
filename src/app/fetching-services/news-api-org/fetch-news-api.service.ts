import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FetchNewsAPIService {
  APIkey = "e3da9aa4e12243df9fe65d0d291682ef";
  topBGHeadlinesURL = `https://newsapi.org/v2/top-headlines?country=bg&apiKey=${this.APIkey}`;

  header = {
    headers: new HttpHeaders()
      .set('Authorization',  `${this.APIkey}`)
  }

  constructor(private http: HttpClient) { }

  fetchNews() {
    return this.http.get(this.topBGHeadlinesURL, this.header)
  }
}