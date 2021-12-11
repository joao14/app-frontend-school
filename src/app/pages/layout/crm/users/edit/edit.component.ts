import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService, SelectItem } from 'primeng';
import { obra } from 'src/models/obra';
import { ApisService } from 'src/services/apis.service';
import { UtilService } from 'src/services/util.service';

export interface UserTemp {
  user_id: string;
  user_identification: string;
  user_name: string;
  user_lastname: string;
  user_email: string;
  user_age: number;
  user_gender: any;
  user_password: string;
  user_username: string;
  user_phone: string;
  prof_id: any;
}


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [TranslateService, MessageService],
})
export class EditComponent implements OnInit {

  edit: boolean;
  user: UserTemp;
  userTemp: UserTemp;
  options: SelectItem[];
  looking: boolean = false;
  icon: string = "pi pi-eye";
  perfiles: Array<{
    name: string,
    code: string
  }> = []
  gender: Array<{
    name: string,
    code: string
  }> = []

  constructor(private api: ApisService, private router: Router, private utilService: UtilService, private messageService: MessageService,) {
    if (this.router.getCurrentNavigation().extras.state != null) {
      this.userTemp = JSON.parse(this.router.getCurrentNavigation().extras.state.user);
      this.edit = true;
    } else {
      this.edit = false;
    }
    this.inicializateValores();
  }

  ngOnInit() {
  }

  async inicializateValores() {

    this.user = null;
    this.perfiles = [
      { name: 'Administrator', code: '1' },
      { name: 'Students', code: '2' },
      { name: 'Teacher', code: '3' }
    ];

    this.gender = [
      { name: 'Male', code: 'Male' },
      { name: 'Female', code: 'Female' }
    ];


    this.user = {
      user_id: this.userTemp != undefined ? this.userTemp.user_id : null,
      user_identification: this.userTemp != undefined ? this.userTemp.user_identification : null,
      user_name: this.userTemp != undefined ? this.userTemp.user_name : null,
      user_lastname: this.userTemp != undefined ? this.userTemp.user_lastname : null,
      user_email: this.userTemp != undefined ? this.userTemp.user_email : null,
      user_age: this.userTemp != undefined ? this.userTemp.user_age : null,
      user_gender: this.userTemp != undefined ? this.getSelectGender(this.userTemp.user_gender)[0] : null,
      user_password: this.userTemp != undefined ? this.userTemp.user_password : null,
      user_username: this.userTemp != undefined ? this.userTemp.user_username : null,
      user_phone: this.userTemp != undefined ? this.userTemp.user_phone : null,
      prof_id: this.userTemp != undefined ? this.getSelectPerfiles(this.userTemp.prof_id)[0] : null,
    }

    this.options = [{ label: 'Activo', value: true }, { label: 'Inactivo', value: false }];


  }

  getSelectGender(code: string) {
    return this.gender.filter(element => element.code == code)
  }
  getSelectPerfiles(code: string) {
    return this.perfiles.filter(element => element.code == code)
  }

  save() {
    let user = {
      user_identification: this.user.user_identification,
      user_name: this.user.user_name,
      user_lastname: this.user.user_lastname,
      user_email: this.user.user_email,
      user_age: this.user.user_age,
      user_gender: this.user.user_gender.code,
      user_password: this.user.user_password,
      user_username: this.user.user_username,
      user_phone: this.user.user_phone,
      prof_id: this.user.prof_id.code,
    }
    this.api.adduser(user, localStorage.getItem("token")).then(data => {
      this.router.navigate(['users']);
      this.inicializateValores();
    }).catch(err => {
      if (err.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    })

  }


  cancelar() {
    this.router.navigate(['users']);
  }

  modificar() {
    this.user.prof_id = this.user.prof_id.code
    this.user.user_gender = this.user.user_gender.code
    this.api.updateusuario(this.user, localStorage.getItem("token")).then(data => {
      this.router.navigate(['users']);
      this.inicializateValores();
    }).catch(err => {
      if (err.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    })
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

