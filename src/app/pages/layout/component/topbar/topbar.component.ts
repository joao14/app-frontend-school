import { LayoutComponent } from './../../layout.component';
import { user } from './../../../../../models/user';
import { TranslateService } from '@ngx-translate/core';
import { SelectItem } from 'primeng/primeng';

import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-topbar',
    templateUrl: './topbar.component.html',
    styleUrls: ['./topbar.component.css'],
    providers: [TranslateService],
})
export class TopbarComponent implements OnInit {

    user: user;
    name: string;

    constructor(public app: LayoutComponent, private translate: TranslateService) { }

    ngOnInit(): void {

        this.user = JSON.parse(localStorage.getItem('user'));
        this.name = this.user.name + ' ' + this.user.lastname;
        console.log('Usuario seleccionado');
        console.log(this.user);
    }

    onOptionsSelected(lng: string) {
        console.log('Seleccionar' + lng);
    }

    onChange(event) {
        this.translate.use(event.target.value);
    }

    onselectlanguajes(languajes: string){
        console.log('Esta cambiando el lenguaje');
        
    }


}
