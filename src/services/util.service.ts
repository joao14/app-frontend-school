
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  isLoading= new Subject<any>();

  rolselected=new Subject<any>();

  constructor() { }

  

}
