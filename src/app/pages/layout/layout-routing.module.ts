import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
            { path: 'clientes', loadChildren: () => import('./crm/clientes/clientes.module').then(m => m.ClientesModule) },
            { path: 'factura', loadChildren: () => import('./factura/factura.module').then(m => m.FacturaModule) },
            { path: 'miperfil', loadChildren: () => import('./miperfil/miperfil.module').then(m => m.MiperfilModule) },
            { path: 'edit', loadChildren: () => import('./crm/clientes/edit/edit.module').then(m => m.EditModule) },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
