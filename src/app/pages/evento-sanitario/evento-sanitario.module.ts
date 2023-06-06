import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EventoSanitarioPageRoutingModule } from './evento-sanitario-routing.module';

import { EventoSanitarioPage } from './evento-sanitario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EventoSanitarioPageRoutingModule
  ],
  declarations: [EventoSanitarioPage]
})
export class EventoSanitarioPageModule {}
