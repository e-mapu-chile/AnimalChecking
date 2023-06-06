import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FiliacionAnimalPage } from './filiacion-animal.page';

const routes: Routes = [
  {
    path: '',
    component: FiliacionAnimalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FiliacionAnimalPageRoutingModule {}
