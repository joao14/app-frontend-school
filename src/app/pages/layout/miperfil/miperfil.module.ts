import { ToolbarModule } from 'primeng/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MiperfilRoutingModule } from './miperfil-routing.module';
import { MiperfilComponent } from './miperfil.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [MiperfilComponent],
  imports: [
    CommonModule,
    MiperfilRoutingModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    ToolbarModule
  ]
})
export class MiperfilModule { }
