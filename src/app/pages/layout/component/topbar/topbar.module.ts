import { FormsModule } from '@angular/forms';
import { SharedModule } from 'primeng/primeng';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TopbarComponent } from './topbar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DropdownModule} from 'primeng/dropdown';

@NgModule({
    declarations: [TopbarComponent],
    imports: [
        CommonModule,
        DropdownModule,
        BrowserAnimationsModule,
        SharedModule,
        FormsModule
    ]
})
export class TopbarModule { }
