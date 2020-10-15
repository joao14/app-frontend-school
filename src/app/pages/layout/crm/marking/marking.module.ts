import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarkingComponent } from './marking.component';
import { MarketingRoutingModule } from './marketing-routing.module';
import { TableModule, InputSwitchModule, ToastModule, MessagesModule, MessageModule, ToolbarModule, SelectButtonModule, InputTextModule, InputTextareaModule, ButtonModule, DropdownModule } from 'primeng';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [MarkingComponent],
  imports: [
    CommonModule,
    MarketingRoutingModule,
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
  ]
})
export class MarkingModule { }
