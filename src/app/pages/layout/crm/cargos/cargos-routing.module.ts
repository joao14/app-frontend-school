import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CargosComponent } from './cargos.component';


const routes: Routes = [
  {
    path: '',
    component: CargosComponent,
    children: [
        
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CargosRoutingModule { }
