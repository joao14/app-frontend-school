import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng';
import { obra } from 'src/models/obra';
import { ApisService } from 'src/services/apis.service';
import { UtilService } from 'src/services/util.service';

export interface user {
  usuaApellidos: string;
  usuaClave: string;
  usuaEstado: boolean;
  usuaId: number;
  usuaNick: string;
  usuaNombres: string;
  usuaPerfil: string;
}


export interface users {
  user: user;
  obras: Array<obra>;
}


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [TranslateService, MessageService],
})
export class UsersComponent implements OnInit {

  user: user
  obras: Array<obra> = []
  users: Array<users> = []

  constructor(private apis: ApisService, private router: Router, private utilservice: UtilService) {
  }

  ngOnInit(): void {
    this.getUsuarios()
  }

  async getUsuarios() {
    this.utilservice.isLoading.next(true);
    await this.apis.getusuarios(localStorage.getItem("token")).then(async data => {
      if (data.headerApp.code == 200) {
        data.data.forEach(element => {
          this.user = {
            usuaApellidos: element.user["usuaApellidos"],
            usuaClave: element.user["usuaClave"],
            usuaEstado: element.user["usuaEstado"],
            usuaId: element.user["usuaId"],
            usuaNick: element.user["usuaNick"],
            usuaNombres: element.user["usuaNombres"],
            usuaPerfil: element.user["usuaPerfil"]
          }
          this.obras = element.obras

          this.users.push({
            user: this.user,
            obras: this.obras
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
