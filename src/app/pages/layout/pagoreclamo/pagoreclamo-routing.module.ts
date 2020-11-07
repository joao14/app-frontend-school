

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagoreclamoComponent } from './pagoreclamo.component';

const routes: Routes = [
    {
        path: '', component: PagoreclamoComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagoreclamoRoutingModule {}
