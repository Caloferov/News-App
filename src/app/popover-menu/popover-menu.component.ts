import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../theme-service/theme.service';

@Component({
  selector: 'app-popover-menu',
  templateUrl: './popover-menu.component.html',
  styleUrls: ['./popover-menu.component.scss'],
})
export class PopoverMenuComponent implements OnInit {
  toggleDarkModel: boolean;

  constructor(public themeService: ThemeService) { }

  ngOnInit() {
    
  }

}
