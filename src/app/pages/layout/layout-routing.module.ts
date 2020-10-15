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
            { path: 'flores', loadChildren: () => import('./crm/flores/flores.module').then(m => m.FloresModule) },
            { path: 'fincas', loadChildren: () => import('./crm/finca/finca.module').then(m => m.FincaModule) },
            { path: 'factura', loadChildren: () => import('./factura/factura.module').then(m => m.FacturaModule) },
            { path: 'miperfil', loadChildren: () => import('./miperfil/miperfil.module').then(m => m.MiperfilModule) },
            { path: 'edit', loadChildren: () => import('./crm/clientes/edit/edit.module').then(m => m.EditModule) },
            { path: 'editFlower', loadChildren: () => import('./crm/flores/edit/edit.module').then(m => m.EditModule) },
            { path: 'editFinca', loadChildren: () => import('./crm/finca/edit/edit.module').then(m => m.EditModule) },
            { path: 'prealerta', loadChildren: () => import('./prealerta/prealerta.module').then(m => m.PrealertaModule) },
            { path: 'delivery', loadChildren: () => import('./crm/delivery/delivery.module').then(m => m.DeliveryModule) },
            { path: 'editDelivery', loadChildren: () => import('./crm/delivery/edit/edit.module').then(m => m.EditModule) },
            { path: 'marcas', loadChildren: () => import('./crm/marking/marking.module').then(m => m.MarkingModule) },
            { path: 'editMarca', loadChildren: () => import('./crm/marking/edit/edit.module').then(m => m.EditModule) },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }
