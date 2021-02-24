import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng';
import { ApisService } from 'src/services/apis.service';
import { UtilService } from 'src/services/util.service';

export interface Status{
  titrId:number,
  nombre: string,
  estado: string,
  tipo: string,
  docuprin: string,
  categoria: string
}

@Component({
  selector: 'app-estados',
  templateUrl: './estados.component.html',
  styleUrls: ['./estados.component.css'],
  providers: [TranslateService, MessageService],
})
export class EstadosComponent implements OnInit {

  estados: Array<Status> = [];
  name: string;

  constructor(private api: ApisService, private router: Router, private utilservice: UtilService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.name = "";
    this.inicializate();
  }

  async inicializate() {
    await this.getEstados();
  }

  async getEstados() {
    this.utilservice.isLoading.next(true);
    await this.api.getstatusprealert(localStorage.getItem("token")).then(data => {
      this.estados=[];
      if (data.headerApp.code == 200) {       
        this.estados = data.data.estados;        
      }
      this.utilservice.isLoading.next(false);
    }).catch(err => {
      this.utilservice.isLoading.next(false);
      if (err.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }

    })
  }

  addEstado() {
    this.router.navigate(['/editarestados']);
  }

  edit(status: Status) {
    this.router.navigate(['/editarestados'], { state: { estado: JSON.stringify(status) } });
  }

  async remove(status: Status){
    console.log('Eliminando el estado');
    console.log(status);    
    let state={
      titrId: status.titrId,
      nombre: status.nombre,
      estado: status.estado,
      categoria: "PRE"
    } 
    await this.api.deletestatusprealert(state, localStorage.getItem("token")).then(async (data) => {
      console.log('EStado');
      console.log(data);      
      if (data.headerApp.code === 200) {
        await this.getEstados();
        this.messageService.add({ severity: 'success', summary: 'Rosa Mística', detail: 'Se ha eliminado el estado seleccionado' });        
      }
    }).catch(err => {
      if (err.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    })

  }
}

