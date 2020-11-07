import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditComponent } from './edit.component';
import { EditRoutingModule } from './edit-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputSwitchModule, SelectButtonModule, DropdownModule, InputTextModule, InputTextareaModule, ButtonModule, ToolbarModule, ToastModule, BlockUIModule, FieldsetModule, PickListModule, KeyFilterModule, PasswordModule } from 'primeng';



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
    FieldsetModule,
    PickListModule,
    KeyFilterModule,
    PasswordModule
  ]
})
export class EditModule { }
