import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VacunacionPageRoutingModule } from './vacunacion-routing.module';

import { VacunacionPage } from './vacunacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VacunacionPageRoutingModule
  ],
  declarations: [VacunacionPage]
})
export class VacunacionPageModule {}
