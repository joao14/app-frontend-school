
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrealertaComponent } from './prealerta.component';

const routes: Routes = [
    {
        path: '', component: PrealertaComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PrealertaRoutingModule {}
