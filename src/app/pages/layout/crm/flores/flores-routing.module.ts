
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FloresComponent } from './flores.component';

const routes: Routes = [
    {
        path: '',
        component: FloresComponent,
        children: [
            //{ path: 'edit', loadChildren: () => import('./edit/edit.module').then(m => m.EditModule) }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FloresRoutingModule { }
