import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MenuItem, MessageService } from 'primeng';
import { flower } from 'src/models/flower';
import { Item } from 'src/models/item';
import { Pedido } from 'src/models/pedido';
import { user } from 'src/models/user';
import { ApisService } from 'src/services/apis.service';
import { UtilService } from 'src/services/util.service';
import * as moment from 'moment';
import { LayoutComponent } from '../layout.component';
import { client } from 'src/models/client';

export interface detail {
  fecha: Date,
  variedad: any,
  stem: any,
  cantidad: number
}

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class PedidoComponent implements OnInit {


  pedidoForm: FormGroup
  pedidos: Array<Pedido> = []
  step: number
  submitted = false;
  flores: Array<flower> = []
  editPedido: boolean
  user: user
  tamanios: any[]
  items: Array<detail> = []
  dateEnvio: Date = new Date()
  selectpedido: Pedido
  etapa: number
  minDate: Date = new Date()
  profile: string;
  clientes: Array<client> = []
  clientselect: client


  constructor(private api: ApisService, private util: UtilService, private router: Router, private messageService: MessageService,
    private confirmationService: ConfirmationService, private formBuilder: FormBuilder, private spinner: NgxSpinnerService,
    public app: LayoutComponent) {
    this.pedidoForm = this.formBuilder.group({
      fecha: [{ value: this.dateEnvio, disabled: true }, Validators.required],
      flor: [null, Validators.required],
      tamanio: [null, Validators.required],
      cantidad: ['', Validators.required],

    });
    this.profile = localStorage.getItem("rolactive");

  }

  async ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.inicializar()
    await this.getServicios()
  }

  inicializar() {
    this.etapa = 0
    this.step = 1;
    this.editPedido = false
    this.submitted = false
    this.dateEnvio = new Date()
    this.tamanios = [
      { name: "CL", code: "CL" },
      { name: "40", code: "40" },
      { name: "50", code: "50" },
      { name: "60", code: "60" },
      { name: "70", code: "70" },
      { name: "80", code: "80" },
      { name: "90", code: "90" },
      { name: "100", code: "100" },
      { name: "110", code: "110" },
      { name: "150", code: "150" }
    ];

  }

  getState(state: string) {
    let type = null;
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
      default: {
        type = ''
        break;
      }
    }

    return type
  }

  /**
     * Function the search services client, flowers, deliveries, fincas
     */
  async getServicios() {
    this.util.isLoading.next(true);
    this.clientes = [];
    await this.api.getclients(localStorage.getItem("token")).then(cliente => {
      if (cliente.headerApp.code === 200) {
        let clientTemp: client[] = [];
        cliente.data.clientes.forEach(data => {
          if (data.cliente.estado == 'A') {
            clientTemp.push(data.cliente);
          }
        });
        this.clientes = clientTemp;
      }
    }).catch(err => {

      if (err.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    })
    await this.api.getflowers(localStorage.getItem("token")).then(flor => {
      this.flores = [];
      if (flor.headerApp.code === 200) {
        flor.data.flowers.forEach(flor => {
          if (flor.flor.estado == 'A') {
            this.flores.push(flor);
          }
        });
      }
    }).catch(err => {

      if (err.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    })

    await this.api.pedidosbyclient(this.user.empresa.entiid, 'A', localStorage.getItem('token')).then(async (data) => {      
      if (data.headerApp.code == 200) {
        this.pedidos = data.data.orders
      } else
        if (data.headerApp.code == 204) {
          this.step = 2
        }
    }).catch(err => {
      if (err.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    })


    this.util.isLoading.next(false);
  }

  confirmar() {
    this.confirmationService.confirm({
      message: "Are you sure to confirm order?",
      accept: async () => {

      }
    })
  }

  cancel() {   

  }

  addpedido() {
    this.editPedido = false
    this.dateEnvio = new Date()
    this.step = 2
    this.items = []
  }

  async edit(pedido: Pedido) { 
    this.editPedido = true
    this.step = 2
    this.selectpedido = pedido
    this.items = []
    this.dateEnvio = new Date(pedido.head.fechrequ)
    this.pedidoForm.get('fecha').setValue(this.dateEnvio)
    this.util.isLoading.next(true)
    await Promise.all(pedido.items.map(async (item) => {
      const flower = await this.getFlowerbyName(item.flower)
      this.items.push(
        {
          fecha: new Date(item.shippingdate),
          variedad: { 'flor': flower, 'recursos': [] },
          stem: { name: item.cm, code: item.cm },
          cantidad: item.totaltallos
        })
    }))
    this.util.isLoading.next(false)

  }

  deleteItem(pedido: any) {
    this.items = this.items.filter((item) => item != pedido)
  }

  async back() {
    this.step = 1
    this.selectpedido = null
    this.items = []
    this.pedidos = []
    await this.getServicios()
  }

  save() {

    this.submitted = true;
    if (this.pedidoForm.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Rosa Mística', detail: 'Los campos son obligatorios para gregar un item al pedido' });
      return;
    }

    this.items.push({
      fecha: this.pedidoForm.get('fecha').value,
      variedad: this.pedidoForm.get('flor').value,
      stem: this.pedidoForm.get('tamanio').value,
      cantidad: this.pedidoForm.get('cantidad').value,
    })
    this.submitted = false
    this.pedidoForm.reset()
    this.pedidoForm.get('fecha').setValue(this.dateEnvio)
  }

  async modificar() {
    let head = {
      pediId: this.selectpedido.head.pediId,
      fecha: this.selectpedido.head.fecha + '.000',
      usuaId: this.selectpedido.head.usuaId,
      estado: this.selectpedido.head.estado,
      fase: this.selectpedido.head.fase,
      clieId: this.selectpedido.head.client.clieId
    }

    let items = []
    this.items.forEach(async (item, index) => {
      items.push(
        {
          line: index,
          shippingdate: this.getFormatDate(item.fecha),
          fincapropia: null,
          farmId: null,
          marcId: null,
          hbqb: 0,
          florId: item.variedad['flor'].florId,
          cm: item.stem['code'],
          tallos: 0,
          totaltallos: item.cantidad,
          pcomp: "0.00",
          cargcompId: null,
          pvp: "0.00",
          status: 'LOOKING'
        }
      )

    });

    let order = {
      pedido: head,
      detalle: items
    }

    this.confirmationService.confirm({
      message: "Are you sure to update this order?",
      accept: async () => {
        this.util.isLoading.next(true)
        await this.api.addpedido(order, localStorage.getItem('token')).then(async (data) => {          
          if (data.headerApp.code == 200) {
            await this.inicializar()
            await this.getServicios()
          }

        }).catch(err => {
          if (err.error.code == 401 || err.error.code == 0) {
            localStorage.clear();
            this.router.navigate(['/login']);
          }
        })
        this.util.isLoading.next(false)

      }
    })

  }

  async cancelar() {
    let head = {
      pediId: this.selectpedido.head.pediId,
      fecha: this.selectpedido.head.fecha + '.000',
      usuaId: this.selectpedido.head.usuaId,
      estado: "F",
      fase: 'RX',
      clieId: this.selectpedido.head.client.clieId
    }

    let items = []
    this.items.forEach(async (item, index) => {
      items.push(
        {
          line: index,
          shippingdate: this.getFormatDate(new Date(item.fecha)),
          fincapropia: null,
          farmId: null,
          marcId: null,
          hbqb: 0,
          florId: item.variedad['flor'].florId,
          cm: item.stem['code'],
          tallos: 0,
          totaltallos: item.cantidad,
          pcomp: "0.00",
          cargcompId: null,
          pvp: "0.00",
          status: 'LOOKING'
        }
      )

    });

    let order = {
      pedido: head,
      detalle: items
    }

    this.confirmationService.confirm({
      message: "Are you sure to cancel this order?",
      accept: async () => {
        this.util.isLoading.next(true)
        await this.api.addpedido(order, localStorage.getItem('token')).then(async (data) => {         
          if (data.headerApp.code == 200) {
            await this.inicializar()
            await this.getServicios()
          }

        }).catch(err => {
          if (err.error.code == 401 || err.error.code == 0) {
            localStorage.clear();
            this.router.navigate(['/login']);
          }
        })
        this.util.isLoading.next(false)
      }
    })


  }

  async finalizar() {
    if (this.clientselect == null && this.profile == 'ADM') {
      this.messageService.add({ severity: 'info', summary: 'Rosa Mística', detail: 'El cliente es requerido para generar el pedido' });
      return;
    }
    let head = {
      pediId: 0,
      fecha: this.getFormatDate(new Date()),
      fechrequ: this.getFormatDate(new Date(this.dateEnvio + '')),
      usuaId: this.user.usuaid,
      estado: 'A',
      fase: 'PE',
      clieId: this.profile == 'ADM' ? this.clientselect.entiId : this.user.empresa.entiid
    }

    let items = []
    this.items.forEach(async (item, index) => {
      items.push(
        {
          line: index,
          shippingdate: this.getFormatDate(new Date(item.fecha)),
          fincapropia: null,
          farmId: null,
          marcId: null,
          hbqb: 0,
          florId: item.variedad['flor'].florId,
          cm: item.stem['code'],
          tallos: 0,
          totaltallos: item.cantidad,
          pcomp: "0.00",
          cargcompId: null,
          pvp: "0.00",
          status: 'LOOKING'
        }
      )

    });

    let order = {
      pedido: head,
      detalle: items
    }

    this.confirmationService.confirm({
      message: "Are you sure to create a new order?",
      accept: async () => {
        this.util.isLoading.next(true)
        await this.api.addpedido(order, localStorage.getItem('token')).then(async (data) => {        
          if (data.headerApp.code == 200) {
            await this.inicializar()
            await this.getServicios()
          }

        }).catch(err => {
          if (err.error.code == 401 || err.error.code == 0) {
            localStorage.clear();
            this.router.navigate(['/login']);
          }
        })
        this.util.isLoading.next(false)
      }
    })


  }

  async track(pedido: Pedido) {
    this.step = 3
    this.selectpedido = pedido
    this.items = []
    this.util.isLoading.next(true)
    await Promise.all(pedido.items.map(async (item) => {
      const flower = await this.getFlowerbyName(item.flower)     
      this.items.push(
        {
          fecha: new Date(item.shippingdate),
          variedad: flower,
          stem: item.cm,
          cantidad: item.totaltallos
        })
    }));
    this.util.isLoading.next(false)
  }
  
  async getFlowerbyName(name: string): Promise<flower> {
    let flower: flower = null;
    await this.api.getflowerbyname(name, localStorage.getItem("token")).then(data => {
      if (data.headerApp.code == 200) {
        flower = data.data.flower;
      }
    }).catch(err => {

      if (err.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    })
    return flower;
  }



  get f() {
    return this.pedidoForm.controls;
  }

  getFormatDate(date: Date): string {
    return (moment(date)).format('yyyy-MM-DD HH:mm:ss.SSS');
  }

  choose($event) {
    this.pedidoForm.get('fecha').setValue($event)
  }





}
