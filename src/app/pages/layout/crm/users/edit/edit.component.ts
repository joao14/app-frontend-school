import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService, SelectItem } from 'primeng';
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
  usuaPerfil: any;
}


export interface users {
  user: user;
  obras: Array<obra>;
}


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [TranslateService, MessageService],
})
export class EditComponent implements OnInit {

  edit: boolean;
  user: users;
  userTemp: users;
  options: SelectItem[];
  looking: boolean = false;
  icon: string = "pi pi-eye";
  perfiles: Array<{
    name: string,
    code: string
  }> = []
  obras: Array<obra> = []
  obrasSelect: Array<obra> = []

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
      { name: 'Administrador', code: 'Administrador' },
      { name: 'Gestor', code: 'Gestor' }
    ];

    this.user = {
      user: {
        usuaApellidos: this.userTemp != undefined ? this.userTemp['user'].usuaApellidos : null,
        usuaClave: this.userTemp != undefined ? this.userTemp['user'].usuaClave : null,
        usuaEstado: this.userTemp != undefined ? this.userTemp['user'].usuaEstado : true,
        usuaId: this.userTemp != undefined ? this.userTemp['user'].usuaId : null,
        usuaNick: this.userTemp != undefined ? this.userTemp['user'].usuaNick : null,
        usuaNombres: this.userTemp != undefined ? this.userTemp['user'].usuaNombres : null,
        usuaPerfil: this.userTemp != undefined ? this.getSelectPerfiles(this.userTemp['user'].usuaPerfil)[0] : null
      },
      obras: this.userTemp != undefined ? this.userTemp['obras'] : [],
    }

    this.obrasSelect = this.userTemp != undefined ? this.user.obras : [];

    this.options = [{ label: 'Activo', value: true }, { label: 'Inactivo', value: false }];

    await this.getObras();

  }

  getSelectPerfiles(name: string) {
    return this.perfiles.filter(element => element.name == name)
  }

  save() {
    this.user.user.usuaPerfil = this.user.user.usuaPerfil["code"]
    this.api.adduser(this.user.user, localStorage.getItem("token")).then(data => {
      if (data.headerApp.code === 200) {
        this.router.navigate(['users']);
        this.inicializateValores();
      }
    }).catch(err => {
      if (err.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    })

  }

  async getObras() {
    this.utilService.isLoading.next(true);
    await this.api.getobras(localStorage.getItem("token")).then(async (data) => {

      if (data.headerApp.code == 200 || data.headerApp.code == 0) {

        await data.data.obras.forEach(async (obra) => {
          let estado_ = await this.getObjectArray(obra)
          if (!estado_) {
            this.obras.push(obra)
          }
        });
        this.utilService.isLoading.next(false);
      }

    }).catch(err => {
      this.utilService.isLoading.next(false);
      if (err.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }

    })
  }

  async getObjectArray(obra: any) {
    let estado = false
    await this.obrasSelect.filter(async (obra_) => {
      if (JSON.stringify(obra_) == JSON.stringify(obra)) {
        estado = true
      }
    })
    return estado
  }

  cancelar() {
    this.router.navigate(['users']);
  }

  modificar() {
    this.user.user.usuaPerfil = this.user.user.usuaPerfil["code"]
    this.api.updateusuario(this.user.user, localStorage.getItem("token")).then(data => {
      if (data.headerApp.code === 200) {
        this.router.navigate(['users']);
        this.inicializateValores();
      }
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

  enabled(event: any) {
    event.items.forEach(async (element) => {
      let relation = {
        obraId: element.obraId,
        usuaId: this.user.user.usuaId
      }
      await this.api.addobrabyuser(relation, localStorage.getItem("token")).then(data => {

        if (data.headerApp.code === 200) {
          //this.user.roles = data.data.roles;
          this.messageService.add({ severity: 'info', summary: 'Informativo', detail: 'Se agrego una obra al usuario' });
        }
      }).catch(err => {
        console.log("ERROR");
        console.log(err);
        if (err.error.code == 401) {
          localStorage.clear();
          this.router.navigate(['/login']);
        }
      })
    });
  }  
 
  disabled(event: any) { 
    console.log("Desabilitar..");  
    event.items.forEach(async element => {  
      console.log(element.obraId); 
      console.log("ELEMENTOSSS");      
      console.log(localStorage.getItem("token"));
      this.api.removeobrabyuser(element.obraId, localStorage.getItem("token")).then(data => {
        if (data.headerApp.code === 200) {    
          this.messageService.add({ severity: 'info', summary: 'Informativo', detail: 'Se quito un rol al usuario' });
        }  
      }).catch(err => {

        if (err.error.code == 401) {
          localStorage.clear();
          this.router.navigate(['/login']);
        }
      })
    });
  }



}

