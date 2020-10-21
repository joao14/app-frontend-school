import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FincaComponent } from './finca.component';
import { FincaRoutingModule } from './finca-routing.module';
import { TableModule, InputSwitchModule, ToastModule, MessagesModule, MessageModule, ToolbarModule, SelectButtonModule, InputTextModule, InputTextareaModule, ButtonModule, DropdownModule, BlockUIModule, AccordionModule } from 'primeng';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [FincaComponent],
  imports: [
    CommonModule,
    FincaRoutingModule,
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
export class FincaModule { }
