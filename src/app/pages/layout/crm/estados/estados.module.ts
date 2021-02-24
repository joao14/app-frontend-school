import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstadosRoutingModule } from './estados-routing.module';
import { EstadosComponent } from './estados.component';
import { AccordionModule, BlockUIModule, ButtonModule, DropdownModule, InputSwitchModule, InputTextareaModule, InputTextModule, MessageModule, MessagesModule, SelectButtonModule, TableModule, ToastModule, ToolbarModule } from 'primeng';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({ 
  declarations: [EstadosComponent],
  imports: [
    CommonModule,
    EstadosRoutingModule,
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
export class EstadosModule { }
