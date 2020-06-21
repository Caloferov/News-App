import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { PopoverMenuComponent } from '../popover-menu/popover-menu.component';
import { SkeletonComponent } from '../skeleton/skeleton.component';
import { AboutComponent } from '../about/about.component';
import { HideHeaderDirective } from '../directives/hide-header.directive';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, PopoverMenuComponent, SkeletonComponent, AboutComponent, HideHeaderDirective]
})
export class HomePageModule {}
