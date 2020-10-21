import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentoComponent } from './documento.component';
import { DocumentoRoutingModule } from './documento-routing.module';
import { InputTextModule, PanelModule, AccordionModule, InputTextareaModule, RadioButtonModule, ButtonModule, AutoCompleteModule, DropdownModule, TableModule, ToolbarModule, CardModule, SplitButtonModule, SelectButtonModule, ToastModule, ConfirmDialogModule, CalendarModule, DynamicDialogModule, DialogModule, VirtualScrollerModule } from 'primeng';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [DocumentoComponent],
  imports: [
    CommonModule,
    DocumentoRoutingModule,
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
    CalendarModule,
    DynamicDialogModule,
    DialogModule,
    VirtualScrollerModule,
    TranslateModule
  ]
})
export class DocumentoModule { }
