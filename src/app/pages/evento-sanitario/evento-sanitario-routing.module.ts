import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventoSanitarioPage } from './evento-sanitario.page';

const routes: Routes = [
  {
    path: '',
    component: EventoSanitarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EventoSanitarioPageRoutingModule {}
