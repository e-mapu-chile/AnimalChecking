import { Component, OnInit } from '@angular/core';
import { AnimalCheckingDLService } from 'src/app/Services/animal-checking-dl.service';

@Component({
  selector: 'app-lotes',
  templateUrl: './lotes.page.html',
  styleUrls: ['./lotes.page.scss'],
})
export class LotesPage implements OnInit {

  rupsUsuario: any[] = [];
  constructor(private _animalService : AnimalCheckingDLService) { }
async ngOnInit() {

    this.rupsUsuario = await this._animalService.obtenerRUPUsuario();
  }

  showhideL(clase){
    
    var idss = 'nivelAnimales_'+clase;
    var idsH = 'animH_'+clase;
   
    var list = document.getElementsByClassName(idss);
    console.log("D=> " + list)
    for (var i = 0; i < list.length; i++) {

      console.log(list[i].id); //second console output
      var mydiv = document.getElementById(list[i].id);
      var mydivH = document.getElementById(idsH);
      if (mydiv.style.display === 'block' || mydiv.style.display === '') {
        mydiv.style.display = 'none';
        mydivH.style.display = 'none';
      }
      else {
        mydiv.style.display = 'block';
        mydivH.style.display = 'block';
      }
    }
  }


  showhideP(clase){
    
    var idss = 'nivelLote_'+clase;
   
    var list = document.getElementsByClassName(idss);
    console.log("D=> " + list)
    for (var i = 0; i < list.length; i++) {

      console.log(list[i].id); //second console output
      var mydiv = document.getElementById(list[i].id);
      if (mydiv.style.display === 'block' || mydiv.style.display === '') {
        mydiv.style.display = 'none';
      }
      else {
        mydiv.style.display = 'block';
      }
    }
  }

  showhide() {
    var list = document.getElementsByClassName('nivelLote');
    console.log("D=> " + list)
    for (var i = 0; i < list.length; i++) {

      console.log(list[i].id); //second console output
      var mydiv = document.getElementById(list[i].id);
      if (mydiv.style.display === 'block' || mydiv.style.display === '') {
        mydiv.style.display = 'none';
      }
      else {
        mydiv.style.display = 'block';
      }
    }
  }
}
