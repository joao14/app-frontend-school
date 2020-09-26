import { BreadcrumbService } from './../../../../../services/breadcrumb.service';
import { BreadcrumbComponent } from './breadcrumb.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
    declarations: [BreadcrumbComponent],
    imports: [
        CommonModule
    ],
    providers: [BreadcrumbService]
})
export class BreadcrumbModule { }
