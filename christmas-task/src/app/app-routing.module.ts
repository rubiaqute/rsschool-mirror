import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: 'toys', loadChildren: () => import('../app_pages/toys/toys.module').then(m => m.ToysModule) }, { path: 'tree', loadChildren: () => import('./../app_pages/tree/tree.module').then(m => m.TreeModule) }, { path: 'start', loadChildren: () => import('./../app_pages/start/start.module').then(m => m.StartModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
