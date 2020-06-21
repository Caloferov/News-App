import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from '../about/about.component';
import { SkeletonComponent } from '../skeleton/skeleton.component';



@NgModule({
  declarations: [AboutComponent],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
