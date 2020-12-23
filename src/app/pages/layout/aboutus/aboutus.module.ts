import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutusRoutingModule } from './aboutus-routing.module';
import { AboutusComponent } from './aboutus.component';
import { ButtonModule, InputTextModule, PasswordModule, ToastModule, ToolbarModule } from 'primeng';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared.module';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [AboutusComponent],
  imports: [
    CommonModule,
    AboutusRoutingModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    ToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordModule,
    ToastModule,
    SharedModule,
    TranslateModule
  ]
})
export class AboutusModule { }
