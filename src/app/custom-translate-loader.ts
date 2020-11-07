import { Observable } from 'rxjs';
import { TranslateLoader } from '@ngx-translate/core';
import { en } from '../assets/languajes/en';
import { es } from '../assets/languajes/es';
import { ch } from '../assets/languajes/ch';
import {ru} from '../assets/languajes/ru';

export class CustomTranslateLoader implements TranslateLoader {

    public getTranslation(lang: string): Observable<any> {
        return Observable.create(observer => {
            switch (lang) {
                case 'ch':
                    observer.next(ch);
                    break;
                case 'en':
                    observer.next(en);
                    break;
                case 'es':
                    observer.next(es);
                    break;
                case 'ru':
                    observer.next(ru);
                    break;
                /*default:
                    observer.next(es);
                    break;*/
            }
            observer.complete();
        })
    }

}
