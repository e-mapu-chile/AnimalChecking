import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Storage } from '@capacitor/storage';
import { animalInsertarBD } from '../interfaces/ianimal-checking';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  loading: HTMLIonLoadingElement;
  constructor(public loadingController: LoadingController,
    private http: HttpClient) { }


  getDIIO(diio: string) {
    const headers = new HttpHeaders()
      .set("Content-Type", "text/plain; charset=utf-8");
    return this.http.get<any>(
      "https://servicioregenerapp.cl/api/getDiio?diio=" + diio + "",
      { headers: headers }
    );
  }

  async getDIIOApp(diio: string) {
    return new Promise((resolve) => {
      this.getDIIO(diio).subscribe((resp) => {
        let ss = JSON.stringify(resp, null, 4);
        //   console.log("respuesta API= " + ss);
        const dataJ = JSON.parse(ss);


        resolve(dataJ);
      },
        (err) => {
          console.log("ERROR => " + err);

          //this.storage.clear();
          resolve(false);
        });
    });
  }

  async setGeoreferenciaAnimal(diio, rup, longitud, latitud, usuarioId: number, empresaId: number) {
    //APLICAR LLAMADA POST
    const data = {
      diio: diio, rup: rup, longitud: longitud, latitud: latitud, usuarioId: usuarioId, empresaId: empresaId
    }
    const headers = new HttpHeaders().set("Authorization", 'token');
    return new Promise((resolve) => {
      this.http
        .post(
          `https://servicioregenerapp.cl/api/nuevaGeoAnimal`,
          data,
          { headers: headers }
        )
        .subscribe(
          (resp) => {
            let ss = JSON.stringify(resp, null, 4);
            console.log(resp);
            let objRes = JSON.parse(ss);
            resolve(true);
          },
          (err) => {
            console.log("ERROR =>" + err);
            //this.storage.clear();
            resolve(false);
          }
        );
    });
    //FIN
  }

  //#region SAVE DATA LOCAL
  animalesInsertar: animalInsertarBD[] = [];
  animalesInsertarLocal: animalInsertarBD[] = [];
  async setEventoLote(animalesInsertar) {
    //APLICAR LLAMADA POST
    const dataJson = JSON.stringify(animalesInsertar);
    console.log("ANIMALES => " + dataJson)
    const data = { jsonAnimales: animalesInsertar }
    const headers = new HttpHeaders().set("Authorization", '');
    return new Promise((resolve) => {
      this.http
        .post(
          'https://servicioregenerapp.cl/api/nuevoAnimalChecking',
          data,
          { headers: headers }
        )
        .subscribe(
          (resp) => {
            let ss = JSON.stringify(resp, null, 4);
            console.log(resp);
            let objRes = JSON.parse(ss);


            resolve(true);
          },
          async (err) => {
            console.log("ERROR =>" + JSON.stringify(err));

            try {
              const dataR = Storage.get({ key: 'animalesLocal' })
            
             
              if((await dataR).value == null){
                this.animalesInsertarLocal = [];
                this.animalesInsertarLocal.push(animalesInsertar);
              }else{
                const dataJ = JSON.parse((await dataR).value);
                this.animalesInsertarLocal = dataJ
                this.animalesInsertarLocal.push(animalesInsertar);
                console.log("dataR => "+ JSON.stringify((await dataR).value));
              }
               
              

              await Storage.set({
                key: 'animalesLocal',
                value: JSON.stringify(this.animalesInsertarLocal)
              });
            } catch (e) { 
              
              // await Storage.set({
              //   key: 'animalesLocal',
              //   value: JSON.stringify(this.animalesInsertarLocal)
              // });
            }


            //this.storage.clear();
            resolve(false);
          }
        );
    });
    //FIN

  }

  async setSyncEventoLote() {
    //IR A LA BD LOCAL Y SI EXISTEN REGISTROS ENVIARLOS AL SERVIDOR POR QUE HAY INTERNET EN EL CELULAR
    try {
      const dataR = Storage.get({ key: 'animalesLocal' })
      const dataJ = JSON.parse((await dataR).value);
      this.animalesInsertar = dataJ;
      const dataJson = JSON.stringify(this.animalesInsertar);
      console.log("ANIMALES STORAGE => " + dataJson)

      const data = { jsonAnimales: this.animalesInsertar }
      const headers = new HttpHeaders().set("Authorization", ''); 
      return new Promise((resolve) => {
        this.http
          .post(
            'https://servicioregenerapp.cl/api/syncronizarAnimalChecking',
            data, 
            { headers: headers }
          )
          .subscribe(
            async (resp) => {
              let ss = JSON.stringify(resp, null, 4);
              console.log(resp);
              let objRes = JSON.parse(ss);

              //LIMPIAMOS STORAGE 
              this.animalesInsertarLocal = [];
              await Storage.set({
                key: 'animalesLocal',
                value: JSON.stringify(this.animalesInsertarLocal)
              });
              resolve(true);
            },
            async (err) => {
              console.log("ERROR =>" + JSON.stringify(err));

              resolve(false);
            }
          );
      });



    } catch (e) {

    }


  }


  //#endregion


}
