import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceGuard implements CanActivate {

  constructor(private router: Router) {
    
   }
  
  canActivate() {   
    return true;
  }
  
}
