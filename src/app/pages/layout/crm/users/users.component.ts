import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng';
import { ApisService } from 'src/services/apis.service';
import { UtilService } from 'src/services/util.service';

export interface users {
  usuaApellidos: string;
  usuaClave: string;
  usuaEstado: boolean;
  usuaId: number;
  usuaNick: string;
  usuaNombres: string;
  usuaPerfil: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [TranslateService, MessageService],
})
export class UsersComponent implements OnInit {

  usuarios: Array<users> = []

  constructor(private apis: ApisService, private router: Router, private utilservice: UtilService) {
  }

  ngOnInit(): void {
    this.getUsuarios()
  }

  async getUsuarios() {
    this.utilservice.isLoading.next(true);
    await this.apis.getusuarios(localStorage.getItem("token")).then(async data => {
      console.log("Usuarios");
      console.log(data);
      if (data.headerApp.code == 200) {
        data.data.forEach(element => {
          this.usuarios.push({
            usuaApellidos: element["usuaApellidos"],
            usuaClave: element["usuaClave"],
            usuaEstado: element["usuaEstado"],
            usuaId: element["usuaId"],
            usuaNick: element["usuaNick"],
            usuaNombres: element["usuaNombres"],
            usuaPerfil: element["usuaPerfil"]
          })
        });
        this.utilservice.isLoading.next(false);
      }

    }).catch(err => {
      this.utilservice.isLoading.next(false);
      if (err.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }

    })
  }

  addUsuario() {
    this.router.navigate(['/editusers']);
  }

  edit(user: users) {
    this.router.navigate(['/editusers'], { state: { user: JSON.stringify(user) } });
  }

}
