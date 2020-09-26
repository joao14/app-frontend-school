import { ClientesComponent } from './clientes.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: ClientesComponent,
        children: [
            //{ path: 'edit', loadChildren: () => import('./edit/edit.module').then(m => m.EditModule) }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientesRoutingModule { }
