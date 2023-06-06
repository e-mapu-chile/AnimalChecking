import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PotrerosPage } from './potreros.page';

const routes: Routes = [
  {
    path: '',
    component: PotrerosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PotrerosPageRoutingModule {}
