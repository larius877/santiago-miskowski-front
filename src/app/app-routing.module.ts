import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/components/home/home.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/components/home/home.module').then(m => m.HomeModule) // Importa el módulo que deseas cargar en la página de inicio
  },
  {
    path: 'crud',
    loadChildren: () => import('./modules/components/crud/crud.module').then(m => m.CrudModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }