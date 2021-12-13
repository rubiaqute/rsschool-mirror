import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ToysComponent } from './toys.component';

const routes: Routes = [{ path: '', component: ToysComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ToysRoutingModule { }
