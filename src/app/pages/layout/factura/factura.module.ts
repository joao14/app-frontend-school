import { FacturaComponent } from './factura.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacturaRoutingModule } from './factura-routing.module';
import { InputTextModule, PanelModule, AccordionModule, InputTextareaModule, RadioButtonModule, ButtonModule, AutoCompleteModule, DropdownModule, TableModule, ToolbarModule, CardModule, SplitButtonModule, SelectButtonModule, ToastModule, ConfirmDialogModule } from 'primeng';
import { FormsModule } from '@angular/forms';



@NgModule({
    declarations: [FacturaComponent],
    imports: [
        CommonModule,
        FacturaRoutingModule,
        InputTextModule,
        PanelModule,
        AccordionModule,
        InputTextareaModule,
        RadioButtonModule,
        ButtonModule,
        FormsModule,
        AutoCompleteModule,
        DropdownModule,
        TableModule,
        ToolbarModule,
        CardModule,
        SplitButtonModule,
        SelectButtonModule,
        ToastModule,
        ConfirmDialogModule
        
    ]   
}) 
export class FacturaModule { }
