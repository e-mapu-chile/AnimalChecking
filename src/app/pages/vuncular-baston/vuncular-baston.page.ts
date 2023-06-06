import { Component, OnInit } from '@angular/core';
import { AlertController, NavController, ToastController, LoadingController } from '@ionic/angular';
import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial/ngx';

@Component({
  selector: 'app-vuncular-baston',
  templateUrl: './vuncular-baston.page.html',
  styleUrls: ['./vuncular-baston.page.scss'],
})
export class VuncularBastonPage implements OnInit {
  Devices;
  dataRead;
  loading: HTMLIonLoadingElement;
  constructor(private blueToothSerial: BluetoothSerial, private alertController: AlertController,
    private _navCtrl: NavController,
    private toastController: ToastController,
    public loadingController: LoadingController) { }

  ngOnInit() {
    this.activarBluetooth();
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
      message: "Vinculando su telefono...",
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

  async alerta(msg) {
    const alert = await this.alertController.create({
      header: 'Atención',
      message: msg,
      buttons: [{
        text: 'OK',
        handler: () => {
          console.log("OK");
        }
      }]
    })
  }

  setData() {
    this.blueToothSerial.write("eyJhbGc").then(response => {
      console.log("WRITE => OK")
    }, err => {
      console.log("ERROR DATA => " + err)
    })
  }

  async vincular(mac) {
    await this.cargando();
    console.log("MAC=>" + mac)
    this.blueToothSerial.connect(mac).subscribe(success => {
      this.setData();
      this.deviceConectado();
     
      this.presentToast("Su telefono ya esta vinculado!");
      this._navCtrl.navigateRoot("menu-principal");
      this.loading.dismiss();
    }, err => {
      console.log("ERR=> " + err)
      this.loading.dismiss();
      this.presentToast("Error al vincular su telefono, por favor vuelva a intentarlo!");

    })
    
  }

  async deviceConectado() {
    this.blueToothSerial.subscribe('/n').subscribe(success => {
   
      this.hundler(success);
    })
  }

  hundler(value) {
    console.log("CTM=> " + value);
  

  }


  desconcetar() {
    this.blueToothSerial.disconnect();
    console.log("desconectado")
  }
  activarBluetooth() {
    this.blueToothSerial.isEnabled().then(r => {
      this.alerta("IS ON");
      this.listarDevices();
    }, err => {
      this.alerta("IS OFF");
    })
  }

  listarDevices() {
    this.blueToothSerial.list().then(res => {
      this.Devices = res;
    }, err => {
      console.log(err);
    })
  }

}
