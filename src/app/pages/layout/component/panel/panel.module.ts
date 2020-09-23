import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PanelComponent } from './panel.component';
import { AccordionModule, SharedModule } from 'primeng/primeng';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [PanelComponent],
    imports: [
        CommonModule,
        AccordionModule,
        SharedModule,
        BrowserAnimationsModule
    ]
})
export class PanelModule { }
