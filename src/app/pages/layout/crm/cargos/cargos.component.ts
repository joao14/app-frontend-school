import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng';
import { cargo } from 'src/models/cargo';
import { ApisService } from 'src/services/apis.service';
import { UtilService } from 'src/services/util.service';

@Component({
  selector: 'app-cargos',
  templateUrl: './cargos.component.html',
  styleUrls: ['./cargos.component.css'],
  providers: [TranslateService, MessageService],
})
export class CargosComponent implements OnInit {

  cargos: Array<cargo> = []

  constructor(private apis: ApisService, private router: Router, private utilservice: UtilService) {
  }

  ngOnInit(): void {
    this.getCargos()
  }
 
  getCargos(){
    this.utilservice.isLoading.next(true);
    this.apis.getcargos(localStorage.getItem("token")).then(data => {
      if (data.headerApp.code == 200 || data.headerApp.code == 0) {
         this.cargos= data.data.cargos 
        this.utilservice.isLoading.next(false);
      }
    }).catch(err => {
      this.utilservice.isLoading.next(false);
      if (err.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }

    })
  } 

  addCargo(){ 
    this.router.navigate(['/editcargos']);
  }

  edit(cargo: cargo) {
    this.router.navigate(['/editcargos'], { state: { cargo: JSON.stringify(cargo) } });
  }


}
