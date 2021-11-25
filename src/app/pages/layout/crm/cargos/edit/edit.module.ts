import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditRoutingModule } from './edit-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlockUIModule, ButtonModule, DropdownModule, InputSwitchModule, InputTextareaModule, InputTextModule, SelectButtonModule, ToastModule, ToolbarModule } from 'primeng';
import { EditComponent } from './edit.component';


@NgModule({
  declarations: [EditComponent],
  imports: [
    CommonModule,
    EditRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    InputSwitchModule,
    SelectButtonModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    ToolbarModule,
    ToastModule,
    BlockUIModule
  ]
})
export class EditModule { }
