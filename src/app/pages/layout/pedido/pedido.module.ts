import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoComponent } from './pedido.component';
import { PedidoRoutingModule } from './pedido-routing.module';
import { AccordionModule, AutoCompleteModule, ButtonModule, CalendarModule, CardModule, ConfirmDialogModule, DialogModule, DropdownModule, FieldsetModule, InputTextareaModule, InputTextModule, KeyFilterModule, PanelModule, RadioButtonModule, SelectButtonModule, SharedModule, SplitButtonModule, StepsModule, TableModule, ToastModule, ToolbarModule, TooltipModule } from 'primeng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TranslateModule } from '@ngx-translate/core';

import { NgWizardModule, NgWizardConfig, THEME } from 'ng-wizard';

const ngWizardConfig: NgWizardConfig = {
  theme: THEME.default
};

@NgModule({
  declarations: [PedidoComponent],
  imports: [
    CommonModule,
    PedidoRoutingModule,
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
    CalendarModule,  
    NgWizardModule.forRoot(ngWizardConfig)
  ]
})
export class PedidoModule { }
