import { Component, OnInit } from '@angular/core';
import { ApisService } from 'src/services/apis.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng';
import { TranslateService } from '@ngx-translate/core';
import { UtilService } from 'src/services/util.service';

export interface schedule{
  cour_name: string;
  day_name: string;
  hour_end: string;
  hour_start: string;
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
  dni: number
  email: string,
  nickname: string,
  token: string,
  usuaid: string,
  estado: string,
  empresa: Empresa,
  roles: Array<Roles>
}

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css'],
  providers: [TranslateService, MessageService],
})
export class UsuarioComponent implements OnInit {

  users: Array<User> = [];
  identificacion: string = "";
  schedules: Array<schedule> = [];

  constructor(private api: ApisService, private router: Router, private messageService: MessageService, private utilService: UtilService) { 
   
  }

  ngOnInit(): void {
    this.identificacion = "";
    //this.getUsers();
    this.getschedules();
  }

  getschedules(){
    this.utilService.isLoading.next(true);
    this.api.getSchedule(localStorage.getItem('token')).then(data => {
        console.log(data);
        this.schedules=data.schedule
        this.utilService.isLoading.next(false);
    }).catch(error => {
      this.utilService.isLoading.next(false);
     /* if (error.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }*/
    })
  }

  getUsers() {
    this.utilService.isLoading.next(true);
    this.api.getUsers(localStorage.getItem('token')).then(users => {
      if (users.headerApp.code === 200) {
        let temp: User[] = [];
        users.data.usuarios.forEach(element => {         
          let roles: Roles[] = [];
          element.roles.forEach(rol => {         
            roles.push({
              rolId: rol.id,
              usroId: rol.usroId,
              nombre: rol.rol,
              estado: "A",
              icono: null
            });
          });
          let user: User = {
            nombres: element.usuario.nombres,
            apellidos: element.usuario.apellidos,
            dni: element.usuario.dni,
            email: element.usuario.email,
            nickname: element.usuario.nickname,
            token: element.usuario.token,
            usuaid: element.usuario.usuaid,
            estado: element.usuario.estado === 'A' ? 'Activo' : 'Inactivo',
            empresa: {
              dni: element.usuario.empresa.dni,
              entiid: element.usuario.empresa.entiid,
              nombcome: element.usuario.empresa.nombcome,
              razosoci: element.usuario.empresa.razosoci
            },
            roles: roles
          }
         
          temp.push(user);
        });

        this.users = temp;
        this.utilService.isLoading.next(false);
      }
    }).catch(error => {
      this.utilService.isLoading.next(false);
      if (error.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    })
  }

  addUser() {
    this.router.navigate(['/edituser']);
  }

  desactivate(user: User) {
    this.router.navigate(['/edituser'], { state: { user: JSON.stringify(user) } });
  }

  consultarMobile() {

  }


}
