import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { Component, ViewChild } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { UsuarioServiceService } from '../Services/usuario-service.service';
import { NgForm } from '@angular/forms';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  loginUser = {
    userName: "",
    password: "",
  };
  @ViewChild('audioPlayerIntro') audio: any;
  flagIntro = 0;
  logeado: boolean = false;
  loading: HTMLIonLoadingElement;
  esCelular = 0;
  constructor(private _usuarioService: UsuarioServiceService,
    private _navCtrl: NavController,

    private toastController: ToastController,
    public loadingController: LoadingController,) { }



  async ionViewWillEnter() {
    await this.cargando();
    if (Capacitor.isNativePlatform()) {
      // Platform is mobile
      console.log("es telefono");
      this.esCelular = 1;

    } else {
      // Platform is not mobile
      console.log("no es telefono");
      this.esCelular = 2;
    }
    try {
      const v = await Storage.get({ key: 'tokenCelular' });
      const apT = await Storage.get({ key: 'tokenApp' });
      let jsss = JSON.stringify(v.value);
      let jsT = JSON.stringify(apT.value);
      console.log('QUE token => ' + jsss);
      console.log('QUE token2 => ' + jsT);
      if (apT.value != null && this.esCelular == 2) {
        //EL TOKEN WEB EXISTE
        this._navCtrl.navigateRoot("menu-principal");
      }
      if (v.value != null && this.esCelular == 1) {
        //EL TOKEN CELULAR EXISTE
        this._navCtrl.navigateRoot("menu-principal");
      }

      this.loading.dismiss();
    }
    catch (e) {
      console.log("no existe storage");
    }

  }
  async loginSound() {


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

  async login(fLogin: NgForm) {
    if (fLogin.invalid) {
      return;
    }
    await this.cargando();
    const valido = await this._usuarioService.login(
      this.loginUser.userName,
      this.loginUser.password,
      this.esCelular
    );


    if (valido) {
      //NAVEGAR AL MENU
      this.loading.dismiss();
      // this._appComponent.espereHide();
      this.presentToast("Bienvenido!");
      this.loginSound();
      this._navCtrl.navigateRoot("menu-principal");
    } else {
      //ALERTA QUE USUARIO NO EXISTE
      //      alert("no valido");
      this.loading.dismiss();
      // this._appComponent.espereHide();
      this.presentToast("Usuario y contraseña no son correctos");
      //this.uiService.alertaInformativa("usuario y contraseña no son correctos");
    }

    console.log(fLogin.valid);
    console.log(this.loginUser.userName);
  }


}
