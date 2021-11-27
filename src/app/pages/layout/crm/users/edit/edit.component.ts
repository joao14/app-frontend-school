import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService, SelectItem } from 'primeng';
import { obra } from 'src/models/obra';
import { obras } from 'src/models/obras';
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

  constructor(private api: ApisService, private router: Router, private utilService: UtilService) {
    if (this.router.getCurrentNavigation().extras.state != null) {
      this.userTemp = JSON.parse(this.router.getCurrentNavigation().extras.state.user);
      this.edit = true;
    } else {
      this.edit = false;
    }
    this.inicializateValores();
  }

  ngOnInit(): void {
    this.getObras()
  }

  inicializateValores() {

    this.user = null;
    this.perfiles = [
      { name: 'Administrador', code: 'Administrador' },
      { name: 'Gestor', code: 'Gestor' }
    ];

    this.user = {
      user: {
        usuaApellidos: this.userTemp != undefined ? this.userTemp['user'].usuaApellidos : null,
        usuaClave: this.userTemp != undefined ? this.userTemp['user'].usuaClave : null,
        usuaEstado: this.userTemp != undefined ? this.userTemp['user'].usuaEstado : null,
        usuaId: this.userTemp != undefined ? this.userTemp['user'].usuaId : null,
        usuaNick: this.userTemp != undefined ? this.userTemp['user'].usuaNick : null,
        usuaNombres: this.userTemp != undefined ? this.userTemp['user'].usuaNombres : null,
        usuaPerfil: this.userTemp != undefined ? this.getSelectPerfiles(this.userTemp['user'].usuaPerfil)[0] : null
      },
      obras: this.userTemp != undefined ? this.getObrasListas(this.userTemp['obras']) : [],
    }

    this.obrasSelect = this.userTemp != undefined ? this.user.obras : [];

    console.log("USER?????..");
    console.log(this.user);
    console.log("OBRAS INICIALLLLLL?????");
    console.log(this.obrasSelect);



  }

  getObrasListas(obras: any[]) {
    let obra_: Array<obra> = [];
    obras.forEach(obra => {
      obra_.push({
        obraDescripcion: obra.obraDescripcion,
        obraDireccion: obra.obraDireccion,
        obraId: obra.obraId,
        obraLogo1: obra.obraLogo1,
        obraLogo2: obra.obraLogo2,
        obraNombre: obra.obraNombre
      })
    })

    return obra_
  }


  getSelectPerfiles(name: string) {
    return this.perfiles.filter(element => element.name == name)
  }

  save() {
    this.api.addunidad(this.user, localStorage.getItem("token")).then(data => {
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

  getObras() {
    console.log("OBRAS CONSULTADAS");
    this.utilService.isLoading.next(true);
    this.api.getobras(localStorage.getItem("token")).then(data => {

      if (data.headerApp.code == 200 || data.headerApp.code == 0) {
        this.obras = data.data.obras
        this.utilService.isLoading.next(false);
      }
      console.log("DTATA");

      console.log(data.data.obras);
    }).catch(err => {
      this.utilService.isLoading.next(false);
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
    this.api.updateunidad(this.user, localStorage.getItem("token")).then(data => {
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
    console.log("Habilitar");

    /*event.items.forEach(async (element) => {
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
         
        if (err.error.code == 401) {
          localStorage.clear();
          this.router.navigate(['/login']);
        }
      })

    });*/
  }

  disabled(event: any) {
    console.log("Desabilitar..");

    /*
        event.items.forEach(async element => {
    
          let rol = {
            usroId: element.usroId,
            usuaId: this.user.usuaid,
            rolId: element.rolId
          }
          this.api.removeRolesByUser(rol, localStorage.getItem("token")).then(data => {
            if (data.headerApp.code === 200) {
              this.messageService.add({ severity: 'info', summary: 'Rosa Mística', detail: 'Se quito un rol al usuario' });
            }
          }).catch(err => {
             
            if (err.error.code == 401) {
              localStorage.clear();
              this.router.navigate(['/login']);
            }
          })
        });*/
  }



}

