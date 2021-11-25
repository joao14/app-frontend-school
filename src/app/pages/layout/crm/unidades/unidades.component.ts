import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng';
import { unidad } from 'src/models/unidad';
import { ApisService } from 'src/services/apis.service';
import { UtilService } from 'src/services/util.service';



@Component({
  selector: 'app-unidades',
  templateUrl: './unidades.component.html',
  styleUrls: ['./unidades.component.css'],
  providers: [TranslateService, MessageService],
})
export class UnidadesComponent implements OnInit {

  unidades: Array<unidad> = []

  constructor(private apis: ApisService, private router: Router, private utilservice: UtilService) {
  }

  ngOnInit(): void {
    this.getUnidades()
  }

  getUnidades(){
    this.utilservice.isLoading.next(true);
    this.apis.getunidades(localStorage.getItem("token")).then(data => {
      if (data.headerApp.code == 200) {
         this.unidades= data.data.unidades
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

  addUnidad(){
    this.router.navigate(['/editunidades']);
  }

  edit(unidad: unidad) {
    this.router.navigate(['/editunidades'], { state: { unidad: JSON.stringify(unidad) } });
  }

}
