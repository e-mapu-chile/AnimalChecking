import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimalCheckingDLService {

  rupsUsuario: any[] = [];
  animalesSinLote: any[] = [];
  
  constructor() { }

  test() {

  }
  async obtenerRUPUsuario() {

    var obj = {
      dataAnimal:
        [{
          rup: "13.4.55.5555",
          potreros: [
            {
              Id: 1,
              nombre: "Test",
              HE: 12,
              lotes: [
                {
                  Id: 11,
                  nombre: "full produccion 200",
                  animales: [
                    {
                      DIIO: "1949424",
                      raza: "raza",
                      edad: "1 año 2 meses",
                      tareaPendiente: "NO",
                      tieneEventoSanitario: "NO",
                      vacunacionAlDia: "SI"
                    },
                    {
                      DIIO: "1949425",
                      raza: "raza",
                      edad: "1 año 2 meses",
                      tareaPendiente: "NO",
                      tieneEventoSanitario: "NO",
                      vacunacionAlDia: "SI"
                    },
                    {
                      DIIO: "1949421",
                      raza: "raza",
                      edad: "1 año 2 meses",
                      tareaPendiente: "NO",
                      tieneEventoSanitario: "NO",
                      vacunacionAlDia: "SI"
                    },
                    {
                      DIIO: "1949415",
                      raza: "raza",
                      edad: "1 año 2 meses",
                      tareaPendiente: "NO",
                      tieneEventoSanitario: "NO",
                      vacunacionAlDia: "SI"
                    }
                  ]
                },
                {
                  Id: 12,
                  nombre: "full produccion 400",
                  animales: []
                }
              ]
            },
            {
              Id: 2,
              nombre: "Xasa2 ",
              HE: 13,
              lotes: [
                {
                  Id: 21,
                  nombre: "cuarentena",
                  animales: [

                  ]
                }

              ]
            }
          ],
          animalesSinLote: [
            {
              DIIO: "11111111",
              raza: "raza",
              edad: "1 año 2 meses",
              tareaPendiente: "NO",
              tieneEventoSanitario: "NO",
              vacunacionAlDia: "SI"
            },
            {
              DIIO: "22222222",
              raza: "raza",
              edad: "1 año 2 meses",
              tareaPendiente: "NO",
              tieneEventoSanitario: "NO",
              vacunacionAlDia: "SI"
            }
          ]
        }],

    }
    this.rupsUsuario.push(obj);



    return this.rupsUsuario;
  }

  
}

