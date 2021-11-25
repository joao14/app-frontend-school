import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService, SelectItem } from 'primeng';
import { unidad } from 'src/models/unidad';
import { ApisService } from 'src/services/apis.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [TranslateService, MessageService],
})
export class EditComponent implements OnInit {

  edit: boolean;
  unidad: unidad;
  unidadTemp: unidad;
  options: SelectItem[];

  constructor(private api: ApisService, private router: Router) { 
    if (this.router.getCurrentNavigation().extras.state != null) {
      this.unidadTemp = JSON.parse(this.router.getCurrentNavigation().extras.state.unidad);
      this.edit = true;
    } else {
      this.edit = false;
    }
    this.inicializateValores();
  }

  ngOnInit(): void {
  }

  inicializateValores(){
    this.unidad={
      unidId: this.unidadTemp != null ? this.unidadTemp['unidId'] : null,
      unidNombre: this.unidadTemp != null ? this.unidadTemp['unidNombre'] : "",
      unidDescripcion: this.unidadTemp != null ? this.unidadTemp['unidDescripcion'] : "", 
    }
  }

  save() {  
    this.api.addunidad(this.unidad, localStorage.getItem("token")).then(data => {
      if (data.headerApp.code === 200) {
        this.router.navigate(['unidades']);
        this.inicializateValores();
      }
    }).catch(err => {
      if (err.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    })

  }

  cancelar() {
    this.router.navigate(['unidades']);
  }

  modificar(){  
    this.api.updateunidad(this.unidad, localStorage.getItem("token")).then(data => {     
      if (data.headerApp.code === 200) {
        this.router.navigate(['unidades']);
        this.inicializateValores();
      }
    }).catch(err => {
      if (err.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    })
  }


}
