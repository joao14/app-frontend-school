import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng';
import { mark } from 'src/models/mark';
import { ApisService } from 'src/services/apis.service';
import { Router } from '@angular/router';
import { client } from '../../clientes/edit/edit.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [MessageService]
})
export class EditComponent implements OnInit {


  edit: boolean;
  mark: mark;
  markTemp: mark;
  options: SelectItem[];
  nameClient: string;
  clients: Array<client> = [];

  constructor(private api: ApisService, private router: Router, private messageService: MessageService) {
    if (this.router.getCurrentNavigation().extras.state != null) {
      this.markTemp = JSON.parse(this.router.getCurrentNavigation().extras.state.mark);
      this.edit = true;
    } else {
      this.edit = false;
    }
    this.inicializateValores();
  }

  ngOnInit(): void {
  }

  inicializateValores() {
    this.options = [{ label: 'Activo', value: 'A' }, { label: 'Inactivo', value: 'I' }];
    this.getClients();
  }

  save() {
    this.api.addmark(this.mark, localStorage.getItem("token")).then(data => {
      if (data.headerApp.code === 200) {
        this.router.navigate(['marcas']);
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
    this.router.navigate(['marcas']);
  }

  modificar() {
    let mark = {
      marcId: this.mark.marcId,
      nombre: this.mark.nombre,
      estado: this.mark.estado
    }
    this.api.updatemark(mark, localStorage.getItem("token")).then(data => {
      if (data.headerApp.code === 200) {
        this.router.navigate(['marcas']);
        this.inicializateValores();
      }
    }).catch(err => {
      if (err.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    })
  }

  getClients() {
    this.nameClient = "";
    this.api.getclients(localStorage.getItem("token")).then(client => {
      if (client.headerApp.code === 200) {

        if (this.markTemp != null) {
          client.data.clientes.forEach(element => {
            if (this.markTemp.entiId == element.entiId) {
              this.nameClient = element.nombres + ' ' + element.apellidos;
            }
          });
        } else {
          this.clients = client.data.clientes;
        }

      }
    }).catch(err => {
      if (err.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    })
  }


}
