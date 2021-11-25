import { Component, OnInit } from '@angular/core';
import { ApisService } from 'src/services/apis.service';
import { Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng';
import { finca } from 'src/models/finca';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [MessageService]
})
export class EditComponent implements OnInit {

  edit: boolean;
  finca: finca;
  fincaTemp: finca;
  options: SelectItem[];

  constructor(private api: ApisService, private router: Router, private messageService: MessageService) { 
    if (this.router.getCurrentNavigation().extras.state != null) {
      this.fincaTemp = JSON.parse(this.router.getCurrentNavigation().extras.state.finca);
      this.edit = true;
    } else {
      this.edit = false;
    }
    this.inicializateValores();
  }

  ngOnInit(): void {
  }

  inicializateValores(){
    this.finca = {
      apellidos: this.fincaTemp != null ? this.fincaTemp['apellidos'] : "",
      auxcodi: this.fincaTemp != null ? this.fincaTemp['auxcodi'] : "",
      ciudad: this.fincaTemp != null ? this.fincaTemp['ciudad'] : "",
      contacto: this.fincaTemp != null ? this.fincaTemp['contacto'] : "",
      direccion: this.fincaTemp != null ? this.fincaTemp['direccion'] : "",
      email: this.fincaTemp != null ? this.fincaTemp['email'] : "",
      entiDni: this.fincaTemp != null ? this.fincaTemp['entiDni'] : "",
      entiId: this.fincaTemp != null ? this.fincaTemp['entiId'] : null,
      estado: this.fincaTemp != null ? this.fincaTemp['estado'] == "Activo" ? "A" : "I" : "A",
      fechregi: this.fincaTemp != null ? this.fincaTemp['fechregi'] : "",
      nombres: this.fincaTemp != null ? this.fincaTemp['nombres'] : "",
      pais: this.fincaTemp != null ? this.fincaTemp['pais'] : "",
      phone: this.fincaTemp != null ? this.fincaTemp['phone'] : "",
      razosoci: this.fincaTemp != null ? this.fincaTemp['razosoci'] : "",
      tipo: this.fincaTemp != null ? this.fincaTemp['tipo'] : "J",
      tipoenti: this.fincaTemp != null ? this.fincaTemp['tipoenti'] : "F",
    };

    this.options = [{ label: 'Activo', value: 'A' }, { label: 'Inactivo', value: 'I' }];
  }

  save() {  
    /*this.api.addfinca(this.finca, localStorage.getItem("token")).then(data => {
      
      if (data.headerApp.code === 200) {
        this.router.navigate(['fincas']);
        this.inicializateValores();
      }
    }).catch(err => {
      if (err.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    })*/

  }

  cancelar() {
    this.router.navigate(['fincas']);
  }

  modificar(){  
    /*this.api.updatefinca(this.finca, localStorage.getItem("token")).then(data => {      
      if (data.headerApp.code === 200) {
        this.router.navigate(['fincas']);
        this.inicializateValores();
      }
    }).catch(err => {
      if (err.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    })*/
  }

}
