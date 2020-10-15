import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng';
import { ApisService } from 'src/services/apis.service';
import { Router } from '@angular/router';

export interface Flower {
  florId: string;
  nombre: string;
  estado: string;
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [MessageService]
})
export class EditComponent implements OnInit {

  edit: boolean;
  options: SelectItem[];
  flower: Flower;
  flowerTemp: Flower;


  constructor(private api: ApisService, private router: Router, private messageService: MessageService) {    
    if (this.router.getCurrentNavigation().extras.state != null) {
      this.flowerTemp = JSON.parse(this.router.getCurrentNavigation().extras.state.flower);
      console.log(this.flowerTemp);
      this.edit = true;
    } else {
      this.edit = false;
    }
    this.inicializateValores();
  }

  ngOnInit(): void {
  }

  save() {
    console.log('[Guardando la flor]');
    console.log(this.flower);   
    this.api.addflowers(this.flower, localStorage.getItem("token")).then(data => {
      console.log(data);
      if (data.headerApp.code === 200) {
        this.router.navigate(['flores']);
        this.inicializateValores();
      }
    }).catch(err => {
      console.log(err);
      if (err.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    })

  }

  cancelar() {
    this.router.navigate(['flores']);
  }

  selecttipo(event) {
    console.log('VAMOS TIPO...');
    console.log(event);
    
  }

  inicializateValores() {
    this.flower = {
      florId: this.flowerTemp != null ? this.flowerTemp['id'] : "",
      nombre: this.flowerTemp != null ? this.flowerTemp['name'] : "",
      estado: this.flowerTemp != null ? this.flowerTemp['state'] == "Activo" ? "A" : "I" : "A"
    };
    this.options = [{ label: 'Activo', value: 'A' }, { label: 'Inactivo', value: 'I' }];
  }

  modificar() {
    this.api.updateflower(this.flower, localStorage.getItem("token")).then(data => {
      console.log("Actualizar flor");
      console.log(data);
      if (data.headerApp.code === 200) {
        this.router.navigate(['flores']);
        this.inicializateValores();
      }

    }).catch(err => {
      console.log(err);
      if (err.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    })

  }




}
