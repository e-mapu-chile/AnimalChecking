import { AnimalService } from './../../Services/animal.service';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BluetoothSerial } from '@awesome-cordova-plugins/bluetooth-serial/ngx';
import { NativeAudio } from '@awesome-cordova-plugins/native-audio/ngx';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

import { Storage } from '@capacitor/storage';
import { LoadingController, ToastController } from '@ionic/angular';
import { Chart,registerables } from 'chart.js';

declare var google;

@Component({
  selector: 'app-animal',
  templateUrl: './animal.page.html',
  styleUrls: ['./animal.page.scss'],
})
export class AnimalPage implements OnInit {
  
  diio: string = '0';
  latitude: number;
  longitude: number;
  map: any;

  //PROPIEDADES DEL FORMULARIO
  loteSelect: string;



  clase;
  edad;
  estadoAnimal;
  pabco;
  estadoRupActual;
  exportableChina;
  exportableUE;
  fechaNacimiento;
  movimientoFueraPlazo;
  nacidoChile;
  nombrePredio;
  raza;
  rupActual;
  rupOrigen;
  rupUltimoMovimiento;
  sexo;
  trazabilidadCompleta;
  trazabilidadNacimiento;
  usoAnabolicos;
  observacionTxt;
  nombreMedicamento;
  animalesBastoneados = []


  minimizarTarjeta1: boolean = true;
  minimizarTarjeta2: boolean = true;
  minimizarTarjeta3: boolean = true;
  minimizarTarjeta4: boolean = true;
  minimizarTarjeta5: boolean = true;


  usuarioId: number;
  empresaId: number;
  loading: HTMLIonLoadingElement;
  @ViewChild('audioPlayer') audio: any;
  @ViewChild('map', { static: false }) mapElement: ElementRef;
  @ViewChild('barCanvas',{static: false}) barCanvas: ElementRef;
  @ViewChild("doughnutCanvas",{static: false}) doughnutCanvas: ElementRef;
  @ViewChild("lineCanvas",{static: false}) lineCanvas: ElementRef;

  barChart: Chart;
   doughnutChart: Chart;
   lineChart: Chart;

  constructor(
    private geolocation: Geolocation, private nativeAudio: NativeAudio,
    private blueToothSerial: BluetoothSerial, private changeDetectorRef: ChangeDetectorRef,
    private animalService: AnimalService,
    private toastController: ToastController,
    public loadingController: LoadingController) { 
      Chart.register(...registerables);
    }

  ngOnInit() {

   


    this.resetCampos();
    Storage.set({
      key: 'prueba2',
      value: 'Maxdsfsdfsdfsd',
    });
    this.deviceConectado();
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

  async ngAfterViewInit (){
    const ssd = this.barCanvas.nativeElement;
    console.log("ssd => " + ssd)
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: "bar",
      data: {
        labels: ["Pastoreo", "Heno", "Suplemento"],
        datasets: [
          {
            label: "Cantidad de Dias Alimentación",
            data: [12, 19, 3],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            borderColor: [
              "rgba(255,99,132,1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)"
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        // scales: {
        //   yAxes: [
        //     {
        //       ticks: {
        //         beginAtZero: true
        //       }
        //     }
        //   ]
        // }
      }
    });
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: "doughnut",
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [
          {
            label: "# of Votes",
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)"
            ],
            hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#FF6384", "#36A2EB", "#FFCE56"]
          }
        ]
      }
    });
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: "line",
      data: {
        labels: ["01-01-2022", "10-02-2022", "05-03-2022", "10-04-2022"],
        datasets: [
          {
            label: "KG",
            fill: false,
            //lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "butt",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [230.4, 301, 350, 405.3],
            spanGaps: false
          }
        ]
      }
    });
  }

  async ionViewDidEnter() {
    await this.cargando();
    var resp = await this.animalService.getDIIOApp("11")
    this.loading.dismiss();
    
    
    //  this.loadMap();
  }

  async ionViewWillEnter() {
    const data1 = await Storage.get({ key: 'usuarioId' });
    const data2 = await Storage.get({ key: 'empresaId' });
    this.usuarioId = parseInt(data1.value);
    this.empresaId = parseInt(data2.value);

  }

  loadMap() {
    this.geolocation.getCurrentPosition().then((resp) => {

      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;

      let latLng = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      let mapOptions = {
        center: latLng,
        zoom: 17,
        mapTypeId: 'satellite'
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      this.map.setTilt(45);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  setPuntoAnimal(latitud, longitud) {
    console.log(" ===> " + this.animalesBastoneados.length)
    let latLng = new google.maps.LatLng(latitud, longitud);
    let mapOptions = {
      center: latLng,
      zoom: 17,
      mapTypeId: 'satellite'
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    this.map.setTilt(45);
    var marker, i;
    for (i = 0; i < this.animalesBastoneados.length; i++) {
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(this.animalesBastoneados[i][1], this.animalesBastoneados[i][2]),
        map: this.map
      });
      const infowindow = new google.maps.InfoWindow({
        content: "<p>DIIO: " + this.animalesBastoneados[i][0] + "</p>",
      });
      google.maps.event.addListener(marker, 'click', (function (marker, i) {
        return function () {
          infowindow.setContent(this.animalesBastoneados[i][0]);
          infowindow.open(this.map, marker);
        }
      })(marker, i));
    }
  }

  deviceConectado() {
    this.blueToothSerial.subscribe('/n').subscribe(success => {

      this.hundler(success);
    })
  }

  async hundler(value) {
    this.audio.nativeElement.play();
    var s = document.getElementById('diioTxt') as HTMLInputElement;
    const dioSu = value.toString();
    this.changeDetectorRef.detectChanges()
    const dioSu1 = dioSu.replace('/n', '');
    const dioSu2 = dioSu1.replace('-', '');
    s.value = dioSu2;
    console.log("CTM2=> " + value);
    await this.cargando();
    var resp = await this.animalService.getDIIOApp(dioSu2)
    let ss = JSON.stringify(resp, null, 4);
    console.log("respuesta API= " + ss);
    const dataJ = JSON.parse(ss);
    let ssA = JSON.stringify(dataJ.ConsultaDiio[0]);
    console.log("DATA J => " + ssA)
    if (ssA != undefined) {
      await this.setResultadoDiio(dataJ.ConsultaDiio)
      await this.getPuntoGeoreferencia(dioSu2);
      this.loading.dismiss();
    } else {
      this.loading.dismiss();
    }
    //)



  }

  async getPuntoGeoreferencia(diio) {
    console.log(' previo Current position');
    var opcions = {
      enableHighAccuracy: true
    };
    let flag = 0;
    let watch = this.geolocation.watchPosition(opcions);
    watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
      flag++;
      this.geolocation.getCurrentPosition(opcions).then((resp) => {
        console.log('  Current latitude =>' + resp.coords.latitude);
        console.log('  Current longitude =>' + resp.coords.longitude);
        if (flag == 3) {
          this.animalesBastoneados.push([diio, resp.coords.latitude, resp.coords.longitude])
          //this.setPuntoAnimal(resp.coords.latitude, resp.coords.longitude);
          this.animalService.setGeoreferenciaAnimal(diio, this.rupActual, resp.coords.longitude.toString(), resp.coords.latitude.toString(),
            this.usuarioId, this.empresaId);


        }

      }).catch((error) => {
        this.animalesBastoneados.push([diio, "", ""])

        this.animalService.setGeoreferenciaAnimal(diio, this.rupActual, "", "",
          this.usuarioId, this.empresaId);
        console.log('Error getting location', error);
      });
    });








    console.log(' FIN Current position');
  }

  async onChangeDiio(e) {
    await this.cargando();
    var s = document.getElementById('diioTxt') as HTMLInputElement;
    //alert(s.value);
    var resp = await this.animalService.getDIIOApp(s.value)
    let ss = JSON.stringify(resp, null, 4);
    //console.log("respuesta API= " + ss);
    const dataJ = JSON.parse(ss);
    let ssA = JSON.stringify(dataJ.ConsultaDiio);
    console.log("DATA J => " + ssA)
    if (ssA != undefined) {
      this.setResultadoDiio(dataJ.ConsultaDiio)
      this.animalesBastoneados.push([s.value, -34.53405, -70.93679999999999])
      //this.setPuntoAnimal(-34.53405, -70.93679999999999);
      this.animalService.setGeoreferenciaAnimal(s.value, this.rupActual, '11', '11',
        this.usuarioId, this.empresaId);
    }
    this.loading.dismiss();
  }

  async setResultadoDiio(dataJ) {

    if (dataJ.Clase == "") {
      //NO EXISTE ANIMAL
    } else {
      this.clase = dataJ[0].Clase;
      this.edad = dataJ[0].Edad;
      this.estadoAnimal = dataJ[0].EstadoAnimal;
      this.pabco = dataJ[0].EstatusPabco;
      this.estadoRupActual = dataJ[0].EstatusRupActual;
      this.exportableChina = dataJ[0].ExportableChina;
      this.exportableUE = dataJ[0].ExportableUE;
      this.fechaNacimiento = dataJ[0].FechaNacimiento;
      this.movimientoFueraPlazo = dataJ[0].MovimientoFueraPlazo;
      this.nacidoChile = dataJ[0].NacidoChile;
      this.nombrePredio = dataJ[0].NombrePredioUbi;
      this.raza = dataJ[0].Raza;
      this.rupActual = dataJ[0].RupActual;
      this.rupOrigen = dataJ[0].RupOrigen;
      this.rupUltimoMovimiento = dataJ[0].RupOrigenUltimoMov;
      this.sexo = dataJ[0].Sexo;
      this.trazabilidadCompleta = dataJ[0].TrazabilidadCompleta;
      this.trazabilidadNacimiento = dataJ[0].TrazabilidadNacimiento;
      this.usoAnabolicos = dataJ[0].UsoAnabolicos;

    }
  }

  async resetCampos() {
    this.loteSelect = "Sin_Lote";
  }

  // async OnChangeLote(event) {
  //   console.log("seleccion " + event.target.value);
  //   var value = event.target.value;
  //   this.loteSelect = value;
  //   // if(value == "NuevoLote"){
  //   //   this.formularioLoteVisible = true;
  //   //   this.loteSelect = "Sin_Lote";
  //   // }else{
  //   //   this.formularioLoteVisible = false;
  //   // }
  // }


  // async cerrarFormLote(){
  //   this.formularioLoteVisible = false;
  // }
}
