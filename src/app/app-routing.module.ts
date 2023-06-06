import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'menu-principal',
    loadChildren: () => import('./pages/menu-principal/menu-principal.module').then( m => m.MenuPrincipalPageModule)
  },
  {
    path: 'vuncular-baston',
    loadChildren: () => import('./pages/vuncular-baston/vuncular-baston.module').then( m => m.VuncularBastonPageModule)
  },
  {
    path: 'animal',
    loadChildren: () => import('./pages/animal/animal.module').then( m => m.AnimalPageModule)
  },
  {
    path: 'menu-animal',
    loadChildren: () => import('./pages/menu-animal/menu-animal.module').then( m => m.MenuAnimalPageModule)
  },
  {
    path: 'potreros',
    loadChildren: () => import('./pages/potreros/potreros.module').then( m => m.PotrerosPageModule)
  },
  {
    path: 'lotes',
    loadChildren: () => import('./pages/lotes/lotes.module').then( m => m.LotesPageModule)
  },
  {
    path: 'menu-lotes',
    loadChildren: () => import('./pages/menu-lotes/menu-lotes.module').then( m => m.MenuLotesPageModule)
  },
  {
    path: 'evento-sanitario',
    loadChildren: () => import('./pages/evento-sanitario/evento-sanitario.module').then( m => m.EventoSanitarioPageModule)
  },
  {
    path: 'vacunacion',
    loadChildren: () => import('./pages/vacunacion/vacunacion.module').then( m => m.VacunacionPageModule)
  },
  {
    path: 'multi-tareas',
    loadChildren: () => import('./pages/multi-tareas/multi-tareas.module').then( m => m.MultiTareasPageModule)
  },
  {
    path: 'filiacion-animal',
    loadChildren: () => import('./pages/filiacion-animal/filiacion-animal.module').then( m => m.FiliacionAnimalPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
