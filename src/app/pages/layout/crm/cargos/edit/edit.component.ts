import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService, SelectItem } from 'primeng';
import { cargo } from 'src/models/cargo';
import { ApisService } from 'src/services/apis.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [TranslateService, MessageService],
})
export class EditComponent implements OnInit {

  edit: boolean;
  cargo: cargo;
  cargoTemp: cargo;
  options: SelectItem[];

  constructor(private api: ApisService, private router: Router) { 
    if (this.router.getCurrentNavigation().extras.state != null) {
      this.cargoTemp = JSON.parse(this.router.getCurrentNavigation().extras.state.cargo);
      this.edit = true;
    } else {
      this.edit = false;
    }
    this.inicializateValores();
  }

  ngOnInit(): void {
  }

  inicializateValores(){
    this.cargo={
      cargId: this.cargoTemp != null ? this.cargoTemp['cargId'] : null,
      cargNombre: this.cargoTemp != null ? this.cargoTemp['cargNombre'] : "",
      cargDescripcion: this.cargoTemp != null ? this.cargoTemp['cargDescripcion'] : "", 
    }
  }
 
  save() {  
    this.api.addcargo(this.cargo, localStorage.getItem("token")).then(data => {
      if (data.headerApp.code === 200) {
        this.router.navigate(['cargos']);
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
    this.router.navigate(['cargos']);
  }

  modificar(){  
    this.api.updatecargo(this.cargo, localStorage.getItem("token")).then(data => {     
      if (data.headerApp.code === 200) {
        this.router.navigate(['cargos']);
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
