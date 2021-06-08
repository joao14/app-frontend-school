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
import { DatePipe } from '@angular/common';

export interface detail {
  fecha: Date,
  variedad: any,
  stem: any,
  cantidad: number
}

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
  items: Array<detail> = []
  item: Item
  total: number
  selectitem: number
  user: user
  temporal: any

  submittedpedido = false;
  editvisible: boolean
  createvisible: boolean
  activebtn: boolean;
  pedidoForm: FormGroup
  dateEnvio: Date = new Date()
  minDate: Date = new Date()
  clientselect: client
  profile: string
  markselected: mark
  empresacargoselected: delivery
  mawba: string
  cajas: any[] = []
  fechadespacho: Date
  fecharecibido: Date
  HBQB: string
  CAJA: string


  constructor(private api: ApisService, private util: UtilService, private router: Router, private formBuilder: FormBuilder,
    private confirmationService: ConfirmationService, private messageService: MessageService, private datePipe: DatePipe) {
    this.prealertForm = this.formBuilder.group({
      fecha: [new Date()],
      cliente: [''],
      finca: ['', Validators.required],
      marca: [this.markselected],
      caja: [''],
      HBBQ: [''],
      bch: ['25', Validators.required],
      nobch: ['', Validators.required],
      rosamistica: ['', [Validators.required]],
      fincapropia: [false],
      tamanio: [''],
      tallos: ['', Validators.required],
      totaltallos: ['', Validators.required],
      preciovent: [''],
      preciocomp: [''],
      carga: [this.empresacargoselected],
      estado: ['', Validators.required],
      repeat: [''],
      line: ['']
    });
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
    this.step = "PE"
    this.inicializar()
    await this.getPedidos()
    await this.getServicios()
  }

  inicializar() {
    this.activebtn = false
    this.select = null
    this.items = []
    this.selectitem = -1
    this.markselected = null
    this.empresacargoselected = null
    this.fechadespacho = new Date()
    this.fecharecibido = new Date()
    this.mawba = ""
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

    this.cajas = [
      { name: "HB", code: "HB" },
      { name: "QB", code: "QB" },
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
    this.select = pedido
    this.indice = indice
    this.total = 0;
    this.select.items.forEach(item => {
      this.total += parseInt(item.totaltallos + "");
    });
  }

  async onOptionsSelected() {
    this.marks = [];
    await this.api.getmarks(this.select.head.client.clieId, localStorage.getItem("token")).then(mark => {
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
      case 'DE': {
        type = 'Despachado'
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
   * Funcion que permite editar cada fila
   * @param item 
   */
  async editrow(item: any) {
    console.log('...EDIT..');
    console.log(item);
    this.editvisible = true
    if (item.farmId != null) {
      //Validar si la caja y pieza forman parte del mismo grupo
      if (item.tipoempaque == "") {
        console.log("??? Esa vacio vamos a validar...");
        let tipoempaquetemporal = ""
        let cajastemporal = 0
        await this.select.items.forEach(async (temp) => {
          if (temp.line == (item.line - 1)) {
            console.log('Paso atras -1 ');
            tipoempaquetemporal = temp.tipoempaque
            cajastemporal = temp.hbqb
          }
        })
      }

      await this.onOptionsSelected()
      const flower = await this.getFlowerbyName(item.flower)
      const client = await this.getClientbyName(this.select.head.client.nombres)
      const cargname = await this.getEmpresaCargabyName(item.cargname)
      const farm = await this.getFincabyNameComplete(item.farm)
      const mark = await this.getMarcbyName(this.select.head.client.clieId, this.select.head.marcId.nombre)
      console.log(this.cajas);
      const caja = await this.cajas.filter(caja => caja.code == item.tipoempaque)
      console.log('FINAL');
      console.log(caja);
      this.markselected = mark
      this.prealertForm.get('fecha').setValue(new Date(item.shippingdate))
      this.prealertForm.get('rosamistica').setValue(flower)
      this.prealertForm.get('caja').setValue(caja[0])
      this.prealertForm.get('HBBQ').setValue(item.hbqb)
      this.prealertForm.get('finca').setValue(farm)
      this.prealertForm.get('marca').setValue(mark)
      this.prealertForm.get('tallos').setValue(item.totaltallos / item.hbqb)
      this.prealertForm.get('totaltallos').setValue(item.totaltallos)
      this.prealertForm.get('cliente').setValue(client)
      this.prealertForm.get('fincapropia').setValue(item.fincapropia == null || item.fincapropia == 'N' ? false : true)
      this.prealertForm.get('line').setValue(item.line)
      this.prealertForm.get('carga').setValue(cargname)
      this.prealertForm.get('bch').setValue(item.tallosxbch)
      this.prealertForm.get('nobch').setValue(item.totaltallos / this.prealertForm.get('bch').value)

      if (item.status.nombre == null) {
        let status = await this.status.filter(state => state.nombre == (item.status));
        this.prealertForm.get('estado').setValue(status[0])
      }
      else {
        this.prealertForm.get('estado').setValue(item.status)
      }

      this.cantidadPrice = []
      this.cantidadPrice.push({
        tamanio: item.cm,
        preccomp: item.pcomp,
        precvent: item.pvp
      })

    } else {
      console.log('SIN EDITAR ITEM')
      const flower = await this.getFlowerbyName(item.flower)
      const client = await this.getClientbyName(this.select.head.client.nombres)
      this.prealertForm.get('fecha').setValue(new Date(item.shippingdate))
      this.prealertForm.get('rosamistica').setValue(flower)
      this.prealertForm.get('totaltallos').setValue(item.totaltallos)
      this.prealertForm.get('bch').value == null ? this.prealertForm.get('bch').setValue(25) : ''
      this.prealertForm.get('nobch').setValue(item.totaltallos / this.prealertForm.get('bch').value)
      this.prealertForm.get('cliente').setValue(client)
      this.prealertForm.get('tamanio').setValue({ 'name': item.cm, 'code': item.cm })
      this.prealertForm.get('line').setValue(item.line)
      await this.onOptionsSelected()
    }


  }


  /**
   * Function to continue to revision
   */
  async continuarrevision() {
    console.log('Continuar revisiÓN');
    console.log(this.select);

    this.select.head.fase == 'DE' ? this.step = 'DE' : this.step = "RE";
    if (this.select.head.fase == 'DE') {
      this.fechadespacho = new Date(this.select.head.fechdesp)
      this.fecharecibido = new Date(this.select.head.fecharri)
      console.log(this.fechadespacho);
      console.log(this.fecharecibido);
    }
    const mark = await this.getMarcbyName(this.select.head.client.clieId, this.select.head.marcId.nombre == 'NO DEFINIDO' && this.markselected ? this.markselected.nombre : this.select.head.marcId.nombre)
    this.markselected = mark
    const empresacargo = await this.getEmpresaCargabyName(this.select.head?.cargcompId['nombre'] == 'NO DEFINIDO' && this.empresacargoselected ? this.empresacargoselected.nombres : this.select.head.cargcompId.nombre)
    this.empresacargoselected = empresacargo
    this.mawba = this.select.head.mawb
    await this.onOptionsSelected()
    //Validamos si todos los registros estan completos
    for (let item of this.select.items) {
      console.log(item);
      if (item.farmId == null) {
        this.activebtn = false
        break;
      } else {
        this.activebtn = true
      }
    }

    //Validamos los ultimos registros
    await Promise.all(this.select.items.map(async (element) => {
      if (element.hbqb != 0) {
        this.CAJA = element.tipoempaque
        this.HBQB = String(element.hbqb)
      }
    })
    );

    console.log("****Resultados finales*****");
    console.log(this.CAJA);
    console.log(this.HBQB);



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

        this.total = 0;
        this.select.items.forEach(item => {
          this.total += parseInt(item.totaltallos + "");
        });

        let pedido = {
          pedido: head,
          detalle: items
        }

        console.log('PEDITO TEMP');
        console.log(pedido);

        console.log(pedido);
        this.util.isLoading.next(true)
        await this.api.addpedido(pedido, localStorage.getItem('token')).then(async (data) => {
          console.log('Se ha guardado la siguiente fase correctamente')
          console.log(data);
          if (data.headerApp.code == 200) {
            this.step = "RE"
            this.createvisible = false
            this.editvisible = false
            this.onOptionsSelected()

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

  /**
   * Function the use to conitnue step DESPACHADO
   */
  prealerta() {
    this.confirmationService.confirm({
      message: "Are you sure to continue to next step?",
      accept: async () => {
        this.step = "RE"

        let head = {
          pediId: this.select.head.pediId,
          fecha: this.select.head.fecha != null ? this.select.head.fecha + '.000' : this.select.head.fecha,
          fechrequ: this.select.head.fechrequ != null ? this.select.head.fechrequ + '.000' : this.select.head.fechrequ,
          fechdesp: this.select.head.fechdesp != null ? this.select.head.fechrequ + '.000' : this.select.head.fechdesp,
          fecharri: this.select.head.fecharri != null ? this.select.head.fecharri + '.000' : this.select.head.fecharri,
          usuaId: this.select.head.usuaId,
          estado: this.select.head.estado,
          fase: "DE",
          clieId: this.select.head.client.clieId,
          marcId: this.markselected.marcId,
          cargcompId: this.empresacargoselected.entiId,
          mawb: this.mawba
        }

        let items: Array<any> = []
        await Promise.all(this.select.items.map(async (element, index) => {
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
            shippingdate: this.getFormatDate(new Date(element.shippingdate)),
            status: element.status,
            tallos: element.tallos,
            totaltallos: element.totaltallos,
            tipoempaque: element.tipoempaque,
            tallosxbch: element.tallosxbch,
            cantidadbch: element.cantidadbch
          })
        }))

        let pedido = {
          pedido: head,
          detalle: items
        }

        console.log('TEMPORALll');
        console.log(pedido);

        this.util.isLoading.next(true)
        await this.api.addpedido(pedido, localStorage.getItem('token')).then(async (data) => {
          console.log('Se ha enviado a la siguiente fase correctamente')
          console.log(data);
          if (data.headerApp.code == 200) {
            this.step = 'DE'
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
        this.step = "PE"
        let head = {
          clieId: this.select.head.client.clieId,
          estado: "F",
          fase: "RX",
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
            this.indice = null
            this.select = null
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

  cancelar() {
    this.editvisible = false
    this.createvisible = false
    this.prealertForm.reset()
    this.prealertForm.get("bch").setValue("25")
    this.submitted = false
    this.cantidadPrice = []
  }

  async changedates() {
   
    let order = {
      fechdesp: this.getFormatDate(this.fechadespacho),
      fecharri: this.getFormatDate(this.fecharecibido),
      pediId: this.select.head.pediId
    }
   
    this.util.isLoading.next(true)
    await this.api.updatedatesorder(order, localStorage.getItem('token')).then(async (data) => {     
      if (data.headerApp.code == 200) {
        this.messageService.add({ severity: 'info', summary: 'Rosa Mística', detail: 'Se actulizado la informaciòn del pedido' });
        this.step = "DE"
        await this.getServicios()
        this.prealertForm.reset()
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


  /**
   * Function the save new row of the order for the administrator
   * @returns 
   */
  async savenewrow() {
    if (this.cantidadPrice.length <= 0) {
      this.messageService.add({ severity: 'error', summary: 'Rosa Mística', detail: 'Debe agregar valores a la prealerta' });
      this.estado = true;
      return;
    }

    if (this.markselected == null || this.empresacargoselected == null || this.mawba == "") {
      this.messageService.add({ severity: 'error', summary: 'Rosa Mística', detail: 'Los valores de la cabecera son obligatorios' });
      return;
    }

    this.estado = false
    this.submitted = true

    // stop here if form is invalid
    if (this.prealertForm.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Rosa Mística', detail: 'Los campos son obligatorios' });
      return;
    }

    let pvp = "";
    let pcomp = "";
    let cm = "";

    this.cantidadPrice.forEach(data => {
      pvp = pvp + data.precvent + " ",
        pcomp = pcomp + data.preccomp + " ",
        cm = cm + data.tamanio + " "
    });

    const farm = await this.getFincabyName(this.prealertForm.get('finca').value.nombres)
    const mark = await this.getMarcbyName(this.select.head.client.clieId, this.select.head.marcId == null || this.select.head.marcId.nombre == 'NO DEFINIDO' ? this.markselected.nombre : this.select.head.marcId.nombre)
    const empresacargo = await this.getEmpresaCargabyName(this.select.head.cargcompId == null || this.select.head.cargcompId.nombre == 'NO DEFINIDO' ? this.empresacargoselected.nombres : this.select.head.cargcompId.nombre)
    const rosamistica = await this.getFlowerbyName(this.prealertForm.get('rosamistica').value.nombre)

    this.select.items.push({
      shippingdate: this.getFormatDate(new Date(this.prealertForm.get('fecha').value)),
      fincapropia: this.prealertForm.get('fincapropia').value ? 'S' : 'N',
      farm: farm.nombres,
      farmId: farm.entiId,
      marcId: mark.marcId,
      mark: mark.nombre,
      hbqb: this.prealertForm.get('HBBQ').value ? this.prealertForm.get('HBBQ').value : '0',
      florId: rosamistica.florId,
      flower: rosamistica.nombre,
      cm: cm,
      tallos: this.prealertForm.get('tallos').value,
      totaltallos: (this.prealertForm.get('totaltallos').value),
      pvp: pvp,
      pcomp: pcomp,
      cargcompId: empresacargo.entiId,
      cargname: empresacargo.nombres,
      status: this.prealertForm.get('estado').value?.titrId ? this.prealertForm.get('estado').value?.nombre : this.prealertForm.get('estado').value,
      line: this.select.items[this.select.items.length - 1].line + 1,
      tipoempaque: this.prealertForm.get('caja').value ? this.prealertForm.get('caja').value.code : "",
      tallosxbch: this.prealertForm.get('bch').value,
      cantidadbch: this.prealertForm.get('nobch').value,
    });

    await this.savechangesbyrow()

    this.submitted = false
    this.editvisible = false
    this.createvisible = false
    this.cantidadPrice = []
    this.total = 0;
    this.select.items.forEach(item => {
      this.total += parseInt(item.totaltallos + "");
    });
    this.prealertForm.reset();
    this.prealertForm.get("bch").setValue("25")
    //Validamos si todos los registros estan completos   
    for (let item of this.select.items) {
      if (item.farmId == null) {
        this.activebtn = false
        break;
      } else {
        this.activebtn = true
      }
    }

    //Validamos los ultimos registros
    await Promise.all(this.select.items.map(async (element) => {
      if (element.hbqb != 0) {
        this.CAJA = element.tipoempaque
        this.HBQB = String(element.hbqb)
      }
    })
    );

  }

  /**
   * Function the used when save or edit rows of the order 
   * @returns 
   */
  async save() {

    if (this.cantidadPrice.length <= 0) {
      this.messageService.add({ severity: 'error', summary: 'Rosa Mística', detail: 'Debe agregar valores a la prealerta' });
      this.estado = true;
      return;
    }

    if (this.markselected == null || this.empresacargoselected == null || this.mawba == "") {
      this.messageService.add({ severity: 'error', summary: 'Rosa Mística', detail: 'Los valores de la cabecera son obligatorios' });
      return;
    }

    this.estado = false
    this.submitted = true

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

    this.cantidadPrice.forEach(data => {
      pvp = pvp + data.precvent + " ",
        pcomp = pcomp + data.preccomp + " ",
        cm = cm + data.tamanio + " "
    });

    await Promise.all(this.select.items.map(async (item, index) => {
      if (item.line == this.prealertForm.get('line').value) {
        const farm = await this.getFincabyName(this.prealertForm.get('finca').value.nombres)
        const mark = await this.getMarcbyName(this.select.head.client.clieId, this.select.head.marcId == null || this.select.head.marcId.nombre == 'NO DEFINIDO' ? this.markselected.nombre : this.select.head.marcId.nombre)
        const empresacargo = await this.getEmpresaCargabyName(this.select.head.cargcompId == null || this.select.head.cargcompId.nombre == 'NO DEFINIDO' ? this.empresacargoselected.nombres : this.select.head.cargcompId.nombre)
        const rosamistica = await this.getFlowerbyName(this.prealertForm.get('rosamistica').value.nombre)
        this.select.items[index] = {
          shippingdate: this.getFormatDate(new Date(this.prealertForm.get('fecha').value)),
          fincapropia: this.prealertForm.get('fincapropia').value ? 'S' : 'N',
          farm: farm.nombres,
          farmId: farm.entiId,
          marcId: mark.marcId,
          mark: mark.nombre,
          hbqb: this.prealertForm.get('HBBQ').value ? this.prealertForm.get('HBBQ').value : '0',
          florId: rosamistica.florId,
          flower: rosamistica.nombre,
          cm: cm,
          tallos: this.prealertForm.get('tallos').value,
          totaltallos: (this.prealertForm.get('totaltallos').value),
          pvp: pvp,
          pcomp: pcomp,
          cargcompId: empresacargo.entiId,
          cargname: empresacargo.nombres,
          status: this.prealertForm.get('estado').value?.titrId ? this.prealertForm.get('estado').value?.nombre : this.prealertForm.get('estado').value,
          line: this.prealertForm.get('line').value,
          tipoempaque: this.prealertForm.get('caja').value.code,
          tallosxbch: this.prealertForm.get('bch').value,
          cantidadbch: this.prealertForm.get('nobch').value,
        }
      }
    }));
    console.log('..Finalizar...');
    console.log(this.select);


    await this.savechangesbyrow()

    this.submitted = false
    this.editvisible = false
    this.cantidadPrice = []
    this.total = 0;
    this.select.items.forEach(item => {
      this.total += parseInt(item.totaltallos + "");
    });
    this.prealertForm.reset();
    this.prealertForm.get("bch").setValue("25")

    //Validamos si todos los registros estan completos

    for (let item of this.select.items) {
      console.log(item);
      if (item.farmId == null) {
        this.activebtn = false
        break;
      } else {
        this.activebtn = true
      }
    }

    //Validamos los ultimos registros
    await Promise.all(this.select.items.map(async (element) => {
      if (element.hbqb != 0) {
        this.CAJA = element.tipoempaque
        this.HBQB = String(element.hbqb)
      }
    })
    );

  }

  /**
   * Function the save changes by row
   */
  async savechangesbyrow() {
    let head = {
      clieId: this.select.head.client.clieId,
      estado: this.select.head.estado,
      fase: "RE",
      fecha: this.select.head.fecha + ".000",
      marcId: this.markselected.marcId,
      pediId: this.select.head.pediId,
      usuaId: this.select.head.usuaId,
      cargcompId: this.empresacargoselected.entiId,
      mawb: this.mawba
    }

    let items: Array<any> = []
    await Promise.all(this.select.items.map(async (element, index) => {
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
        shippingdate: this.getFormatDate(new Date(element.shippingdate)),
        status: element.status,
        tallos: element.tallos,
        totaltallos: element.totaltallos,
        tipoempaque: element.tipoempaque,
        tallosxbch: element.tallosxbch,
        cantidadbch: element.cantidadbch
      })
    })
    )

    let pedido = {
      pedido: head,
      notify: false,
      detalle: items
    }

    console.log('.....ITEM PEDIDO FINAL...');
    console.log(pedido);

    this.util.isLoading.next(true)
    await this.api.addpedido(pedido, localStorage.getItem('token')).then(async (data) => {
      console.log('Se ha actualizado correctamente')
      console.log(data);
      if (data.headerApp.code == 200) {
        this.messageService.add({ severity: 'info', summary: 'Rosa Mística', detail: 'Se actulizado la informaciòn del pedido' });
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

  new() {
    this.step = 'NEW'
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
    this.util.isLoading.next(true)
    const flower = await this.getFlowerbyName(pedido.flower)
    const client = await this.getClientbyName(selectpedido.head.client.nombres)
    this.prealertForm.get('fecha').setValue(new Date(pedido.fecha))
    this.prealertForm.get('rosamistica').setValue(flower)
    this.prealertForm.get('totaltallos').setValue(pedido.totaltallos)
    this.prealertForm.get('cliente').setValue(client)
    this.prealertForm.get('tamanio').setValue({ 'name': pedido.cm, 'code': pedido.cm })
    await this.onOptionsSelected()
    this.util.isLoading.next(false)
    this.temporal = {
      fecha: pedido.fecha,
      flower: pedido.flower,
      cm: pedido.cm,
      totaltallos: pedido.totaltallos,
      detalle: pedido.detalle
    }
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
      console.log('DATA');
      console.log(data);
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

  async finalizar() {
    if (this.clientselect == null) {
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

    console.log('DATA????');
    console.log(this.items);


    let items = []
    this.items.forEach(async (item, index) => {
      items.push(
        {
          line: index,
          shippingdate: this.getFormatDate(new Date(item.fecha + '')),
          fincapropia: null,
          farmId: null,
          marcId: null,
          hbqb: 0,
          florId: item.variedad.florId,
          cm: item.stem.code,
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

    console.log('FINISH ORDER TO SEND FROM PEDIDO');
    console.log(order);
    this.confirmationService.confirm({
      message: "Are you sure to create a new order?",
      accept: async () => {
        this.util.isLoading.next(true)
        await this.api.addpedido(order, localStorage.getItem('token')).then(async (data) => {
          console.log('Se ha guarado correctamente from pedidos');
          console.log(data);
          if (data.headerApp.code == 200) {
            this.step = 'PE'
            await this.inicializar()
            await this.getPedidos()
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
    })


  }


  rowexpasion(indice: number) {

    if (this.selectitem == indice)
      this.selectitem = -1;
    else
      this.selectitem = indice;

  }

  async getFincabyNameComplete(name: string): Promise<any> {
    let finca: finca = null;
    await this.api.getObjectbyNameComplete('F', name.toUpperCase(), localStorage.getItem("token")).then(data => {

      if (data.headerApp.code == 200) {
        finca = data.data.farm;

      }
    }).catch(err => {
      if (err.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    })
    return finca;
  }

  async getFincabyName(name: string): Promise<any> {
    let finca: finca = null;
    await this.api.getObjectbyName('F', name.toUpperCase(), localStorage.getItem("token")).then(data => {

      if (data.headerApp.code == 200) {
        finca = data.data.farm;
      }
    }).catch(err => {
      if (err.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    })
    return finca;
  }

  viewPDF(notificacion: any) {
    console.log('URL...');
    console.log(notificacion);

    console.log(notificacion.url);
    this.router.navigate(notificacion.pdf);
    console.log('BIEN');


  }

  /**
   * Function to search input
   * @param $event 
   */
  async applyFilter($event) {
    if ($event.keyCode == 8) {
      await this.getPedidos()
      this.pedidos = await this.pedidos.filter(pedido => (pedido.head.client.nombres.toLocaleLowerCase()).includes($event.target.value.toLocaleLowerCase()))
    } else {
      this.pedidos = this.pedidos.filter(pedido => (pedido.head.client.nombres.toLocaleLowerCase()).includes($event.target.value.toLocaleLowerCase()))
    }

  }

  async getEmpresaCargabyName(name: string): Promise<any> {
    let delivery: delivery = null;
    await this.api.getObjectbyName('Z', name.toUpperCase(), localStorage.getItem("token")).then(data => {
      if (data.headerApp.code == 200) {
        delivery = data.data.cargocompanie;
      }
    }).catch(err => {
      if (err.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    })
    return delivery;
  }

  /**
   * Function delete order created for client
   */
  deleteItemcreateorder(item: any) {
    this.items = this.items.filter(row => row != item)
  }

  /**
   * Function the delete item
   * @param prealert 
   */

  async deleteItem(prealert: any) {

    if (this.markselected == null || this.empresacargoselected == null || this.mawba == "") {
      this.messageService.add({ severity: 'error', summary: 'Rosa Mística', detail: 'Los valores de la cabecera son obligatorios' });
      return;
    }

    if (this.select.items.length <= 1) {
      this.messageService.add({ severity: 'info', summary: 'Rosa Mística', detail: 'No puede eliminar el ùltimo registro del pedido' });
      return
    }

    this.confirmationService.confirm({
      message: "Are you sure to delete iten?",
      accept: async () => {
        this.select.items = this.select.items.filter((element) => element != prealert);
        console.log('DELETE FINAL');
        console.log(this.select);
        await this.savechangesbyrow()
        this.total = 0;
        this.select.items.forEach(item => {
          this.total += parseInt(item.totaltallos + "");
        });

      }
    });


  }


  /**
   * Function back when return get all orders
   */
  back() {
    this.step = 'PE'
    this.select = null
    this.editvisible = false
    this.createvisible = false
    this.activebtn = false
    this.prealertForm.get("bch").setValue("25")
    this.prealertForm.reset()
    this.submitted = false
    this.cantidadPrice = []
    this.markselected = null
    this.empresacargoselected = null
    this.mawba = ""
    this.getPedidos()
  }

  /**
   * Convert date to string
   * @param date 
   * @returns 
   */
  getFormatDate(date: Date): string {
    return (moment(date)).format('yyyy-MM-DD HH:mm:ss.SSS');
  }




  remove(cantidad: Numeros) {
    this.cantidadPrice = this.cantidadPrice.filter(numero => numero != cantidad);
  }

  saveNewOrder() {
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

    console.log('ITESSSS');
    console.log(this.items);

    this.submitted = false
    this.pedidoForm.reset()
    this.pedidoForm.get('fecha').setValue(this.dateEnvio)
  }


  /**
   * Funcion que permite notificar la prelaerta
   */
  async notificar() {

    this.confirmationService.confirm({
      message: "Are you sure to continue with notfication?",
      accept: async () => {

        let head = {
          pediId: this.select.head.pediId,
          fecha: this.select.head.fecha != null ? this.select.head.fecha + '.000' : this.select.head.fecha,
          fechrequ: this.select.head.fechrequ != null ? this.select.head.fechrequ + '.000' : this.select.head.fechrequ,
          fechdesp: this.select.head.fechdesp != null ? this.select.head.fechrequ + '.000' : this.select.head.fechdesp,
          fecharri: this.select.head.fecharri != null ? this.select.head.fecharri + '.000' : this.select.head.fecharri,
          usuaId: this.select.head.usuaId,
          estado: this.select.head.estado,
          fase: "RE",
          clieId: this.select.head.client.clieId,
          marcId: this.markselected.marcId,
          cargcompId: this.empresacargoselected.entiId,
          mawb: this.mawba
        }

        let items: Array<any> = []
        this.select.items.forEach(async (element, index) => {
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
            shippingdate: this.getFormatDate(new Date(element.shippingdate)),
            status: element.status,
            tallos: element.tallos,
            totaltallos: element.totaltallos,
            tipoempaque: element.tipoempaque,
            tallosxbch: element.tallosxbch,
            cantidadbch: element.cantidadbch
          })
        });
        let pedido = {
          pedido: head,
          detalle: items
        }

        console.log('...PEDIDOS..');
        console.log(pedido);

        this.util.isLoading.next(true)
        await this.api.sendnotification(pedido, localStorage.getItem('token')).then(async (data) => {

          if (data.headerApp.code == 200) {
            this.select.prealerts = data.data.prealert.files
            this.messageService.add({ severity: 'success', summary: 'Rosa Mística', detail: 'Notificaciòn enviada correctamente' });
          } else {
            this.messageService.add({ severity: 'error', summary: 'Rosa Mística', detail: '¡Algo sucedio y no se pudo notificar al cliente!' });
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

  choose($event) {
    this.pedidoForm.get('fecha').setValue($event)
  }

  onOptionsSelectedMarca() {
    this.prealertForm.get('marca').setValue(this.markselected)
  }

  onOptionsSelecteDelivery() {
    this.prealertForm.get('carga').setValue(this.empresacargoselected)
  }

  /**
  * Operation calculate
  */
  calculate() {
    this.prealertForm.get('totaltallos').setValue((this.prealertForm.get('HBBQ').value == null || this.prealertForm.get('HBBQ').value == 0 ? this.hbqb : this.prealertForm.get('HBBQ').value) * this.prealertForm.get('tallos').value)
  }

  calculatebch() {
    this.prealertForm.get('nobch').setValue(this.prealertForm.get('bch').value == null || this.prealertForm.get('bch').value == 0 ? '0' : this.prealertForm.get('totaltallos').value / (this.prealertForm.get('bch').value))
  }

  calculatetallos() {
    this.prealertForm.get('tallos').setValue(this.prealertForm.get('HBBQ').value == null || this.prealertForm.get('HBBQ').value == 0 ? '0' : this.prealertForm.get('totaltallos').value / this.prealertForm.get('HBBQ').value)
  }

  calculatetotaltallos() {
    console.log('DATOS');
    console.log(this.prealertForm.get('HBBQ').value);
    console.log(this.HBQB);
    console.log(this.CAJA);

    if (this.prealertForm.get('HBBQ').value == 0 && this.HBQB == "") {
      this.messageService.add({ severity: 'info', summary: 'Rosa Mística', detail: 'No puede calcular valores sin nùmero de cajas' });
      this.prealertForm.get("totaltallos").setValue(null);
      return
    }

    if (this.prealertForm.get('HBBQ').value == 0 && this.HBQB != "") {
      this.prealertForm.get('nobch').setValue(this.prealertForm.get('bch').value == null || this.prealertForm.get('bch').value == 0 ? '0' : this.prealertForm.get('totaltallos').value / (this.prealertForm.get('bch').value))
      this.prealertForm.get('tallos').setValue(this.prealertForm.get('totaltallos').value / Number(this.HBQB))
    } else {
      this.prealertForm.get('nobch').setValue(this.prealertForm.get('bch').value == null || this.prealertForm.get('bch').value == 0 ? '0' : this.prealertForm.get('totaltallos').value / (this.prealertForm.get('bch').value))
      this.prealertForm.get('tallos').setValue(this.prealertForm.get('HBBQ').value == null || this.prealertForm.get('HBBQ').value == 0 ? '0' : this.prealertForm.get('totaltallos').value / this.prealertForm.get('HBBQ').value)
    }

  }

  /**
   * Formularios reactivos
   */
  get fp() {
    return this.pedidoForm.controls;
  }

  get f() {
    return this.prealertForm.controls;
  }



}
