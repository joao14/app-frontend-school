import { LayoutComponent } from './../../layout.component';
import { user } from './../../../../../models/user';
import { TranslateService } from '@ngx-translate/core';
import { SelectItem } from 'primeng/primeng';

import { Component, OnInit } from '@angular/core';

export interface Languajes {
    name: string;
    code: string;
}

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

    user: user;
    name: string;
    languajes: Languajes[];
    languajeSelected: Languajes;

    constructor(public app: LayoutComponent, private translate: TranslateService) { }

    ngOnInit(): void {

        this.user = JSON.parse(localStorage.getItem('user'));
        this.name = this.user.name + ' ' + this.user.lastname;
        console.log('Usuario seleccionado');
        console.log(this.user);

        //An array of cities
        this.languajes = [
            { name: 'Español', code: 'es' },
            { name: 'English', code: 'en' },
            { name: '日本人', code: 'ch' },
        ];
        console.log('Languajes');
        console.log(this.languajes);

    }

    onOptionsSelected(lng: string) {
        console.log('Seleccionar' + lng);
    }

    onChange(event) {
        console.log('event :' + event);
        console.log(event);
        console.log(this.languajeSelected.name);
        this.translate.use(event.target.value);
    }



}
