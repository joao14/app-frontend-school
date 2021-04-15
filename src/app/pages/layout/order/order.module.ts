import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './order.component';
import { AccordionModule, AutoCompleteModule, ButtonModule, CalendarModule, CardModule, CheckboxModule, ConfirmDialogModule, DialogModule, DropdownModule, FieldsetModule, InputTextareaModule, InputTextModule, KeyFilterModule, PanelModule, RadioButtonModule, SelectButtonModule, SharedModule, SplitButtonModule, TableModule, ToastModule, ToolbarModule, TooltipModule } from 'primeng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [OrderComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedModule,
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
    DialogModule,
    NgxSpinnerModule,
    TranslateModule,
    TooltipModule,
    FieldsetModule,
    CheckboxModule,
    CalendarModule
  ]
})
export class OrderModule { }
