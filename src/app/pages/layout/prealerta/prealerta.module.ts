import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrealertaRoutingModule } from './prealerta-routing.module';
import { PrealertaComponent } from './prealerta.component';
import { InputTextModule, PanelModule, AccordionModule, InputTextareaModule, RadioButtonModule, ButtonModule, AutoCompleteModule, DropdownModule, TableModule, ToolbarModule, CardModule, SplitButtonModule, SelectButtonModule, ToastModule, ConfirmDialogModule, KeyFilterModule, CalendarModule, FieldsetModule, CheckboxModule, DialogModule } from 'primeng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";



@NgModule({
  declarations: [PrealertaComponent],
  imports: [
    CommonModule,
    PrealertaRoutingModule,
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
    ConfirmDialogModule,
    ReactiveFormsModule,
    KeyFilterModule,
    CalendarModule,
    FieldsetModule,
    CheckboxModule,
    NgxSpinnerModule,
    DialogModule
  ]
})
export class PrealertaModule { }
 