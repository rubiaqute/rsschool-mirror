import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TreeRoutingModule } from './tree-routing.module';
import { TreeComponent } from './tree.component';


@NgModule({
  declarations: [
    TreeComponent
  ],
  imports: [
    CommonModule,
    TreeRoutingModule
  ]
})
export class TreeModule { }
