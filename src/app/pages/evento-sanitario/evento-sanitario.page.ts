import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { registroSanitario } from 'src/app/interfaces/ianimal-checking';
import { animal } from '../../interfaces/ianimal-checking';
import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial/ngx';
import { NativeAudio } from '@awesome-cordova-plugins/native-audio/ngx';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

import { Storage } from '@capacitor/storage';
import { LoadingController, ToastController } from '@ionic/angular';
import { AnimalService } from 'src/app/Services/animal.service';

@Component({
  selector: 'app-evento-sanitario',
  templateUrl: './evento-sanitario.page.html',
  styleUrls: ['./evento-sanitario.page.scss'],
})
export class EventoSanitarioPage implements OnInit {

  rSanitario: registroSanitario;
  animales: animal[] = [];
  animalesTemp: animal[] = [];
  animalSinger: animal;
  diio: string = '0';

  //PROPIEDADES DEL FORMULARIO
  enfermedadSelect: string;
  animalSanoSelect: string;
  partoSelect: string;
  abortoSelect: string;
  traumatismoSelect: string;
  lugarTraumaSelect: string;
  descorneSelect: string;
  castracionSelect: string;
  tecnicaCastracionSelect: string;
  observacionTxt: string;

  quitarDiio: boolean = false;
  usuarioId: number;
  empresaId: number;
  loading: HTMLIonLoadingElement;
  constructor(private geolocation: Geolocation, private nativeAudio: NativeAudio,
    private blueToothSerial: BluetoothSerial, private changeDetectorRef: ChangeDetectorRef,
    private animalService: AnimalService,
    private toastController: ToastController,
    public loadingController: LoadingController) { }

  async ngOnInit() {

    this.deviceConectado();
  }
  async dismiss() {
    try {
      //this.loading = false;
      return await this.loadingController.dismiss().then();
    } catch (e) {
      this.loading.dismiss();
    }
  }

  async cargando() {
    this.loading = await this.loadingController.create({
      cssClass: "my-custom-class",
      message: "Cargando...",
    });
    await this.loading.present();
  }
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 1500,
    });
    toast.present();
  }

  async ionViewDidEnter() {
    await this.resetCampos();
    var opcions = {
      enableHighAccuracy: true
    };
    let watch = this.geolocation.watchPosition(opcions);
    watch.subscribe((data) => {
      console.log('  Current latitude  data=>' + data);

    });
  }

  async ionViewWillEnter() {
    await this.resetCampos();
    const data1 = await Storage.get({ key: 'usuarioId' });
    const data2 = await Storage.get({ key: 'empresaId' });
    this.usuarioId = parseInt(data1.value);
    this.empresaId = parseInt(data2.value);

  }

  deviceConectado() {
    this.blueToothSerial.subscribe('/n').subscribe(success => {

      this.hundler(success);
    })
  }

  async hundler(value) {
    // var s = document.getElementById('diioTxt') as HTMLInputElement;
    const dioSu = value.toString();
    this.changeDetectorRef.detectChanges()
    const dioSu1 = dioSu.replace('/n', '');
    const dioSu2 = dioSu1.replace('-', '');
    // s.value = dioSu2;
    console.log("CTM2=> " + value);

    console.log("this.quitarDiio = " + this.quitarDiio);
    if (!this.quitarDiio) {
      if (!await this.existeDiioLista(dioSu2))
        await this.getPuntoGeoreferencia(dioSu2);
    } else {
      this.quitarDiio = false;
      await this.quitarDiioLista(dioSu2);
    }



  }

  async existeDiioLista(diio) {
    var data = this.animales.filter((d) => d.diio == diio);
    console.log("DATA DA = " + data.length);
    if (data.length > 0)
      return true;

    return false
  }

  async quitarDiioLista(diio) {
    this.animalesTemp = this.animales.filter((d) => d.diio != diio);

    this.animales = this.animalesTemp;
  }

  async getPuntoGeoreferencia(vale) {
    await this.cargando();
    console.log(' previo Current position');
    var opcions = {
      enableHighAccuracy: true
    };
  
    this.geolocation.getCurrentPosition(opcions).then((resp) => {
      console.log('  Current latitude =>' + resp.coords.latitude);
      console.log('  Current longitude =>' + resp.coords.longitude);
      console.log("diio   diio  => " + vale);
      //if (flag == 2) {
      this.animales.push({ diio: vale, latitud: resp.coords.latitude.toString(), longitud: resp.coords.longitude.toString() })
      let laa = JSON.stringify(this.animales);
      console.log("ANASd=> " + laa);
      this.loading.dismiss();
      // }


    }).catch((error) => {
      this.animales.push({ diio: vale, latitud:"", longitud: "" })
      console.log('Error getting location', error);
      this.loading.dismiss();
    });
    // });


    console.log(' FIN Current position');
    this.loading.dismiss();
  }

  quitarClick() {
    this.quitarDiio = true;
  }



  async resetCampos() {
    this.enfermedadSelect = "Sin_Enfermedad";
    this.animalSanoSelect = "SI";
    this.partoSelect = "No_Aplica";
    this.abortoSelect = "No_Aplica";
    this.traumatismoSelect = "No_Aplica";
    this.lugarTraumaSelect = "No_Aplica";
    this.descorneSelect = "No_Aplica";
    this.castracionSelect = "No_Aplica";
    this.tecnicaCastracionSelect = "No_Aplica";
    this.observacionTxt = "";
  }


}
