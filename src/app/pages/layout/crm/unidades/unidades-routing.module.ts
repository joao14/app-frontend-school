import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnidadesComponent } from './unidades.component';
import { UnidadesModule } from './unidades.module';


const routes: Routes = [
  {
    path: '',
    component: UnidadesComponent,
    children: [
        
    ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnidadesRoutingModule { }
