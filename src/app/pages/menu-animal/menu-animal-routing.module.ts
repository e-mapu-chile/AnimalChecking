import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuAnimalPage } from './menu-animal.page';

const routes: Routes = [
  {
    path: '',
    component: MenuAnimalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuAnimalPageRoutingModule {}
