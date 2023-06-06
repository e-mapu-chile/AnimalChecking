import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VacunacionPage } from './vacunacion.page';

const routes: Routes = [
  {
    path: '',
    component: VacunacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VacunacionPageRoutingModule {}
