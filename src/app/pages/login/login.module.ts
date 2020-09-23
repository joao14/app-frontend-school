import { ToolbarModule } from 'primeng/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import {ProgressSpinnerModule} from 'primeng/progressspinner';


@NgModule({
    imports: [
        CommonModule,
        LoginRoutingModule,
        ReactiveFormsModule,
        ToastModule,
        MessagesModule,
        MessageModule,
        ProgressSpinnerModule,
        ToolbarModule
        ],
    declarations: [LoginComponent]
})
export class LoginModule { }
