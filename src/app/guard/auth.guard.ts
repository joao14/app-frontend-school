import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate() {
        console.log('Consultando el token del sistema??');
        console.log(localStorage.getItem('token'));

        if (localStorage.getItem('token')) {
            console.log('NEXT');
            return true;
        }

        console.log('Segundo');
        
        this.router.navigate(['/login']);
        return false;
    }
}
