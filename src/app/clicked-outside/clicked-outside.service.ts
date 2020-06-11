import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClickedOutsideService {
  itsClickedOnSub = new Subject<string>();

  constructor() { }

  itClickedOn(element: string) {
    this.itsClickedOnSub.next(element)
  }
}
