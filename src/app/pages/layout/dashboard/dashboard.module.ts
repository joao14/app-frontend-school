import { FullCalendarModule } from 'primeng/fullcalendar';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { PanelModule } from 'primeng/panel';
import { DropdownModule } from 'primeng/dropdown';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
    imports: [
        CommonModule,
        DashboardRoutingModule,
        DropdownModule,
        TranslateModule,
        PanelModule,
        CheckboxModule,
        TableModule,
        FullCalendarModule
    ],
    declarations: [
        DashboardComponent
    ]
})
export class DashboardModule { }
