import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TreeRoutingModule } from './tree-routing.module';
import { TreeComponent } from './tree.component';
import { ToysToHangComponent } from './../../app_views/toys-to-hang/toys-to-hang.component'
import { DecorateServiceComponent } from './../../app_services/decorate-service/decorate-service.component'

@NgModule({
  declarations: [
    TreeComponent,
    ToysToHangComponent,
    DecorateServiceComponent,
  ],
  imports: [CommonModule, TreeRoutingModule],
})
export class TreeModule {}
