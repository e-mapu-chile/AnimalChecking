import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PotrerosPageRoutingModule } from './potreros-routing.module';

import { PotrerosPage } from './potreros.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PotrerosPageRoutingModule
  ],
  declarations: [PotrerosPage]
})
export class PotrerosPageModule {}
