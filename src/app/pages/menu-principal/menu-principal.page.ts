import { Component, OnInit } from '@angular/core';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-menu-principal',
  templateUrl: './menu-principal.page.html',
  styleUrls: ['./menu-principal.page.scss'],
})
export class MenuPrincipalPage implements OnInit {

  esCelular = 0;
  constructor() { }

  ngOnInit() {
    if (Capacitor.isNativePlatform()) {
      // Platform is mobile
      console.log("es telefono");
      this.esCelular = 1;
    } else {
      // Platform is not mobile
      console.log("no es telefono");
      this.esCelular = 2;
    }
  }

}
