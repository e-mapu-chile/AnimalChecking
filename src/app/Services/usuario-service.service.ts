import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {
  token: string = null;
  loading: HTMLIonLoadingElement;
  constructor(public loadingController: LoadingController,
    private http: HttpClient) { }


  getUser(user: string, password: string, esCelular: number) {
    const headers = new HttpHeaders()
      .set("Content-Type", "text/plain; charset=utf-8");
    return this.http.get<any>(
      "https://servicioregenerapp.cl/api/login?user=" + user + "&password=" + password + "&esCelular=" + esCelular + "",
      { headers: headers }
    );
  }


  async login(user: string, password: string, esCelular: number) {
    return new Promise((resolve) => {
      this.getUser(user, password, esCelular).subscribe((resp) => {
        let ss = JSON.stringify(resp.usuario.TokenCelular, null, 4);
        console.log("respuesta API= " + ss);
        const dataJ = JSON.parse(ss);

        Storage.set({
          key: 'bastones',
          value: resp.bastones
        });
        Storage.set({
          key: 'tokenCelular',
          value: resp.usuario.TokenCelular
        });
        Storage.set({
          key: 'tokenApp',
          value: resp.usuario.TokenApp
        });
        Storage.set({
          key: 'usuarioId',
          value: resp.usuario.Id
        });
        Storage.set({
          key: 'empresaId',
          value: resp.usuario.EmpresaId
        });

        resolve(true);
      },
        (err) => {
          console.log("ERROR => " + err);
          this.token = null;
          Storage.set({
            key: 'bastones',
            value: ''
          });
          Storage.set({
            key: 'tokenCelular',
            value: ''
          });
          //this.storage.clear();
          resolve(false);
        });
    });
  }
}
