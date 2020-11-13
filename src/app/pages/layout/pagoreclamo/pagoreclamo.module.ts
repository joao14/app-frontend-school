import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagoreclamoComponent } from './pagoreclamo.component';
import { PagoreclamoRoutingModule } from './pagoreclamo-routing.module';
import { InputTextModule, PanelModule, AccordionModule, InputTextareaModule, RadioButtonModule, ButtonModule, AutoCompleteModule, DropdownModule, TableModule, ToolbarModule, CardModule, SplitButtonModule, SelectButtonModule, ToastModule, ConfirmDialogModule, KeyFilterModule, CalendarModule, FieldsetModule } from 'primeng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [PagoreclamoComponent],
  imports: [
    CommonModule,
    PagoreclamoRoutingModule,
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
    ReactiveFormsModule,
    SplitButtonModule,
    SelectButtonModule,
    ToastModule,
    ConfirmDialogModule,
    KeyFilterModule,  
    CalendarModule,
    NgxDropzoneModule,
    FieldsetModule,
    TranslateModule,
    NgxSpinnerModule
  ]
})
export class PagoreclamoModule { }
