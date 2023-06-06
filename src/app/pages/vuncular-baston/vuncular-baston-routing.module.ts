import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VuncularBastonPage } from './vuncular-baston.page';

const routes: Routes = [
  {
    path: '',
    component: VuncularBastonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VuncularBastonPageRoutingModule {}
