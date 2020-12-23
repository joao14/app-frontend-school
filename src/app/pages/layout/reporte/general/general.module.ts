import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralRoutingModule } from './general-routing.module';
import { GeneralComponent } from './general.component';
import { SharedModule } from 'src/app/shared.module';
import { AccordionModule, AutoCompleteModule, ButtonModule, CalendarModule, CardModule, CheckboxModule, ConfirmDialogModule, DialogModule, DropdownModule, DynamicDialogModule, FieldsetModule, InputTextareaModule, InputTextModule, PanelModule, RadioButtonModule, SelectButtonModule, SplitButtonModule, TableModule, ToastModule, ToolbarModule, VirtualScrollerModule } from 'primeng';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [GeneralComponent],
  imports: [
    CommonModule,
    GeneralRoutingModule,
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
    SplitButtonModule,
    SelectButtonModule,
    ToastModule,
    ConfirmDialogModule,
    CalendarModule,
    DynamicDialogModule,
    DialogModule,
    VirtualScrollerModule,
    TranslateModule,
    NgxSpinnerModule,
    FieldsetModule,
    CheckboxModule
  ]
})
export class GeneralModule { }
