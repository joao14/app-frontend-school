import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FloresRoutingModule } from './flores-routing.module';
import { FloresComponent } from './flores.component';
import { TableModule, InputSwitchModule, ToastModule, MessagesModule, MessageModule, ToolbarModule, SelectButtonModule, InputTextModule, InputTextareaModule, ButtonModule, DropdownModule, BlockUIModule, CarouselModule, GalleriaModule, DialogModule, DataViewModule, DragDropModule } from 'primeng';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragdropDirective } from 'src/app/directive/dragdrop.directive';
import { CrystalLightboxModule } from '@crystalui/angular-lightbox';



@NgModule({
  declarations: [FloresComponent],
  imports: [
    CommonModule,
    FloresRoutingModule,
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
    CrystalLightboxModule
  ]
})
export class FloresModule { }
