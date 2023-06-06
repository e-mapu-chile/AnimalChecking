import { Component } from '@angular/core';
import { Insomnia } from '@awesome-cordova-plugins/insomnia/ngx';
import { Network } from '@capacitor/network';
import { AnimalService } from './Services/animal.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private insomnia: Insomnia,
              private animalService: AnimalService) {


  }

  async ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.insomnia.keepAwake()
      .then(
        () => console.log('success'),
        () => console.log('error')
      );
    const status = await Network.getStatus();

    console.log('Network status:', status);
    if(status.connected){
      //HAY INTERNET BUSCAR TODOS LOS BD LOCAL Y ENVIARLOS AL SERVIDOR
      this.animalService.setSyncEventoLote();
    }
    Network.addListener('networkStatusChange', status => {
      console.log('Network status changed', status);
      if(status.connected){
        //HAY INTERNET BUSCAR TODOS LOS BD LOCAL Y ENVIARLOS AL SERVIDOR
        this.animalService.setSyncEventoLote();
      }
    });
    const logCurrentNetworkStatus = async () => {
      const status = await Network.getStatus();

      console.log('Network status:', status);
    };
  }
}
