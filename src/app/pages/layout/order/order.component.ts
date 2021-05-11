import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
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
import * as moment from 'moment';
import { user } from 'src/models/user';
import { environment } from 'src/environments/environment';

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

export interface Item {
  fecha: string,
  cliente: client;
  fincapropia: string;
  finca: finca;
  marca: mark;
  HBBQ: string;
  rosamistica: flower;
  tamanio: string;
  tallos: number;
  totaltallos: number;
  preciovent: string;
  preciocomp: string;
  carga: string;
  status: Status;
}

export interface stepPrealert {
  pedido: any,
  estado: boolean
}

export interface Cabecera {
  fecha: string;
  usuaId: number;
  pralCerrado: string;
  estado: string;
  pralId: number;
}

export interface Detail {
  line: number;
  shippingdate: string;
  clieId: number;
  fincapropia: string;
  farmId: number;
  marcId: number;
  hbqb: string;
  florId: number;
  cm: string;
  tallos: number;
  totaltallos: number;
  pcomp: string;
  cargcompId: number;
  pvp: string;
  status: string;
}

export interface PedidoTemporal {
  flower: string;
  cm: string;
  totaltallos: string;
  detalle: string;
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
  prealertStep: Array<stepPrealert> = []
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
  items: Item[] = []
  item: Item
  total: number
  selectitem: number
  user: user
  pedidotemporal: Array<PedidoTemporal> = []
  temporal: any

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

  async ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.step = "PE"
    this.inicializar()
    await this.getPedidos()
    await this.getServicios()
  }

  inicializar() {

    this.selectitem = -1

    this.item = {
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
    }

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
    this.pedidos = []
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
    this.pedidotemporal = []
    this.select.items.forEach(element => {
      this.pedidotemporal.push({
        flower: element.flower,
        cm: element.cm,
        totaltallos: String(element.totaltallos),
        detalle: 'Sin completar'
      })
    });
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

  continuarrevision() {
    this.step = "RE"
  }

  confirmar() {
    this.confirmationService.confirm({
      message: "Are you sure to continue for revision this order?",
      accept: async () => {
        let head = {
          clieId: this.select.head.client.clieId,
          estado: this.select.head.estado,
          fase: "RE",
          fecha: this.select.head.fecha + ".000",
          pediId: this.select.head.pediId,
          usuaId: this.select.head.usuaId
        }
        let items: Array<any> = []

        this.select.items.forEach(element => {
          items.push({
            cargcompId: element.cargcompId,
            cm: element.cm,
            farmId: element.farmId,
            fincapropia: element.fincapropia,
            florId: element.florId,
            hbqb: element.hbqb,
            line: element.line,
            marcId: element.marcId,
            pcomp: element.pcomp,
            pvp: element.pvp,
            shippingdate: element.shippingdate + '.000',
            status: element.status,
            tallos: element.tallos,
            totaltallos: element.totaltallos
          })
        });
        let pedido = {
          pedido: head,
          detalle: items
        }
        console.log(pedido);
        this.util.isLoading.next(true)
        await this.api.addpedido(pedido, localStorage.getItem('token')).then(async (data) => {
          console.log('Se ha guardado la siguiente fase correctamente')
          console.log(data);
          if (data.headerApp.code == 200) {
            this.step = "RE"

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
    })
  }

  prealerta() {
    this.confirmationService.confirm({
      message: "Are you sure to continue for prealert?",
      accept: async () => {
        console.log('ORDER ACCEPTED');
        this.step = "RE"
        console.log('SELECT');
        console.log(this.select);
        console.log('ITEMS');
        console.log(this.items);

        let head = {
          clieId: this.select.head.client.clieId,
          estado: this.select.head.estado,
          fase: "PR",
          fecha: this.select.head.fecha + ".000",
          pediId: this.select.head.pediId,
          usuaId: this.select.head.usuaId
        }
        console.log('Procesando...');
        let items: Array<any> = []
        this.items.forEach(async (element, index) => {
          items.push({
            cargcompId: element.carga['entiId'],
            cm: element.tamanio,
            farmId: element.finca['entiId'],
            fincapropia: element.fincapropia,
            florId: element.rosamistica['florId'],
            hbqb: element.HBBQ,
            line: index,
            marcId: element.marca['entiId'],
            pcomp: element.preciocomp,
            pvp: element.preciovent,
            shippingdate: this.select.head.fecha + '.000',
            status: element.status.nombre,
            tallos: element.tallos,
            totaltallos: element.totaltallos
          })
        });
        let pedido = {
          pedido: head,
          detalle: items
        }
        console.log('PEDIDO FINALlll');
        console.log(pedido);
        this.util.isLoading.next(true)
        await this.api.addpedido(pedido, localStorage.getItem('token')).then(async (data) => {
          console.log('Se ha guardado la siguiente fase correctamente')
          console.log(data);
          if (data.headerApp.code == 200) {
            this.step = 'PE'
            this.select = null
            this.items = []
            this.getPedidos()
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
    })
  }

  cancel() {
    console.log('Cancelar RX');
    this.confirmationService.confirm({
      message: "Are you sure to cancel this order?",
      accept: async () => {
        console.log('ORDER ACCEPTEDddddd..');
        this.step = "RX"
        let head = {
          clieId: this.select.head.client.clieId,
          estado: this.select.head.estado,
          fase: "RE",
          fecha: this.select.head.fecha + ".000",
          pediId: this.select.head.pediId,
          usuaId: this.select.head.usuaId
        }
        console.log('Procesando...');
        let items: Array<any> = []

        this.select.items.forEach(element => {
          items.push({
            cargcompId: element.cargcompId,
            cm: element.cm,
            farmId: element.farmId,
            fincapropia: element.fincapropia,
            florId: element.florId,
            hbqb: element.hbqb,
            line: element.line,
            marcId: element.marcId,
            pcomp: element.pcomp,
            pvp: element.pvp,
            shippingdate: element.shippingdate + '.000',
            status: element.status,
            tallos: element.tallos,
            totaltallos: element.totaltallos
          })
        });
        let pedido = {
          pedido: head,
          detalle: items
        }
        console.log(pedido);
        this.util.isLoading.next(true)
        await this.api.addpedido(pedido, localStorage.getItem('token')).then(async (data) => {
          console.log('Se ha guardado la siguiente fase correctamente')
          console.log(data);
          if (data.headerApp.code == 200) {
            await this.getPedidos()
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
    })

  }

  save() {
    console.log('Vamos a guardar..');
    if (this.cantidadPrice.length <= 0) {
      this.messageService.add({ severity: 'error', summary: 'Rosa Mística', detail: 'Debe agregar valores a la prealerta' });
      this.estado = true;
      return;
    }
    this.estado = false;
    this.submitted = true;
    // stop here if form is invalid
    if (this.prealertForm.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Rosa Mística', detail: 'Los campos son obligatorios' });
      return;
    }

    if (this.items.length >= this.select.items.length) {
      this.messageService.add({ severity: 'error', summary: 'Rosa Mística', detail: 'Esta agregando màs items de los que el cliente pidiò.' });
      return;
    }

    let pvp = "";
    let pcomp = "";
    let cm = "";

    console.log('------Cantidad Precio-------');
    console.log(this.cantidadPrice);


    this.cantidadPrice.forEach(data => {
      pvp = pvp + data.precvent + " ",
        pcomp = pcomp + data.preccomp + " ",
        cm = cm + data.tamanio + " "
    });


    this.item = {
      fecha: this.prealertForm.get('fecha').value,
      cliente: this.prealertForm.get('cliente').value,
      fincapropia: this.prealertForm.get('fincapropia').value ? 'S' : 'N',
      finca: this.prealertForm.get('finca').value,
      marca: this.prealertForm.get('marca').value,
      HBBQ: this.prealertForm.get('HBBQ').value ? this.prealertForm.get('HBBQ').value : '0',
      rosamistica: this.prealertForm.get('rosamistica').value,
      tamanio: cm,
      tallos: this.prealertForm.get('tallos').value,
      totaltallos: ((this.prealertForm.get('HBBQ').value ? this.prealertForm.get('HBBQ').value : this.hbqb) * this.prealertForm.get('tallos').value),
      preciovent: pvp,
      preciocomp: pcomp,
      carga: this.prealertForm.get('carga').value,
      status: this.prealertForm.get('estado').value
    }

    console.log('ITEMS');
    console.log(this.item);


    this.prealertForm.get('HBBQ').value ? this.hbqb = this.prealertForm.get('HBBQ').value : '';

    this.items.push(this.item);
    console.log('ITEMS FINAL');
    console.log(this.items);
    this.cantidadPrice = [];
    this.total = 0;
    this.items.forEach(item => {
      this.total += parseInt(item.totaltallos + "");
    });
    this.submitted = false;
    if (!this.prealertForm.get('repeat').value) {
      this.prealertForm.reset();
    } else {
      this.prealertForm.get('HBBQ').setValue(null);
      this.prealertForm.get('rosamistica').setValue(null);
      this.prealertForm.get('tallos').setValue(null);
      this.prealertForm.get('totaltallos').setValue(null);
    }

    this.prealertForm.get('fecha').setValue(new Date());

    //Validate complete 
    this.pedidotemporal.filter(tmp => {
      if (tmp == this.temporal) {
        console.log('...Si se encontro...');

      }
    })



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
    console.log('AGREGAR');

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
    console.log('????');

    console.log(this.cantidadPrice);

    this.estado = false;
    this.prealertForm.get('tamanio').setValue(null);
    this.prealertForm.get('preciocomp').setValue(null);
    this.prealertForm.get('preciovent').setValue(null)

  }

  async complete(pedido: any, selectpedido: Pedido) {
    console.log('DETALLE');
    console.log(pedido);
    console.log(selectpedido);    
    this.util.isLoading.next(true)
    const flower = await this.getFlowerbyName(pedido.flower)
    const client = await this.getClientbyName(selectpedido.head.client.nombres)
    this.prealertForm.get('fecha').setValue(new Date(pedido.shippingdate))
    this.prealertForm.get('rosamistica').setValue(flower)
    this.prealertForm.get('totaltallos').setValue(pedido.totaltallos)
    this.prealertForm.get('cliente').setValue(client)
    this.prealertForm.get('tamanio').setValue({ 'name': pedido.cm, 'code': pedido.cm })
    await this.onOptionsSelected()
    this.util.isLoading.next(false)
    this.temporal = {
      flower: pedido.flower,
      cm: pedido.cm,
      totaltallos: pedido.totaltallos,
      detalle: pedido.detalle
    }
    console.log('...PEDIDO TEMPORAL...');
    console.log(this.temporal);


  }

  async getClientbyName(name: string): Promise<any> {
    let cliente: client = null;
    await this.api.getObjectbyName('C', name.toUpperCase(), localStorage.getItem("token")).then(data => {
      if (data.headerApp.code == 200) {
        cliente = data.data.cliente;
      }
    }).catch(err => {
      if (err.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    })
    return cliente;
  }

  async getMarcbyName(entiId: number, name: string): Promise<any> {
    let marc: mark = null;
    await this.api.getMarcbyName(entiId, name.toUpperCase(), localStorage.getItem("token")).then(data => {
      if (data.headerApp.code == 200) {
        marc = data.data.mark;
      }
    }).catch(err => {
      if (err.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    })
    return marc;
  }

  async getFlowerbyName(name: string): Promise<any> {
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


  viewxlsx() {
    let head: Cabecera = {
      fecha: this.getFormatDate(new Date()),
      usuaId: this.user.usuaid,
      pralCerrado: "N",
      estado: "B",
      pralId: 0
    }

    let detail: Array<Detail> = [];
    let contador = 0;
    this.items.forEach(data => {
      detail.push({
        line: contador,
        shippingdate: this.getFormatDate(new Date(data.fecha)),
        clieId: data.cliente.entiId,
        fincapropia: data.fincapropia == 'N' ? 'N' : 'S',
        farmId: data.finca.entiId,
        marcId: data.marca.marcId,
        hbqb: data.HBBQ == null ? '' : data.HBBQ,
        florId: data.rosamistica['florId'],
        cm: data.tamanio,
        tallos: data.tallos,
        totaltallos: data.totaltallos,
        pcomp: data.preciocomp,
        cargcompId: parseInt(data.carga['entiId']),
        pvp: data.preciovent,
        status: data.status.nombre
      })
      contador++;
    })

    let prealert = {
      prealerta: head,
      detalle: detail
    }

    this.util.isLoading.next(true);
    this.api.getExcelPrealertDraft(prealert, localStorage.getItem('token')).then((data) => {
      if (data.headerApp.code == 200) {
        location.href = environment.url + data.data.xls;
        this.messageService.add({ severity: 'success', summary: 'Rosa Mística', detail: 'El archivo se ha descargado correctamente' });
      }
    }).catch(err => {
      console.log(err);
      if (err.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    })
    this.util.isLoading.next(false);

  }

  rowexpasion(indice: number) {

    if (this.selectitem == indice)
      this.selectitem = -1;
    else
      this.selectitem = indice;

  }

  deleteItem(prealert: any) {
    /*if (this.items.length <= 1) {
      this.messageService.add({ severity: 'warn', summary: 'Rosa Mística', detail: 'No se puede dejar sin items la prelaerta' });
      return
    }*/
    this.items = this.items.filter((element) => element != prealert);
    this.total = 0;
    this.items.forEach(item => {
      this.total += parseInt(item.totaltallos + "");
    });

  }

  back() {
    this.step = 'PE'
    this.getPedidos()
  }

  getFormatDate(date: Date): string {
    return (moment(date)).format('yyyy-MM-DD HH:mm:ss.SSS');
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
