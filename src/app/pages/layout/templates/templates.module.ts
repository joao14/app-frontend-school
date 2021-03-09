import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateRoutingModule } from './template-routing.module';
import { TemplatesComponent } from './templates.component';
import { BlockUIModule, ButtonModule, CarouselModule, ConfirmDialog, DataViewModule, DialogModule, DropdownModule, InputSwitchModule, InputTextareaModule, InputTextModule, MessageModule, MessagesModule, SelectButtonModule, TableModule, ToastModule, ToolbarModule } from 'primeng';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CrystalLightboxModule } from '@crystalui/angular-lightbox';
import { EditModule } from './edit/edit.module';



@NgModule({
  declarations: [TemplatesComponent],
  imports: [
    CommonModule,
    TemplateRoutingModule,
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
    CarouselModule,
    DialogModule,
    DataViewModule,
    CrystalLightboxModule,
  ]
})
export class TemplatesModule { }
