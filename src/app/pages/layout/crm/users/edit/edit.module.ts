import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditRoutingModule } from './edit-routing.module';
import { EditComponent } from './edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlockUIModule, ButtonModule, DropdownModule, FieldsetModule, InputSwitchModule, InputTextareaModule, InputTextModule, PasswordModule, PickListModule, SelectButtonModule, ToastModule, ToolbarModule } from 'primeng';


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
    BlockUIModule,
    PasswordModule,
    PickListModule,
    FieldsetModule,
  ]
})
export class EditModule { }
