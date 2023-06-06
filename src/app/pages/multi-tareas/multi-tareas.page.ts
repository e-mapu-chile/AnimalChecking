import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial/ngx';
import { NativeAudio } from '@awesome-cordova-plugins/native-audio/ngx';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

import { Storage } from '@capacitor/storage';
import { LoadingController, ToastController } from '@ionic/angular';
import { animal, animalInsertarBD, eventoLote, medicamentoDto, registroAlimentacion, registroEnfermedad, registroSanitario } from 'src/app/interfaces/ianimal-checking';
import { AnimalService } from 'src/app/Services/animal.service';
import { Capacitor } from '@capacitor/core';
import { registroMedicamento } from '../../interfaces/ianimal-checking';
import { EMPTY } from 'rxjs';

@Component({
  selector: 'app-multi-tareas',
  templateUrl: './multi-tareas.page.html',
  styleUrls: ['./multi-tareas.page.scss'],
})
export class MultiTareasPage implements OnInit {

  //PROPIEDADES DEL FORMULARIO
  //LOTE
  nombreloteTxt: string;
  pesoKgTxt: number;
  ubicacionLoteTxt: string;
  //ENFERMEDAD
  contieneTbbValue: string;
  contieneBBValue: string;
  contieneLEValue: string;
  //REGISTRO SANITARIO
  partoValue: string;
  abortoValue: string;
  traumatismoValue: string;
  descorneValue: string;
  castracionValue: string;
  observacionTxt: string;
  //REGISTRO MEDICAMENTO
  nombreMedicamento: string;
  tipoMedicamento: string;
  presentacion: string;
  dosis: number;
  receta: number;
  medicamentoAplicado: medicamentoDto[] = [];
  medicamentoAplicadoTemp: medicamentoDto[] = [];
  medicamentoAplicadoObj: medicamentoDto;
  //REGISTRO ALIMENTACION
  tipoAlimentoValue: string;
  unidadesAplicadas: number;

  animales: animal[] = [];
  quitarDiio: boolean = false;
  animalesTemp: animal[] = [];
  animalSinger: animal;
  diio: string = '0';
  usuarioId: number;
  empresaId: number;
  loading: HTMLIonLoadingElement;

  minimizarTarjeta1: boolean = true;
  minimizarTarjeta2: boolean = true;
  minimizarTarjeta3: boolean = true;
  minimizarTarjeta4: boolean = true;
  minimizarTarjeta5: boolean = true;
  bluetoothActivo: boolean = false;
  esCelular: boolean = false;

  @ViewChild('audioPlayer1') audio: any;
  @ViewChild('audioPlayer2') audio2: any;
  @ViewChild('audioPlayer3') audio3: any;
  //@ViewChild('audioPlayer4') audio4: any;

  constructor(private geolocation: Geolocation, private nativeAudio: NativeAudio,
    private blueToothSerial: BluetoothSerial, private changeDetectorRef: ChangeDetectorRef,
    private animalService: AnimalService,
    private toastController: ToastController,
    public loadingController: LoadingController) { }

  ngOnInit() {
    if (Capacitor.isNativePlatform()) {
      // Platform is mobile
      console.log("es telefono");
      this.esCelular = true;
      this.deviceConectado();
    } else {
      // Platform is not mobile
      console.log("no es telefono");
      this.esCelular = false;
    }

    this.resetFormulario();

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

  minMaxTarjeta1() {
    if (this.minimizarTarjeta1)
      this.minimizarTarjeta1 = false;
    else
      this.minimizarTarjeta1 = true;
  }

  minMaxTarjeta2() {
    if (this.minimizarTarjeta2)
      this.minimizarTarjeta2 = false;
    else
      this.minimizarTarjeta2 = true;
  }
  minMaxTarjeta3() {
    if (this.minimizarTarjeta3)
      this.minimizarTarjeta3 = false;
    else
      this.minimizarTarjeta3 = true;
  }

  minMaxTarjeta4() {
    if (this.minimizarTarjeta4)
      this.minimizarTarjeta4 = false;
    else
      this.minimizarTarjeta4 = true;
  }

  minMaxTarjeta5() {
    if (this.minimizarTarjeta5)
      this.minimizarTarjeta5 = false;
    else
      this.minimizarTarjeta5 = true;
  }


  aplicarMedicamento() {

    var d = {
      nombre: this.nombreMedicamento,
      dosis: this.dosis.toString(),
      presentacion: this.presentacion,
      recetaNumero: this.receta,
      tipoMedicamento: this.tipoMedicamento
    }

    this.medicamentoAplicado.push(d);
  }
  quitarMedicamento(item) {
    console.log("item => " + item)
    console.log("aaaa=> " + JSON.stringify(this.medicamentoAplicado))
    this.medicamentoAplicadoTemp = this.medicamentoAplicado.filter((f) => f.nombre != item);
    this.medicamentoAplicado = [];
    console.log("ASASASAA=> " + JSON.stringify(this.medicamentoAplicadoTemp))

    this.medicamentoAplicado = this.medicamentoAplicadoTemp;
  }

  async ionViewDidEnter() {
    //await this.resetCampos();
    var opcions = {
      enableHighAccuracy: true
    };
    let watch = this.geolocation.watchPosition(opcions);
    watch.subscribe((data) => {
      console.log('  Current latitude  data=>' + data);

    });
  }

  async ionViewWillEnter() {
    // await this.resetCampos();
    const data1 = await Storage.get({ key: 'usuarioId' });
    const data2 = await Storage.get({ key: 'empresaId' });
    this.usuarioId = parseInt(data1.value);
    this.empresaId = parseInt(data2.value);

    const dataR = Storage.get({ key: 'animalesLocal' })

    console.log("dataR => " + JSON.stringify((await dataR).value));

  }

  deviceConectado() {
    this.blueToothSerial.subscribe('/n').subscribe(success => {
      this.bluetoothActivo = true;
      this.hundler(success);
    })
    this.bluetoothActivo = false;
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
      if (!await this.existeDiioLista(dioSu2)) {


        await this.getPuntoGeoreferencia(dioSu2);
        this.audio.nativeElement.play();
      } else {
        //SONIDO DE YA EXISTE
        this.audio2.nativeElement.play();
      }

    } else {
      this.quitarDiio = false;
      await this.quitarDiioLista(dioSu2);
      this.audio3.nativeElement.play();
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
      this.animales.push({ diio: vale, latitud: "", longitud: "" })
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


  OnChangeContieneTBB(event) {
    //alert("seleccion " + event.target.value);
    this.contieneTbbValue = event.target.value;
    //this.grabarProtocoloMemoria();
  }
  OnChangeContieneBB(event) {
    //alert("seleccion " + event.target.value);
    this.contieneBBValue = event.target.value;
    //this.grabarProtocoloMemoria();
  }
  OnChangeContieneLE(event) {    //alert("seleccion " + event.target.value);
    this.contieneLEValue = event.target.value;
    //this.grabarProtocoloMemoria();
  }
  OnChangeParto(event) {
    //alert("seleccion " + event.target.value);
    this.partoValue = event.target.value;
    //this.grabarProtocoloMemoria();
  }
  OnChangeAborto(event) {
    //alert("seleccion " + event.target.value);
    this.abortoValue = event.target.value;
    //this.grabarProtocoloMemoria();
  }
  OnChangeTraumatismo(event) {
    //alert("seleccion " + event.target.value);
    this.traumatismoValue = event.target.value;
    //this.grabarProtocoloMemoria();
  }
  OnChangeDescorne(event) {
    //alert("seleccion " + event.target.value);
    this.descorneValue = event.target.value;
    //this.grabarProtocoloMemoria();
  }
  OnChangeCastracion(event) {
    //alert("seleccion " + event.target.value);
    this.castracionValue = event.target.value;
    //this.grabarProtocoloMemoria();
  }
  OnChangeTipoAlimento(event) {
    //alert("seleccion " + event.target.value);
    this.tipoAlimentoValue = event.target.value;
    //this.grabarProtocoloMemoria();
  }

  animalesInsertar: animalInsertarBD[] = [];
  animalesInsertarLocal: any[] = [];
  animalInsertar: animalInsertarBD;
  eventoLote: eventoLote;
  enfermedades: registroEnfermedad[] = [];
  registroSanitario: registroSanitario;
  registroMedicamentos: registroMedicamento[] = [];
  registroMedicamento: registroMedicamento;
  registroAlimentacion: registroAlimentacion;
  async guardarMultiTarea() {
    this.animalesInsertar = [];
    console.log("entra Guardar")
    await this.animales.push({ diio: "1344", latitud: "", longitud: "" })

    await this.animales.push({ diio: "1111", latitud: "", longitud: "" })

    await this.animales.push({ diio: "5335", latitud: "", longitud: "" })

    await this.animales.push({ diio: "75342", latitud: "", longitud: "" })

    //console.log("animales => " + JSON.stringify(this.animales[0].diio))
    if (this.animales.length > 0) {

      for await (const a of this.animales) {

        console.log("animales => " + JSON.stringify(a.diio))
        //POR CADA ANIMAL GUARDAMOS SUS PROPIEDADES
        //JSON TRABAJAR EL OBJETO 
        //#region EVENTO
        this.eventoLote = {
          diio: a.diio,
          empresaId: this.empresaId,
          latitud: a.latitud,
          longitud: a.longitud,
          nombreLote: this.nombreloteTxt,
          pesoKg: this.pesoKgTxt,
          ubicacionLote: this.ubicacionLoteTxt,
          usuarioId: this.usuarioId
        }
        //#endregion
        //#region ENFERMEDADES
        this.enfermedades = [{
          diio: a.diio,
          enfermedad: 'Tuberculosis',
          contieneEnfermedad: this.contieneTbbValue,
          eventoLoteId: 0,
          usuarioId: this.usuarioId,
          empresaId: this.empresaId,
          latitud: a.latitud,
          longitud: a.longitud
        },
        {
          diio: a.diio,
          enfermedad: 'Brucelosis',
          contieneEnfermedad: this.contieneBBValue,
          eventoLoteId: 0,
          usuarioId: this.usuarioId,
          empresaId: this.empresaId,
          latitud: a.latitud,
          longitud: a.longitud
        },
        {
          diio: a.diio,
          enfermedad: 'Leucosis Enzootica',
          contieneEnfermedad: this.contieneLEValue,
          eventoLoteId: 0,
          usuarioId: this.usuarioId,
          empresaId: this.empresaId,
          latitud: a.latitud,
          longitud: a.longitud
        }]
        //#endregion
        //#region CONDICION SANITARIA
        this.registroSanitario = {
          aborto: this.abortoValue,
          castracion: this.castracionValue,
          descorne: this.descorneValue,
          diio: a.diio,
          empresaId: this.empresaId,
          eventoLoteId: 0,
          latitud: a.latitud,
          longitud: a.longitud,
          observacionSanitaria: this.observacionTxt,
          parto: this.partoValue,
          traumatismo: this.traumatismoValue,
          usuarioId: this.usuarioId,
          parteCuerpo: ''
        }
        //#endregion
        //#region MEDICAMENTO
        this.registroMedicamentos = [];
        this.medicamentoAplicado.forEach(e => {
          this.registroMedicamento = {
            diio: a.diio,
            empresaId: this.empresaId,
            eventoLoteId: 0,
            latitud: a.latitud,
            longitud: a.longitud,
            dosis: e.dosis,
            medicamentoNombre: e.nombre,
            presentacion: e.presentacion,
            recetaNumero: e.recetaNumero,
            tipoMedicamento: e.tipoMedicamento,
            usuarioId: this.usuarioId
          }

          this.registroMedicamentos.push(this.registroMedicamento)
        });
        //#endregion
        //#region ALIMENTACION
        this.registroAlimentacion = {
          diio: a.diio,
          empresaId: this.empresaId,
          eventoLoteId: 0,
          latitud: a.latitud,
          longitud: a.longitud,
          tipoAlimento: this.tipoAlimentoValue,
          unidadesAplicadas: this.unidadesAplicadas,
          usuarioId: this.usuarioId
        }
        //#endregion
        this.animalInsertar = {
          diio: a.diio,
          registroLoteEvento: this.eventoLote,
          registroEnfermedades: this.enfermedades,
          registroSanitario: this.registroSanitario,
          registroMedicamentos: this.registroMedicamentos,
          registroAlimentacion: this.registroAlimentacion
        }
        this.animalesInsertar.push(this.animalInsertar);
      }


      const rData = await this.animalService.setEventoLote(this.animalesInsertar);
      if (rData) {
        this.presentToast("Animales registrados en su plataforma")
        this.animales = [];
        this.resetFormulario();
      } else {
        this.animales = [];
        this.resetFormulario();
        //this.presentToast("Animales registrados en su celular")
      }
    } else {
      this.presentToast("Debe tener animales bastoneados para guardar")
    }

  }
  validarMultiTarea() {

  }
  async resetFormulario() {
    //LOTE
    this.nombreloteTxt = "";
    this.pesoKgTxt = 0;
    this.ubicacionLoteTxt = "";
    //ENFERMEDAD
    this.contieneTbbValue = "SinInformacion";
    this.contieneBBValue = "SinInformacion";
    this.contieneLEValue = "SinInformacion";
    //REGISTRO SANITARIO
    this.partoValue = "SinInformacion";
    this.abortoValue = "SinInformacion";
    this.traumatismoValue = "SinInformacion";
    this.descorneValue = "SinInformacion";
    this.castracionValue = "SinInformacion";
    this.observacionTxt = "";
    //REGISTRO MEDICAMENTO
    this.nombreMedicamento = "";
    this.tipoMedicamento = "NoAplica";
    this.presentacion = "NoAplica";
    this.dosis = 0;
    this.receta = 0;
    this.medicamentoAplicado = [];
    this.medicamentoAplicadoTemp = [];
    this.medicamentoAplicadoObj = undefined;
    //REGISTRO ALIMENTACION
    this.tipoAlimentoValue = "NoAplica";
    this.unidadesAplicadas = 0;
  }
}
