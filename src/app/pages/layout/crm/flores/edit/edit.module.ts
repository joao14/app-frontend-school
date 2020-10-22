import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditRoutingModule } from './edit-routing.module';
import { EditComponent } from './edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputSwitchModule, SelectButtonModule, DropdownModule, InputTextModule, InputTextareaModule, ButtonModule, ToolbarModule, ToastModule, BlockUIModule } from 'primeng';
import { NgxDropzoneModule } from 'ngx-dropzone';

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
    ButtonModule,
    NgxDropzoneModule
  ]
})
export class EditModule { }
