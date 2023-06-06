import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VuncularBastonPageRoutingModule } from './vuncular-baston-routing.module';

import { VuncularBastonPage } from './vuncular-baston.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VuncularBastonPageRoutingModule
  ],
  declarations: [VuncularBastonPage]
})
export class VuncularBastonPageModule {}
