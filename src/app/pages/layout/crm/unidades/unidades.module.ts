import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UnidadesRoutingModule } from './unidades-routing.module';
import { UnidadesComponent } from './unidades.component';
import { AccordionModule, BlockUIModule, ButtonModule, DropdownModule, InputSwitchModule, InputTextareaModule, InputTextModule, MessageModule, MessagesModule, SelectButtonModule, TableModule, ToastModule, ToolbarModule } from 'primeng';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [UnidadesComponent],
  imports: [
    CommonModule,
    UnidadesRoutingModule,
    TableModule,
    InputSwitchModule,
    TranslateModule,
    ToastModule,
    MessagesModule,
    MessageModule,
    ToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    SelectButtonModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    DropdownModule,
    BlockUIModule,
    AccordionModule
  ]
})
export class UnidadesModule { }
