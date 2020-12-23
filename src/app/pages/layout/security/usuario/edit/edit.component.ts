import { Component, OnInit } from '@angular/core';
import { ApisService } from 'src/services/apis.service';
import { Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng';
import { TranslateService } from '@ngx-translate/core';


export interface Options {
  id: number,
  name: string
}

export interface Empresa {
  dni: string,
  entiid: number,
  nombcome: string,
  razosoci: string
}

export interface Roles {
  estado: string,
  icono: string,
  nombre: string,
  rolId: number,
  usroId: number
}

export interface User {
  nombres: string,
  apellidos: string,
  dni: string
  email: string,
  nickname: string,
  token: string,
  usuaid: number,
  estado: string,
  empresa: Empresa,
  roles: Array<Roles>
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [TranslateService, MessageService],
})
export class EditComponent implements OnInit {


  user: User;
  roles: Array<Roles> = [];
  options: SelectItem[];
  lista: Array<Options> = [];
  types: any[] = [];
  user_: User;
  edit: boolean;
  blockedPanel: boolean = false;
  looking: boolean = false;
  icon: string = "pi pi-eye";

  constructor(private api: ApisService, private router: Router, private messageService: MessageService) {
    if (this.router.getCurrentNavigation().extras.state != null) {
      this.user_ = JSON.parse(this.router.getCurrentNavigation().extras.state.user);
      this.edit = true;
      this.getRoles();

    } else {
      this.edit = false;
    }
    this.inicializateValores();
  }

  ngOnInit() {
  }

  inicializateValores() {
    this.user = {
      usuaid: this.user_ != null ? this.user_['usuaid'] : null,
      dni: this.user_ != null ? this.user_['dni'] : "",
      nombres: this.user_ != null ? this.user_['nombres'] : "",
      apellidos: this.user_ != null ? this.user_['apellidos'] : "",
      email: this.user_ != null ? this.user_['email'] : "",
      nickname: this.user_ != null ? this.user_['nickname'] : "",
      token: this.user_ != null ? atob(this.user_['token']) : "",
      estado: this.user_ != null ? this.user_['estado'] == 'Activo' ? "A" : "I" : "A",
      empresa: this.user_ != null ? this.user_['empresa'] : null,
      roles: this.user_ != null ? this.user_['roles'] : null,
    };

    this.options = [{ label: 'Activo', value: 'A' }, { label: 'Inactivo', value: 'I' }];
    this.types = [{ name: 'Rosa Mística', code: '1' }, { name: 'Clientes', code: 'C' },
    { name: 'Fincas', code: 'F' },
    { name: 'E. Cargo', code: 'Z' }];

  }

  async getRoles() {
    console.log('ROles');
    console.log('Este es el usuario');
    console.log(this.user_);
    await this.api.getRoles(localStorage.getItem("token")).then(roles => {
      console.log(roles);
      if (roles.headerApp.code === 200) {
        roles.data.roles.filter(rol => {
          //Se valida cuando un cliente no es rosa mistica
          if (this.user_.empresa.entiid > 1 && rol.nombre.toUpperCase() == 'CLIENTE') {
            if (!this.user.roles.some(data => data.nombre == rol.nombre)) {
              this.roles.push(rol);
            }
          }
          //Se valida cuando es rosa mistica
          if (this.user_.empresa.entiid == 1 && rol.nombre.toUpperCase() != 'CLIENTE') {
            if (!this.user.roles.some(data => data.nombre == rol.nombre)) {
              this.roles.push(rol);
            }
          }
        });
      }
    }).catch(error => {
      console.log(error);
      if (error.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    })
  }

  onOptionsSelected(type: string) {
    switch (type['code']) {
      case '1':
        this.lista = [];
        this.lista = [{ name: 'Rosa Mística', id: 1 }]
        break;
      case 'C':
        this.getClientes();
        break;
      case 'F':
        this.getFincas();
        break;
      case 'Z':
        this.getEmpresacargo();
        break;
      default:
        console.log('No se encuentra el tipo de institución');
        break;
    }
  }

  getFincas() {
    this.lista = [];
    this.api.getfinca(localStorage.getItem("token")).then(farm => {
      if (farm.headerApp.code === 200) {
        let temp: Options[] = [];
        farm.data.farms.forEach(element => {
          if (element.estado == 'A') {
            temp.push({
              id: element.entiId,
              name: element.nombres
            })
          }
        });
        this.lista = temp;
      }
    }).catch(error => {
      console.log(error);
      if (error.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    })
  }

  getEmpresacargo() {
    this.lista = [];
    this.api.getdeliveries(localStorage.getItem("token")).then(delivery => {
      if (delivery.headerApp.code === 200) {
        let temp: Options[] = [];
        delivery.data.cargocompanies.forEach(element => {
          if (element.estado == 'A') {
            temp.push({
              id: element.entiId,
              name: element.nombres
            })
          }
          this.lista = temp;
        });
      }
    }).catch(error => {
      console.log(error);
      if (error.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    })
  }

  getClientes() { 
    this.lista = [];
    this.api.getclients(localStorage.getItem("token")).then(client => {
      if (client.headerApp.code === 200) {
        let temp: Options[] = [];
        client.data.clientes.forEach(element => {
          if (element.cliente.estado == 'A') {
            temp.push({
              id: element.cliente.entiId,
              name: (element.cliente.nombres == null ? '' : element.cliente.nombres) + ' ' + (element.cliente.apellidos == null ? '' : element.cliente.apellidos)
            })
          }
        });

        this.lista = temp;

      }
    }).catch(error => {
      console.log(error);
      if (error.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    })
  }


  modificaruser() {
    let user = {
      apellidos: this.user.apellidos,
      nombres: this.user.nombres,
      dni: this.user.dni,
      nickname: this.user.nickname,
      email: this.user.email,
      clave: btoa(this.user.token),
      entiId: this.user.empresa['entiid'],
      usuaId: this.user.usuaid,
      estado: this.user.estado,
      fechregi: new Date().toISOString()
    }
    this.api.updateUser(user, localStorage.getItem("token")).then(data => {
      if (data.headerApp.code === 200) {
        this.router.navigate(['usuario']);
      }
    }).catch(err => {
      console.log(err);
      if (err.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    })

  }

  saveuser() {

    if (this.user.apellidos == '' || this.user.nombres == '' || this.user.dni == '' || this.user.nickname == ''
      || this.user.email == '' || this.user.token == '' || this.user.empresa == null) {
      console.log('algunos campos estan vacios');
      this.messageService.add({ severity: 'error', summary: 'Rosa Mística', detail: 'Los campos son obligatorios' });
      return
    }

    console.log('[Guardando el usuario]');
    let user = {
      apellidos: this.user.apellidos,
      nombres: this.user.nombres,
      dni: this.user.dni,
      nickname: this.user.nickname,
      email: this.user.email,
      clave: btoa(this.user.token),
      entiId: this.user.empresa['id'],
      estado: this.user.estado
    }

    this.api.addUser(user, localStorage.getItem("token")).then(data => {
      if (data.headerApp.code === 200) {
        this.router.navigate(['usuario']);
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
    this.router.navigate(['usuario']);
  }

  enabled(event: any) {
    event.items.forEach(async (element) => {
      if ((element.nombre).toUpperCase() == 'CLIENTE' && this.user.empresa.entiid == 1) {
        this.messageService.add({ severity: 'error', summary: 'Rosa Mística', detail: 'No puede agregar perfil de cliente a la empresa original' });
        return true;
      }
      let rol = {
        usuaId: this.user.usuaid,
        rolId: element.rolId
      }
      await this.api.addRolesByUser(rol, localStorage.getItem("token")).then(data => {
        if (data.headerApp.code === 200) {
          this.user.roles = data.data.roles;
          this.messageService.add({ severity: 'info', summary: 'Rosa Mística', detail: 'Se agrego un nuevo rol al usuario' });
        }
      }).catch(err => {
        console.log(err);
        if (err.error.code == 401) {
          localStorage.clear();
          this.router.navigate(['/login']);
        }
      })

    });
  }

  disabled(event: any) {


    event.items.forEach(async element => {

      let rol = {
        usroId: element.usroId,
        usuaId: this.user.usuaid,
        rolId: element.rolId
      }
      this.api.removeRolesByUser(rol, localStorage.getItem("token")).then(data => {
        console.log(data);
        if (data.headerApp.code === 200) {
          this.messageService.add({ severity: 'info', summary: 'Rosa Mística', detail: 'Se quito un rol al usuario' });
        }
      }).catch(err => {
        console.log(err);
        if (err.error.code == 401) {
          localStorage.clear();
          this.router.navigate(['/login']);
        }
      })
    });
  }

  changelookpasswor() {
    if (this.looking) {
      this.looking = false;
      this.icon = "pi pi-eye";
    } else {
      this.looking = true;
      this.icon = "pi pi-eye-slash";
    }
  }

}
