import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuLotesPage } from './menu-lotes.page';

const routes: Routes = [
  {
    path: '',
    component: MenuLotesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuLotesPageRoutingModule {}
