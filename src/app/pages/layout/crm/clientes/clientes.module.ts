import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesComponent } from './clientes.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TranslateModule } from '@ngx-translate/core';
import { MessageModule, SelectButtonModule, InputTextareaModule, BlockUIModule, AccordionModule, KeyFilterModule } from 'primeng';
import { ToolbarModule } from 'primeng/toolbar';

@NgModule({
    declarations: [ClientesComponent],
    imports: [
        CommonModule,
        ClientesRoutingModule,
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
        AccordionModule,   
        KeyFilterModule     
    ]
})
export class ClientesModule { }
