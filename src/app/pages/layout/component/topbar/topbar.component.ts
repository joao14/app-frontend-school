import { LayoutComponent } from './../../layout.component';
import { user } from './../../../../../models/user';
import { TranslateService } from '@ngx-translate/core';

import { Component, OnInit, Input, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.css'],
    providers: [TranslateService],
})
export class TopbarComponent implements OnInit {
    user: user;
    name: string;
    estado: boolean;
    menu: string;
    activeMenuUser: boolean;
    selectlanguajes: string;
    languajes: any[] = [];
    typerol: string;

    constructor(public app: LayoutComponent, private translate: TranslateService) {

        this.app.utilservice.isLoading.subscribe(data => {
            this.estado = data;
        })

        this.app.utilservice.typerolselected.subscribe(data => {
            this.typerol = data;
            this.menu = 'ROL';
        });

        this.app.utilservice.user.subscribe(data => {
            this.user = JSON.parse(data);
            this.name = this.user.name + ' ' + this.user.lastname;
        })
    }


    ngOnInit() {
        this.activeMenuUser = false;
        this.user = JSON.parse(localStorage.getItem('user'));
        this.name = this.user.name + ' ' + this.user.lastname;
       
        this.languajes = [
            { name: 'Español', code: 'es' },
            { name: 'English', code: 'en' },
            { name: 'Rusia', code: 'ru' },
            { name: 'China', code: 'ch' },
        ]
    }

    onOptionsSelected(lng: string) {
    }

    onChange(event) {
        this.translate.use(event.target.value);
    }

    onselectlanguajes(languajes: string) {
    }

    activeMenu() {
        if (this.activeMenuUser) {
            this.activeMenuUser = false
        } else {
            this.activeMenuUser = true;
        }
    }

    selectSubItem(menu: string) {
        if (this.menu == menu) {
            this.menu = "";
        } else {
            this.menu = menu;  
        }
    }


}
