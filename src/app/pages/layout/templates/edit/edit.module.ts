import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditComponent } from './edit.component';
import { EditRoutingModule } from './edit-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlockUIModule, ButtonModule, DataViewModule, DropdownModule, InputSwitchModule, InputTextareaModule, InputTextModule, SelectButtonModule, TableModule, ToastModule, ToolbarModule } from 'primeng';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { TranslateModule } from '@ngx-translate/core';



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
    NgxDropzoneModule,
    TranslateModule,
    DataViewModule,
    TableModule,
  ]
})
export class EditModule { }
