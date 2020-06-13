import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  toggleIsChecked: boolean;

  constructor(private storage: Storage) {
    this.storage.get('darkIsOn').then(pref => {
      this.toggleIsChecked = pref;
      this.toggleTheme(pref)
    })
  }

  toggleTheme(onOrOff) {
    document.body.classList.toggle('dark', onOrOff);
    this.toggleIsChecked = onOrOff;
    this.storage.set('darkIsOn', this.toggleIsChecked);
  }

}
