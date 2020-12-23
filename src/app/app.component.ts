import { TranslateService } from '@ngx-translate/core';
import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    constructor(private translate: TranslateService) {
        this.translate.setDefaultLang('es');
        this.translate.onLangChange.subscribe(x => {
            //console.log('Se ha cambiado de lenguaje', x);
        }, error => {
            //console.log('onchanged failed', error);
        })
    }

}
