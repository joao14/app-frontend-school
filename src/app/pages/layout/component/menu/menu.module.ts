import { AppMenuitemComponent } from './app.menuitem.component';
import { MenuComponent } from './menu.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        MenuComponent,
        AppMenuitemComponent,

    ],
    imports: [
        CommonModule
    ],
    exports: [MenuComponent]
})

export class MenuModule { }
