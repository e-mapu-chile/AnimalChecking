import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FiliacionAnimalPageRoutingModule } from './filiacion-animal-routing.module';

import { FiliacionAnimalPage } from './filiacion-animal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FiliacionAnimalPageRoutingModule
  ],
  declarations: [FiliacionAnimalPage]
})
export class FiliacionAnimalPageModule {}
