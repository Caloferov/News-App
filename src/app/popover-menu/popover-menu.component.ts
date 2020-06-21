import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../theme-service/theme.service';
import { NavigationService } from '../navigation-service/navigation.service';

@Component({
  selector: 'app-popover-menu',
  templateUrl: './popover-menu.component.html',
  styleUrls: ['./popover-menu.component.scss'],
})
export class PopoverMenuComponent implements OnInit {
  toggleDarkModel: boolean;

  constructor(private navigationService: NavigationService,
    public themeService: ThemeService) { }

  ngOnInit() {
  }

}
