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
import { of } from 'rxjs';
import { NgWizardConfig, NgWizardService, StepChangedArgs, StepValidationArgs, STEP_STATE, THEME } from 'ng-wizard';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

export interface detail {
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

  constructor(private api: ApisService, private util: UtilService, private router: Router, private messageService: MessageService, private ngWizardService: NgWizardService,
    private confirmationService: ConfirmationService, private formBuilder: FormBuilder, private spinner: NgxSpinnerService) {
    this.pedidoForm = this.formBuilder.group({
      flor: [null, Validators.required],
      tamanio: [null, Validators.required],
      cantidad: ['', Validators.required],

    });
  }

  async ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.inicializar()
    await this.getServicios()
  }

  inicializar() {
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
      case 'PR': {
        type = 'Pre alerta'
        break;
      }
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
      case 'CA': {
        type = 'Cancelado'
        break;
      }
      default: {
        type = 'Pedido'
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
    await this.api.getflowers(localStorage.getItem("token")).then(flor => {
      console.log('DATA');
      console.log(flor);
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

    await this.api.pedidos(localStorage.getItem('token')).then(async (data) => {
      console.log('data pedidos');
      console.log(data);
      if (data.headerApp.code == 200) {
        this.pedidos = data.data.orders;
        if (this.pedidos.length > 0) {
          this.step = 1
        } else {
          this.step = 2
        }
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
        console.log('ORDER ACCEPTED');

      }
    })
  }

  cancel() {
    console.log('Cancelar');

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
    this.dateEnvio = new Date(pedido.head.fecha)
    this.util.isLoading.next(true)
    await Promise.all(pedido.items.map(async (item) => {
      const flower = await this.getFlowerbyName(item.flower)
      console.log('Return');
      console.log(flower);
      this.items.push(
        {
          variedad: { 'flor': flower, 'recursos': [] },
          stem: { name: item.cm, code: item.cm },
          cantidad: item.totaltallos
        })
    }));
    this.util.isLoading.next(false)
    console.log('ITEMS');
    console.log(this.items);

  }

  deleteItem(pedido: any) {
    console.log(this.items);
    this.items = this.items.filter((item) => item != pedido)
  }

  async back() {
    this.step = 1
    this.selectpedido = null
    await this.getServicios()
  }

  save() {
    console.log('Agregando...');
    this.submitted = true;
    if (this.pedidoForm.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Rosa Mística', detail: 'Los campos son obligatorios para gregar un item al pedido' });
      return;
    }

    console.log('NEXT');
    console.log(this.pedidoForm.get('flor'));


    this.items.push({
      variedad: this.pedidoForm.get('flor').value,
      stem: this.pedidoForm.get('tamanio').value,
      cantidad: this.pedidoForm.get('cantidad').value,
    })
    this.submitted = false
    this.pedidoForm.reset()

    console.log('...ITEMS.....');
    console.log(this.items);


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
          shippingdate: this.selectpedido.head.fecha+ '.000',
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

    console.log('ORDENES DE ITEMS');
    console.log(order);
    this.util.isLoading.next(true)
    await this.api.addpedido(order, localStorage.getItem('token')).then(async (data) => {
      console.log('Se actualizado correctamente');
      console.log(data);
      if (data.headerApp.code == 200) {
        await this.inicializar()
        await this.getServicios()
      }

    }).catch(err => {
      console.log(err);
      if (err.error.code == 401 || err.error.code == 0) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    })
    this.util.isLoading.next(false)
  }

  async finalizar() {
    console.log('Finalizar...');
    console.log('Todo va bien...');
    let head = {
      pediId: 0,
      fecha: this.getFormatDate(new Date(this.dateEnvio + '')),
      usuaId: this.user.usuaid,
      estado: 'A',
      fase: 'PE',
      clieId: this.user.empresa.entiid
    }

    let items = []
    this.items.forEach(async (item, index) => {
      items.push(
        {
          line: index,
          shippingdate: this.getFormatDate(new Date(this.dateEnvio + '')),
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

    console.log('FINISH ORDER TO SEND');
    console.log(order);
    this.util.isLoading.next(true)
    await this.api.addpedido(order, localStorage.getItem('token')).then(async (data) => {
      console.log('Se ha guarado correctamente');
      console.log(data);
      if (data.headerApp.code == 200) {
        await this.inicializar()
        await this.getServicios()
      }

    }).catch(err => {
      console.log(err);
      if (err.error.code == 401 || err.error.code == 0) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    })
    this.util.isLoading.next(false)

  }

  async track(pedido: Pedido) {
    console.log('TRACKEO');
    console.log(pedido);
    this.step = 3
    this.selectpedido = pedido
    this.items = []
    this.util.isLoading.next(true)
    await Promise.all(pedido.items.map(async (item) => {
      const flower = await this.getFlowerbyName(item.flower)
      console.log('Return');

      console.log(flower);

      this.items.push(
        {
          variedad: flower,
          stem: item.cm,
          cantidad: item.totaltallos
        })
    }));
    this.util.isLoading.next(false)
    console.log('----Lista de arrays');
    console.log(this.items);

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





}