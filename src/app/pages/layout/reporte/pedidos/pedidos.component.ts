import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, DialogService, MessageService } from 'primeng';
import { client } from 'src/models/client';
import { user } from 'src/models/user';
import { ApisService } from 'src/services/apis.service';
import { UtilService } from 'src/services/util.service';
import * as moment from 'moment';
import { Pedido } from 'src/models/pedido';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css'],
  providers: [MessageService, ConfirmationService, DialogService, TranslateService],
})
export class PedidosComponent implements OnInit {

  selectClient: client
  clientes: Array<client> = [];
  dialogVisible: boolean;
  dateIni: Date = new Date();
  dateFin: Date = new Date();
  url: string;
  numedocu: string;
  user: user;
  typerol: string;
  pedidos: Array<Pedido> = []
  checked: Boolean = false
  dialogVisibleUrls: Boolean = false
  files: Array<{
    pdf: string,
    fecha: string
  }> = []


  constructor(private api: ApisService, private router: Router, public dialogService: DialogService,
    private messageService: MessageService,
    private utilService: UtilService) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.typerol = localStorage.getItem("rolactive");
    if (this.typerol != 'ADM') {
      this.getClientbyName(JSON.parse(localStorage.getItem('user')).empresa.nombcome);
    } else {
      this.getClient();
    }
    this.dialogVisible = false;
    this.selectClient = null;
  }

  async getClientbyName(name: string): Promise<any> {
    let cliente: client = null;
    await this.api.getObjectbyName('C', name.toUpperCase(), localStorage.getItem("token")).then(data => {
      if (data.headerApp.code == 200) {
        this.selectClient = data.data.cliente;
      }
    }).catch(err => {
      if (err.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    })
    return cliente;
  }

  getState = (state) => {
    let type = "";
    switch (state) {
      case 'PE': {
        type = 'Generado'
        break;
      }
      case 'RE': {
        type = 'Revisión'
        break;
      }
      case 'FA': {
        type = 'Facturado'
        break;
      }
      case 'DE': {
        type = 'Despachado'
        break;
      }
      case 'RX': {
        type = 'Cancelado'
        break;
      }
      case 'IN': {
        type = 'En entrega'
        break;
      }
      default: {
        type = 'Sin Estado'
        break;
      }
    }
    return type

  }

  async getClient() {
    this.utilService.isLoading.next(true);
    this.clientes = [];
    await this.api.getclients(localStorage.getItem("token")).then(cliente => {
      let temp: client[] = [];
      if (cliente.headerApp.code === 200) {
        cliente.data.clientes.forEach(element => {
          if (element.cliente.estado == 'A') {
            temp.push(element.cliente);
          }
        });
      }
      this.clientes = temp;

    }).catch(err => {

      if (err.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    })
    this.utilService.isLoading.next(false);
  }

  async consultar() {

    if (!this.checked) {
      if (!this.selectClient) {
        this.messageService.add({ severity: 'info', summary: 'Rosa Mística', detail: 'Select a client' });
        return true;
      } else {
        this.consultbyClient()
      }
    } else {
      this.selectClient = null
      this.consultAll()
    }
  }

  consultAll = async () => {
    this.pedidos = []
    this.utilService.isLoading.next(true);
    await this.api.getInformationAllOrders(this.getFormatDate(this.dateIni).replace(/-/g, '') + "000000", this.getFormatDate(this.dateFin).replace(/-/g, '') + "235959", localStorage.getItem("token")).then(data => {

      if (data.headerApp.code == 200) {
        this.pedidos = data.data.orders
      }

    }).catch(err => {

      if (err.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }

    })
    this.utilService.isLoading.next(false);

    if (this.pedidos.length <= 0) {
      this.messageService.add({ severity: 'info', summary: 'Rosa Mística', detail: 'There are no orders' });
      return true;
    }
  }

  consultbyClient = async () => {
    this.pedidos = []
    this.utilService.isLoading.next(true);
    await this.api.getInformationAllOrdersbyClient(this.selectClient.entiId, 'F', this.getFormatDate(this.dateIni).replace(/-/g, '') + "000000", this.getFormatDate(this.dateFin).replace(/-/g, '') + "235959", localStorage.getItem("token")).then(data => {
      
      if (data.headerApp.code == 200) {
        this.pedidos = data.data.orders
      }     

    }).catch(err => {

      if (err.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }

    })
    this.utilService.isLoading.next(false);

    if (this.pedidos.length <= 0) {
      this.messageService.add({ severity: 'info', summary: 'Rosa Mística', detail: 'There are no orders' });
      return true;
    }
  }


  viewprealerts = async (pedido: Pedido) => {
    this.dialogVisibleUrls = true
    this.files = []
    await pedido.prealerts.forEach(prealert => {
      this.files.push({
        pdf: environment.url + prealert.pdf,
        fecha: prealert.fechcrea
      })
    })

  }


  getFormatDate(date: Date) {
    return (moment(date)).format('YYYY-MM-DD');
  }

}
