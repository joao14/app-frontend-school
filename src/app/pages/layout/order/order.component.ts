import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng';
import { client } from 'src/models/client';
import { delivery } from 'src/models/delivery';
import { finca } from 'src/models/finca';
import { flower } from 'src/models/flower';
import { mark } from 'src/models/mark';
import { Pedido } from 'src/models/pedido';
import { ApisService } from 'src/services/apis.service';
import { UtilService } from 'src/services/util.service';

export interface Status {
  titrId: number,
  nombre: string,
  estado: string,
  tipo: string,
  docuprin: string,
  categoria: string
}

export interface Numeros {
  tamanio: string;
  preccomp: number;
  precvent: number;
}


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class OrderComponent implements OnInit {

  pedidos: Array<Pedido> = []
  select: Pedido
  indice: number
  step: string
  prealertForm: FormGroup
  submitted = false
  flores: Array<flower> = []
  fincas: Array<finca> = []
  clientes: Array<client> = []
  deliveries: Array<delivery> = []
  marks: Array<mark> = []
  status: Status[] = []
  estado: boolean = false
  minDateValue: Date = new Date()
  tamanios: any[] = []
  cantidadPrice: Numeros[] = [];
  hbqb: number;

  constructor(private api: ApisService, private util: UtilService, private router: Router, private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService, private messageService: MessageService) {
    this.prealertForm = this.formBuilder.group({
      fecha: [new Date(), Validators.required],
      cliente: ['', Validators.required],
      finca: ['', Validators.required],
      marca: ['', Validators.required],
      HBBQ: [''],
      rosamistica: ['', [Validators.required]],
      fincapropia: [false],
      tamanio: [''],
      tallos: ['', Validators.required],
      totaltallos: ['', Validators.required],
      preciovent: [''],
      preciocomp: [''],
      carga: ['', Validators.required],
      estado: ['', Validators.required],
      repeat: ['']
    });
  }

  ngOnInit(): void {
    this.step = "PE"
    this.getPedidos()

  }

  inicializar() {

    /*this.item = {
      fecha: '',
      cliente: null,
      fincapropia: "",
      finca: null,
      marca: null,
      HBBQ: "",
      rosamistica: null,
      tamanio: "",
      tallos: 0,
      totaltallos: 0,
      preciovent: "",
      preciocomp: "",
      carga: "",
      status: null
    }*/

    this.tamanios = [
      { name: 'CL', code: 'CL' },
      { name: '40', code: '40' },
      { name: '50', code: '50' },
      { name: '60', code: '60' },
      { name: '70', code: '70' },
      { name: '80', code: '80' },
      { name: '90', code: '90' },
      { name: '100', code: '100' },
      { name: '110', code: '110' },
      { name: '150', code: '150' }
    ]
  }

  async getPedidos() {
    this.util.isLoading.next(true);
    await this.api.pedidos(localStorage.getItem('token')).then(async (data) => {
      console.log('data');
      console.log(data);
      if (data.headerApp.code == 200) {
        this.pedidos = data.data.orders;
      }
    }).catch(err => {
      if (err.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    })
    this.util.isLoading.next(false);
  }

  editPedido(pedido: Pedido, indice: number) {
    console.log('Pedido');
    console.log(pedido);
    this.select = pedido
    this.indice = indice


  }

  async onOptionsSelected() {
    this.marks = [];
    await this.api.getmarks(this.prealertForm.get('cliente').value.entiId, localStorage.getItem("token")).then(mark => {
      if (mark.headerApp.code == 200) {
        let temp: mark[] = [];
        mark.data.marks.forEach(element => {
          if (element.estado == 'A')
            temp.push(element);
        });
        this.marks = temp;
      }
    }).catch(err => {

      if (err.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    })
  }


  getState(state: string) {
    let type = null;
    switch (state) {
      case 'PR': {
        type = 'Pre alerta'
        break;
      }
      case 'PE': {
        type = 'Pendiente'
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
      case 'PRE': {

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

  confirmar() {
    this.confirmationService.confirm({
      message: "Are you sure to continue for revision this order?",
      accept: async () => {
        console.log('ORDER ACCEPTED');
        this.step = "RE"
      }
    })
  }

  prealerta() {
    this.confirmationService.confirm({
      message: "Are you sure to continue for prealert?",
      accept: async () => {
        console.log('ORDER ACCEPTED');
        this.step = "RE"
      }
    })
  }

  cancel() {
    console.log('Cancelar');

  }

  save() {

  }

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
    this.fincas = [];
    await this.api.getfinca(localStorage.getItem("token")).then(finca => {
      if (finca.headerApp.code === 200) {
        let temp: finca[] = [];
        finca.data.farms.forEach(element => {
          if (element.estado == 'A') {
            temp.push(element);
          }
        });
        this.fincas = temp;
      }
    }).catch(err => {

      if (err.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    })

    this.flores = [];
    await this.api.getflowers(localStorage.getItem("token")).then(flor => {
      if (flor.headerApp.code === 200) {
        let temp: flower[] = [];
        flor.data.flowers.forEach(element => {
          if (element.flor.estado == 'A') {
            temp.push(element.flor);
          }
        });
        this.flores = temp;
      }
    }).catch(err => {

      if (err.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    })
    this.deliveries = [];
    await this.api.getdeliveries(localStorage.getItem("token")).then(delivery => {
      if (delivery.headerApp.code === 200) {
        let temp: delivery[] = [];
        delivery.data.cargocompanies.forEach(element => {
          if (element.estado == 'A') {
            temp.push(element);
          }
        });
        this.deliveries = temp;
      }
    }).catch(err => {

      if (err.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    })

    this.status = [];
    await this.api.getstatusprealert(localStorage.getItem("token")).then(status => {
      if (status.headerApp.code === 200) {
        let temp: Status[] = [];
        status.data.estados.forEach(element => {
          if (element.estado == 'A') {
            temp.push(element);
          }
        });
        this.status = temp;
      }
    }).catch(err => {

      if (err.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    })

    this.util.isLoading.next(false);
  }

  add() {

    if ((this.prealertForm.get('tamanio').value == '' || this.prealertForm.get('tamanio').value == null) || this.prealertForm.get('preciocomp').value == '' || this.prealertForm.get('preciovent').value == '') {
      this.messageService.add({ severity: 'error', summary: 'Rosa Mística', detail: 'Falta agregar campos para añadir el valor' });
      this.estado = true;
      return;
    }
    this.cantidadPrice.push({
      tamanio: this.prealertForm.get('tamanio').value.code,
      preccomp: this.prealertForm.get('preciocomp').value,
      precvent: this.prealertForm.get('preciovent').value
    })
    this.estado = false;
    this.prealertForm.get('tamanio').setValue(null);
    this.prealertForm.get('preciocomp').setValue(null);
    this.prealertForm.get('preciovent').setValue(null)

  }

  calculate() {
    this.prealertForm.get('totaltallos').setValue((this.prealertForm.get('HBBQ').value == null || this.prealertForm.get('HBBQ').value == 0 ? this.hbqb : this.prealertForm.get('HBBQ').value) * this.prealertForm.get('tallos').value)
  }

  remove(cantidad: Numeros) {
    this.cantidadPrice = this.cantidadPrice.filter(numero => numero != cantidad);
  }

  get f() {
    return this.prealertForm.controls;
  }



}
