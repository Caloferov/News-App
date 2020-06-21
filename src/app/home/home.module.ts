import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { PopoverMenuComponent } from '../popover-menu/popover-menu.component';
import { SharedModule } from '../shared/shared.module';
import { SkeletonComponent } from '../skeleton/skeleton.component';


@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, PopoverMenuComponent, SkeletonComponent]
})
export class HomePageModule {}
