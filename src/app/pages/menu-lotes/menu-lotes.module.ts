import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MenuLotesPageRoutingModule } from './menu-lotes-routing.module';

import { MenuLotesPage } from './menu-lotes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MenuLotesPageRoutingModule
  ],
  declarations: [MenuLotesPage]
})
export class MenuLotesPageModule {}
