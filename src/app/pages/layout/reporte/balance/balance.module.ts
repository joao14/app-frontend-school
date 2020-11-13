import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BalanceComponent } from './balance.component';
import { BalanceRoutingModule } from './balance-routing.module';
import { InputTextModule, PanelModule, AccordionModule, InputTextareaModule, RadioButtonModule, ButtonModule, AutoCompleteModule, DropdownModule, TableModule, ToolbarModule, CardModule, SplitButtonModule, SelectButtonModule, ConfirmDialogModule, ToastModule, CalendarModule, DynamicDialogModule, DialogModule, VirtualScrollerModule } from 'primeng';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared.module';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [BalanceComponent],
  imports: [
    CommonModule,
    BalanceRoutingModule,
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
    SharedModule,
    NgxSpinnerModule
  ]
})
export class BalanceModule { }
