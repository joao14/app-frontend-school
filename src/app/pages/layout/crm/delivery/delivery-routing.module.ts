
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeliveryComponent } from './delivery.component';

const routes: Routes = [
    {
        path: '',
        component: DeliveryComponent,
        children: [
            //{ path: 'edit', loadChildren: () => import('./edit/edit.module').then(m => m.EditModule) }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DeliveryRoutingModule { }
