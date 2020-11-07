import { AppMenuitemComponent } from './app.menuitem.component';
import { MenuComponent } from './menu.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    declarations: [
        MenuComponent,
        AppMenuitemComponent,       

    ],
    imports: [
        CommonModule,
        TranslateModule
    ],
    exports: [MenuComponent]
})

export class MenuModule { }
