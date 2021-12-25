import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TreeRoutingModule } from './tree-routing.module';
import { TreeComponent } from './tree.component';
import { ToysToHangComponent } from './../../app_views/toys-to-hang/toys-to-hang.component';
import { DecorateServiceComponent } from './../../app_services/decorate-service/decorate-service.component';
import { SettingsBarComponent } from './../../app_views/settings-bar/settings-bar.component';
import { PositionServiceComponent } from './../../app_services/position-service/position-service.component';
import { GarlandComponent } from './../../app_views/garland/garland.component';

@NgModule({
  declarations: [
    TreeComponent,
    ToysToHangComponent,
    DecorateServiceComponent,
    SettingsBarComponent,
    PositionServiceComponent,
    GarlandComponent,
  ],
  imports: [CommonModule, TreeRoutingModule],
})
export class TreeModule {}
