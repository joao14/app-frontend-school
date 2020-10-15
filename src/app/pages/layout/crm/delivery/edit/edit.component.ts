import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng';
import { ApisService } from 'src/services/apis.service';
import { Router } from '@angular/router';
import { delivery } from 'src/models/delivery';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [MessageService]
})
export class EditComponent implements OnInit {

  edit: boolean;
  delivery: delivery;
  deliveryTemp: delivery;
  options: SelectItem[];

  constructor(private api: ApisService, private router: Router, private messageService: MessageService) {
    if (this.router.getCurrentNavigation().extras.state != null) {
      this.deliveryTemp = JSON.parse(this.router.getCurrentNavigation().extras.state.delivery);
      console.log(this.deliveryTemp);
      this.edit = true;
    } else {
      this.edit = false;
    }
    this.inicializateValores();
   }

  ngOnInit(): void {
  }

  inicializateValores(){
    console.log('Inicializando los valores');
    this.delivery = {
      apellidos: this.deliveryTemp != null ? this.deliveryTemp['apellidos'] : "",
      auxcodi: this.deliveryTemp != null ? this.deliveryTemp['auxcodi'] : "",
      ciudad: this.deliveryTemp != null ? this.deliveryTemp['ciudad'] : "",
      contacto: this.deliveryTemp != null ? this.deliveryTemp['contacto'] : "",
      direccion: this.deliveryTemp != null ? this.deliveryTemp['direccion'] : "",
      email: this.deliveryTemp != null ? this.deliveryTemp['email'] : "",
      entiDni: this.deliveryTemp != null ? this.deliveryTemp['entiDni'] : "",
      entiId: this.deliveryTemp != null ? this.deliveryTemp['entiId'] : null,
      estado: this.deliveryTemp != null ? this.deliveryTemp['estado']: "A",
      fechregi: this.deliveryTemp != null ? this.deliveryTemp['fechregi'] : "",
      nombres: this.deliveryTemp != null ? this.deliveryTemp['nombres'] : "",
      pais: this.deliveryTemp != null ? this.deliveryTemp['pais'] : "",
      phone: this.deliveryTemp != null ? this.deliveryTemp['phone'] : "",
      razosoci: this.deliveryTemp != null ? this.deliveryTemp['razosoci'] : "",
      tipo: this.deliveryTemp != null ? this.deliveryTemp['tipo'] : "J",
      tipoenti: this.deliveryTemp != null ? this.deliveryTemp['tipoenti'] : "Z",
    };

    console.log(this.delivery);

    this.options = [{ label: 'Activo', value: 'A' }, { label: 'Inactivo', value: 'I' }];
  }

  save() {
    console.log('[Guardando una delivery]');
    console.log(this.delivery);   
    this.api.adddelivery(this.delivery, localStorage.getItem("token")).then(data => {
      console.log(data);
      if (data.headerApp.code === 200) {
        this.router.navigate(['delivery']);
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
    this.router.navigate(['delivery']);
  }

  modificar(){
    console.log('[Modificando una delivery]');
    console.log(this.delivery);   
    this.api.updatedelivery(this.delivery, localStorage.getItem("token")).then(data => {
      console.log(data);
      if (data.headerApp.code === 200) {
        this.router.navigate(['delivery']);
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
