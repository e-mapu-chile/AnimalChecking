import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MultiTareasPageRoutingModule } from './multi-tareas-routing.module';

import { MultiTareasPage } from './multi-tareas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MultiTareasPageRoutingModule
  ],
  declarations: [MultiTareasPage]
})
export class MultiTareasPageModule {}
