
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MarkingComponent } from './marking.component';

const routes: Routes = [
    {
        path: '',
        component: MarkingComponent,
        children: [
            //{ path: 'edit', loadChildren: () => import('./edit/edit.module').then(m => m.EditModule) }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MarketingRoutingModule { }
