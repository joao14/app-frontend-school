import { FacturaComponent } from './factura.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacturaRoutingModule } from './factura-routing.module';



@NgModule({
    declarations: [FacturaComponent],
    imports: [
        CommonModule,
        FacturaRoutingModule
    ]
})
export class FacturaModule { }
