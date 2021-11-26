import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ObrasComponent } from './obras.component';


const routes: Routes = [
  {
    path: '',
    component: ObrasComponent,
    children: [
        
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ObrasRoutingModule { }
