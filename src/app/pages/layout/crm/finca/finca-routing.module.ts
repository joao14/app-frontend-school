
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FincaComponent } from './finca.component';

const routes: Routes = [
    {
        path: '',
        component: FincaComponent,
        children: [
            //{ path: 'edit', loadChildren: () => import('./edit/edit.module').then(m => m.EditModule) }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FincaRoutingModule { }
