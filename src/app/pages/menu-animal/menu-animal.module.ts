import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuAnimalPageRoutingModule } from './menu-animal-routing.module';

import { MenuAnimalPage } from './menu-animal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuAnimalPageRoutingModule
  ],
  declarations: [MenuAnimalPage]
})
export class MenuAnimalPageModule {}
