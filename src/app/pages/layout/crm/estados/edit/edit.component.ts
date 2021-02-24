import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng';
import { ApisService } from 'src/services/apis.service';

export interface Status{
  titrId:string,
  nombre: string,
  estado: string,
  tipo: string,
  docuprin: string,
  categoria: string
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [MessageService]
})
export class EditComponent implements OnInit {

  
  edit: boolean;
  status: Status;
  statusTemp: Status;
  options: SelectItem[];

  constructor(private api: ApisService, private router: Router, private messageService: MessageService) { 
    if (this.router.getCurrentNavigation().extras.state != null) {
      this.statusTemp = JSON.parse(this.router.getCurrentNavigation().extras.state.estado);
      this.edit = true;
    } else {
      this.edit = false;
    }
    this.inicializateValores();
  }

  ngOnInit(): void {
  }

  inicializateValores(){
    this.status = {
      titrId: this.statusTemp != null ? this.statusTemp['titrId'] : "",
      nombre: this.statusTemp != null ? this.statusTemp['nombre'] : "",
      estado: this.statusTemp != null ? this.statusTemp['estado'] : "A",
      tipo: this.statusTemp != null ? this.statusTemp['tipo'] : "",
      docuprin: this.statusTemp != null ? this.statusTemp['docuprin'] : "",
      categoria: this.statusTemp != null ? this.statusTemp['categoria'] : ""
    };

    this.options = [{ label: 'Activo', value: 'A' }, { label: 'Inactivo', value: 'I' }];
  }

  save() { 
    let status={
      nombre: this.status.nombre,
      estado: this.status.estado,
      categoria: "PRE"
    } 
    
    this.api.addstatusprealert(status, localStorage.getItem("token")).then(data => {
     
      if (data.headerApp.code === 200) {
        this.router.navigate(['estados']);
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
    this.router.navigate(['estados']);
  }

  modificar(){  
    let status={
      titrId: this.status.titrId,
      nombre: this.status.nombre,
      estado: this.status.estado,
      categoria: "PRE"
    } 
    this.api.updatestatusprealert(status, localStorage.getItem("token")).then(data => {      
      if (data.headerApp.code === 200) {
        this.router.navigate(['estados']);
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
