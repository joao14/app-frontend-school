import { Component, OnInit } from '@angular/core';
import { ApisService } from 'src/services/apis.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng';
import { TranslateService } from '@ngx-translate/core';
import { UtilService } from 'src/services/util.service';

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
  constructor(private api: ApisService, private router: Router, private messageService: MessageService, private utilService: UtilService) { 
   
  }

  ngOnInit(): void {
    this.identificacion = "";
    this.getUsers();
  }

  getUsers() {
    this.utilService.isLoading.next(true);
    this.api.getUsers(localStorage.getItem('token')).then(users => {
      console.log(users);
      if (users.headerApp.code === 200) {
        let temp: User[] = [];
        users.data.usuarios.forEach(element => {         
          let roles: Roles[] = [];
          element.roles.forEach(rol => {
            //console.log(rol);            
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
      console.log(error);
      if (error.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    })
  }

  addUser() {
    console.log('Editando el cliente');
    this.router.navigate(['/edituser']);
  }

  desactivate(user: User) {
    console.log('Se esta desactivando el usuario');
    console.log(user);
    this.router.navigate(['/edituser'], { state: { user: JSON.stringify(user) } });
  }

  consultarMobile() {

  }


}
