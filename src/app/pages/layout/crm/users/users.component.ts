import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng';
import { user } from 'src/models/user';
import { ApisService } from 'src/services/apis.service';
import { UtilService } from 'src/services/util.service';




@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [TranslateService, MessageService],
})
export class UsersComponent implements OnInit {

  user: user
  users: Array<user> = []

  constructor(private apis: ApisService, private router: Router, private utilservice: UtilService) {
  }

  ngOnInit(): void {
    this.getUsuarios()
  }

  async getUsuarios() {
    this.utilservice.isLoading.next(true);
    await this.apis.getusuarios(localStorage.getItem("token")).then(async data => {
      data.forEach(element => {
        this.users.push(element);
      });
      this.utilservice.isLoading.next(false);
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

  edit(user: user) {
    this.router.navigate(['/editusers'], { state: { user: JSON.stringify(user) } });
  }

}
