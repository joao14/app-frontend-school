import { ForgotComponent } from './forgot.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';


@NgModule({
  declarations: [ForgotComponent],
  imports: [
    CommonModule,
    ToastModule,
    MessagesModule,
    MessageModule,
    ReactiveFormsModule
  ]
})
export class ForgotModule { }
