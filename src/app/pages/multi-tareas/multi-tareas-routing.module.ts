import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MultiTareasPage } from './multi-tareas.page';

const routes: Routes = [
  {
    path: '',
    component: MultiTareasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MultiTareasPageRoutingModule {}
