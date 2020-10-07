import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class MenuService {

    private menuSource = new Subject<string>();
    private resetSource = new Subject();

    menuSource$ = this.menuSource.asObservable();
    resetSource$ = this.resetSource.asObservable();

    onMenuStateChange(key: string) {
        console.log('Change estado');
        console.log(key);
        console.log('HOla');
        this.menuSource.next(key);
    }

    reset() {
        console.log('RESET');
        this.resetSource.next();
    }
}
