import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng';
import * as XLSX from "xlsx";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApisService } from 'src/services/apis.service';
import { Flower } from '../crm/flores/flores.component';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { client } from 'src/models/client';
import { finca } from 'src/models/finca';
import { flower } from 'src/models/flower';
import { delivery } from 'src/models/delivery';
import { mark } from 'src/models/mark';
import { UtilService } from 'src/services/util.service';
import { user } from '../../../../models/user';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';

export interface Status {
  titrId: number,
  nombre: string,
  estado: string,
  tipo: string,
  docuprin: string,
  categoria: string
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
  line: number;
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

export interface Numeros {
  tamanio: string;
  preccomp: number;
  precvent: number;
}

export interface Prealert {
  prealerta: Cabecera;
  lstdist: string;
  detalle: Array<Detail>;
}

export interface Response {
  files: any[];
  pdf: string;
  pralId: number;
  totaltallos: number;
  totalcajas: number;
  numregi: number;
}

export interface ClientDraft {
  info: {
    clieId: number;
    email: string;
    nombres: string;
    pdf: string;
  },
  items: Array<{
    cargname: string;
    cm: string;
    farm: string;
    fincapropia: string;
    flower: string;
    hbqb: number;
    mark: string;
    pcomp: string;
    pvp: string;
    shippingdate: string;
    status: string;
    tallos: number;
    totaltallos: number;
    line: number;
  }>;
}

export interface Draft {
  head: {
    pralId: number;
    fecha: string;
    pdf: string;
  },
  clients: Array<ClientDraft>;
}

@Component({
  selector: 'app-prealerta',
  templateUrl: './prealerta.component.html',
  styleUrls: ['./prealerta.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class PrealertaComponent implements OnInit {


  lista: Item[] = [];
  selectrow: Item;
  status: Status[] = [];
  optionSelect: string;
  files: any = [];
  selectitem: number;
  prealertForm: FormGroup;
  submitted = false;
  flores: Array<Flower> = [];
  fincas: Array<finca> = [];
  clientes: Array<client> = [];
  deliveries: Array<delivery> = [];
  marks: Array<mark> = [];
  selectClient: client;
  tamanios: any[] = [];
  user: user;


  cantidadPrice: Numeros[] = [];
  tamanio: number = 0;
  precven: number = 0;
  preccom: number = 0;
  estado: boolean = false;
  item: Item;
  items: Item[] = [];
  prealert: Prealert;
  expanded: boolean;
  total: number;
  validate: boolean;
  smsvalidate: string;
  dialogVisible: boolean;
  response: Response;
  step: number;
  prealertsdraft: Array<Draft> = [];
  url: string;
  dialogVisiblePDF: boolean;
  editPrealert: boolean;
  idPrealert: number;
  minDateValue: Date = new Date();
  hbqb: number;
  editvisible: boolean = false;
  activeitembyedit: Item;
  tempStatus: Status;
  pralId: string;
  dialogVisibleClients: boolean = false
  arraycodes: any[] = []
  clients: Array<{
    nombres: String,
    code: Number,
    isSelected: Boolean
  }> = []

  constructor(private messageService: MessageService, private formBuilder: FormBuilder, private confirmationService: ConfirmationService,
    private api: ApisService, private router: Router, private utilService: UtilService, private spinner: NgxSpinnerService) {
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
    await this.inicializate()
    await this.prealertdraft()
    await this.getServicios();
  }


  inicializate() {
    this.idPrealert = 0;
    this.editPrealert = false;
    this.dialogVisible = false;
    this.step = 1;
    this.selectitem = -1;
    this.cantidadPrice = [];
    this.expanded = false;
    this.validate = false;
    this.dialogVisible = false;
    this.response = null;
    this.pralId = "";
    this.hbqb = 0;
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
      status: null,
      line: 0
    }

    this.prealert = {
      prealerta: null,
      lstdist: "",
      detalle: []
    }

    this.items = [];

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
      { name: '140', code: '140' },
      { name: '150', code: '150' }
    ]

    this.optionSelect = "manual";

  }

  async prealertdraft() {
    this.prealertsdraft = [];
    this.utilService.isLoading.next(true);
    await this.api.getprealertsdraft(localStorage.getItem('token')).then(prealert => {
      if (prealert.headerApp.code == 200) {
        this.prealertsdraft = prealert.data.prealerts;
      }
    }).catch(err => {
      if (err.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    })
    this.utilService.isLoading.next(false);
  }


  deleteItem(prealert: any) {
    if (this.editPrealert && this.items.length <= 1) {
      this.messageService.add({ severity: 'warn', summary: 'Rosa Mística', detail: 'No se puede dejar sin items la prelaerta' });
      return
    }
    this.items = this.items.filter((element) => element != prealert);
    this.total = 0;
    this.items.forEach(item => {
      this.total += parseInt(item.totaltallos + "");
    });

  }

  save() {
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

    let pvp = "";
    let pcomp = "";
    let cm = "";

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
      status: this.prealertForm.get('estado').value,
      line: this.items.length <= 0 ? 0 : this.items[this.items.length - 1].line + 1
    }

    this.prealertForm.get('HBBQ').value ? this.hbqb = this.prealertForm.get('HBBQ').value : '';

    this.items.push(this.item);
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
  }

  rowexpasion(indice: number) {
    if (this.selectitem == indice)
      this.selectitem = -1;
    else
      this.selectitem = indice;

  }

  selectOption(texto: string) {
    this.submitted = false;
    this.prealertForm.reset();
    this.optionSelect = texto;
    this.files = [];
    this.items = [];
    this.prealert = {
      prealerta: null,
      lstdist: "",
      detalle: []
    }
  }

  async uploadFile(event) {

    const target: DataTransfer = <DataTransfer>event.target;

    if (target.files.length !== 1) {
      throw new Error("Cannot use multiple files");
    }
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(target.files[0]);
    this.items = [];
    this.spinner.show();
    reader.onload = async (e: any) => {
      /* create workbook */
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: "binary" });
      /* selected the first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      /* save data */
      const data = XLSX.utils.sheet_to_json(ws, { raw: true }); // to get 2d array pass 2nd parameter as object {header: 1}      
      this.utilService.isLoading.next(true);
      this.total = 0;
      for (var i = 0; i < data.length; i++) {
        const client = await this.getClientbyName(data[i]['CLIENTE']);
        if (client == null) {
          this.spinner.hide();
          this.utilService.isLoading.next(false);
          this.messageService.add({ severity: 'error', summary: 'Rosa Mística', detail: 'El cliente ' + data[i]['CLIENTE'] + ' no se encuentra ingresado en el sistema.' });
          this.validate = true;
          this.smsvalidate = 'El cliente ' + data[i]['CLIENTE'] + ' no se encuentra registrado en el sistema.'

          return
        }
        const marca = await this.getMarcbyName(client.entiId, data[i]['MARCACION']);
        if (marca == null) {
          this.spinner.hide();
          this.utilService.isLoading.next(false);
          this.messageService.add({ severity: 'error', summary: 'Rosa Mística', detail: 'La marca ' + data[i]['MARCACION'] + ' no se encuentra ingresada en el sistema.' });
          this.validate = true;
          this.smsvalidate = 'La marca ' + data[i]['MARCACION'] + ' no se encuentra registrada en el sistema.'
          return
        }

        const finca = await this.getFincabyName(data[i]['FINCA']);
        if (finca == null) {
          this.spinner.hide();
          this.utilService.isLoading.next(false);
          this.messageService.add({ severity: 'error', summary: 'Rosa Mística', detail: 'La finca ' + data[i]['FINCA'] + ' no se encuentra ingresadA en el sistema.' });
          this.validate = true;
          this.smsvalidate = 'La finca ' + data[i]['FINCA'] + ' no se encuentra registrada en el sistema.'
          return
        }

        const flower = await this.getFlowerbyName(data[i]['VARIEDAD']);
        if (flower == null) {
          this.spinner.hide();
          this.utilService.isLoading.next(false);
          this.messageService.add({ severity: 'error', summary: 'Rosa Mística', detail: 'La flor ' + data[i]['VARIEDAD'] + ' no se encuentra ingresada en el sistema.' });
          this.validate = true;
          this.smsvalidate = 'La flor ' + data[i]['VARIEDAD'] + ' no se encuentra registrada en el sistema.'
          return
        }

        const delivery = await this.getEmpresaCargabyName(data[i]['CARGUERA']);
        if (delivery == null) {
          this.spinner.hide();
          this.utilService.isLoading.next(false);
          this.messageService.add({ severity: 'error', summary: 'Rosa Mística', detail: 'La empresa de carga ' + data[i]['CARGUERA'] + ' no se encuentra ingresada en el sistema.' });
          this.validate = true;
          this.smsvalidate = 'La empresa de carga ' + data[i]['CARGUERA'] + ' no se encuentra registrada en el sistema.'
          return
        }

        const status = await this.getStatusObject(data[i]['STATUS']);
        if (status == null) {
          this.spinner.hide();
          this.utilService.isLoading.next(false);
          this.messageService.add({ severity: 'error', summary: 'Rosa Mística', detail: 'El estado ' + data[i]['STATUS'] + ' no se encuentra ingresada en el sistema.' });
          this.validate = true;
          this.smsvalidate = 'La estado ' + data[i]['STATUS'] + ' no se encuentra registrada en el sistema.'
          return
        }


        let item = {
          fecha: data[i]['SHIPPING DATE'] + ' 00:00:00.000',
          cliente: client,
          fincapropia: data[i]['FINCA PROPIA'] == undefined || data[i]['FINCA PROPIA'] == '' ? 'N' : 'S',
          finca: finca,
          marca: marca,
          HBBQ: data[i]['HB/QB'],
          rosamistica: flower,
          tamanio: data[i]['CM'],
          tallos: data[i]['TALLOS'],
          totaltallos: data[i]['T/TALLOS'],
          preciovent: data[i]['PRECIO VENTA'],
          preciocomp: data[i]['PRECIO COMPRA'],
          carga: delivery,
          status: status,
          line: i
        }
        data[i]['HB/QB'] > 0 ? this.hbqb = data[i]['HB/QB'] : '';
        this.items.push(item);
        this.total += item.totaltallos;
      }

      this.items.sort(function (a, b) {
        if (a.line > b.line) {
          return 1;
        }
        if (a.line < b.line) {
          return -1;
        }
        return 0;
      });

      this.spinner.hide();
      this.utilService.isLoading.next(false);
      this.messageService.add({ severity: 'success', summary: 'Rosa Mística', detail: 'Archivo cargado satisfactoriamente' });

    };

    this.files.push(target.files[0]);
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


  deleteAttachment(index) {
    this.files.splice(index, 1);
    this.items = [];
    this.estado = false;
    this.smsvalidate = "";
    this.validate = false;
    this.total = 0;
  }


  async presend() {

    let objects: Array<{
      nombres: String,
      code: Number,
      isSelected: Boolean
    }> = []


    this.clients = []
    this.utilService.isLoading.next(true)
    await Promise.all(this.items.map(async (item) => {
      objects.push({
        nombres: item.cliente.nombres,
        code: item.cliente.entiId,
        isSelected: true
      })
    })
    );
    this.utilService.isLoading.next(false)
    let clientstemporal: any = await this.eliminaPersonasDuplicadas(objects)
    this.clients = clientstemporal
    this.arraycodes = []
    await this.clients.forEach(async (element) => {
      this.arraycodes.push(element.code)
    });
    this.dialogVisibleClients = true

  }

  send() {
    this.dialogVisibleClients = false
    let head: Cabecera = {
      fecha: this.getFormatDate(new Date()),
      usuaId: this.user.usuaid,
      pralCerrado: "N",
      estado: "T",
      pralId: this.idPrealert == undefined ? 0 : this.idPrealert
    }

    let detail: Array<Detail> = [];
    let contador = 0;
    let totaltallos = 0;
    let totalcajas = 0;
    this.items.forEach(data => {
      detail.push({
        line: contador,
        shippingdate: this.getFormatDate(new Date(data.fecha)),
        clieId: data.cliente.entiId,
        fincapropia: data.fincapropia == 'N' ? "N" : "S",
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
      data.HBBQ == null ? '' : totalcajas += parseInt(data.HBBQ);
      totaltallos += parseInt(data.totaltallos + "");
    })


    this.prealert = {
      prealerta: head,
      lstdist: this.createstringcodes(this.arraycodes),
      detalle: detail
    }



    let prealertfinal = {
      prealerta: head,
      lstdist: this.createstringcodes(this.arraycodes),
      detalle: detail
    }

    if (!this.editPrealert && this.pralId != "") {
      this.prealert.prealerta.pralId = parseInt(this.pralId)
    }

    this.confirmationService.confirm({
      message: "Are you sure to send the prealert?",
      accept: async () => {
        this.spinner.show();
        await this.api.registerPrealert(prealertfinal, localStorage.getItem("token")).then(data => {
          this.spinner.hide();
          if (data.headerApp.code == 200) {
            this.prealertdraft();
            this.dialogVisible = true;
            this.total = 0;
            this.idPrealert = 0;
            this.pralId = "";
            this.prealert = null;
            this.editPrealert = false;
            this.items = [];
            this.files = [];
            this.prealertForm.get('fecha').setValue(new Date());
            this.messageService.add({ severity: 'success', summary: 'Rosa Mística', detail: 'La prealerta se ha registrado correctamente' });
            let item: any[] = [];
            data.data.prealert.files.forEach(element => {
              item.push(environment.url + element.pdf);
            });
            this.response = {
              files: item,
              pdf: environment.url + data.data.prealert.pdf,
              pralId: data.data.prealert.pralId,
              totaltallos: totaltallos,
              totalcajas: totalcajas,
              numregi: contador
            }
          }
        }).catch(err => {

          if (err.error.code == 401) {
            localStorage.clear();
            this.router.navigate(['/login']);
          }
        })
        this.utilService.isLoading.next(false);
      },
    });
  }

  async getStatusObject(name: string): Promise<any> {
    let status: Status = null;
    await this.status.filter(state => {
      if (state.nombre.toUpperCase() == name.toUpperCase()) {
        status = state;
      }
    });
    return status;
  }

  async getStatus(nombre: string) {
    await this.api.getstatusprealert(localStorage.getItem("token")).then(status => {
      if (status.headerApp.code === 200) {
        status.data.estados.forEach(element => {
          if (element.nombre == nombre) {
            this.tempStatus = element;
            return;
          }
        });
      }
    }).catch(err => {

      if (err.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    })
  }



  async getServicios() {
    this.utilService.isLoading.next(true);
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


    this.utilService.isLoading.next(false);
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

  remove(cantidad: Numeros) {
    this.cantidadPrice = this.cantidadPrice.filter(numero => numero != cantidad);
  }

  getFormatDate(date: Date): string {
    return (moment(date)).format('yyyy-MM-DD HH:mm:ss.SSS');
  }

  calculate() {
    this.prealertForm.get('totaltallos').setValue((this.prealertForm.get('HBBQ').value == null || this.prealertForm.get('HBBQ').value == 0 ? this.hbqb : this.prealertForm.get('HBBQ').value) * this.prealertForm.get('tallos').value)
  }

  next() {
    this.step = 2;
    this.editPrealert = false;
  }

  finish(draft: Draft) {
  }

  back() {
    this.step = 1;
    this.prealertdraft();
    this.editPrealert = false;
    this.items = [];
    this.total = 0;
    this.idPrealert = 0;
  }

  async viewdraft(draft: Draft) {

    let head: Cabecera = {
      fecha: this.getFormatDate(new Date()),
      usuaId: this.user.usuaid,
      pralCerrado: "N",
      estado: "B",
      pralId: draft.head.pralId
    }

    let detail: Array<any> = [];
    this.utilService.isLoading.next(true);
    for (const clie of draft.clients) {
      for (const item of clie.items) {
        const cliente = await this.getClientbyName(clie.info.nombres);
        const finca = await this.getFincabyName(item.farm);
        const marca = await this.getMarcbyName(clie.info.clieId, item.mark);
        const rosamistica = await this.getFlowerbyName(item.flower);
        const carga = await this.getEmpresaCargabyName(item.cargname);

        await this.getStatus(item.status);
        let temp = {
          line: item['line'],
          shippingdate: item.shippingdate + '.00',
          clieId: cliente.entiId,
          fincapropia: item.fincapropia,
          farmId: finca.entiId,
          marcId: marca.marcId,
          hbqb: item.hbqb,
          florId: rosamistica.florId,
          cm: item.cm,
          tallos: item.tallos,
          totaltallos: item.totaltallos,
          pcomp: item.pcomp,
          cargcompId: carga.entiId,
          pvp: item.pvp,
          status: item.status
        }
        detail.push(temp);
      }
    }

    this.utilService.isLoading.next(false);

    let prealert = {
      prealerta: head,
      detalle: detail
    }

    this.utilService.isLoading.next(true);
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
    this.utilService.isLoading.next(false);

  }

  viewxlsx() {
    let head: Cabecera = {
      fecha: this.getFormatDate(new Date()),
      usuaId: this.user.usuaid,
      pralCerrado: "N",
      estado: "B",
      pralId: this.idPrealert == undefined ? 0 : this.idPrealert
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

    this.prealert = {
      prealerta: head,
      lstdist: "",
      detalle: detail
    }

    this.utilService.isLoading.next(true);
    this.api.getExcelPrealertDraft(this.prealert, localStorage.getItem('token')).then((data) => {
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
    this.utilService.isLoading.next(false);



  }


  async edit(draft: Draft) {
  
    this.editPrealert = true;
    this.optionSelect = 'manual';
    this.step = 2;
    this.items = [];
    this.idPrealert = draft.head.pralId;
    this.spinner.show();
    this.utilService.isLoading.next(true);
    this.total = 0;
    //Validamos el DRAFT
    await Promise.all(draft.clients.map(async (client) => {
      await Promise.all(client.items.map(async (item) => {
        const cliente = await this.getClientbyName(client.info.nombres);
        const finca = await this.getFincabyName(item.farm);
        const marca = await this.getMarcbyName(client.info.clieId, item.mark);
        const rosamistica = await this.getFlowerbyName(item.flower);
        const carga = await this.getEmpresaCargabyName(item.cargname);
        await this.getStatus(item.status);

        let temp = {
          fecha: item.shippingdate,
          cliente: cliente,
          fincapropia: item.fincapropia == 'N' ? "N" : "S",
          finca: finca,
          marca: marca,
          HBBQ: item.hbqb.toString(),
          rosamistica: rosamistica,
          tamanio: item.cm,
          tallos: item.tallos,
          totaltallos: item.tallos * (item.hbqb == null || item.hbqb == 0 ? this.hbqb : item.hbqb),
          preciovent: item.pvp,
          preciocomp: item.pcomp,
          carga: carga,
          status: this.tempStatus,
          line: item.line
        }

        item.hbqb != null && item.hbqb > 0 ? this.hbqb = item.hbqb : '';
        this.total += temp.totaltallos;
        this.items.push(temp);
      })
      );
    })
    );

   
    this.items.sort(function (a, b) {
      if (a.line > b.line) {
        return 1;
      }
      if (a.line < b.line) {
        return -1;
      }
      return 0;
    });

    this.utilService.isLoading.next(false);
    this.spinner.hide();

  }

  async saveeraser() {
    let head: Cabecera = {
      fecha: this.getFormatDate(new Date()),
      usuaId: this.user.usuaid,
      pralCerrado: "N",
      estado: "B",
      pralId: this.idPrealert == undefined ? 0 : this.idPrealert
    }

    let detail: Array<Detail> = [];
    let contador = 0;
    let totaltallos = 0;
    let totalcajas = 0;
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
      data.HBBQ == null ? '' : totalcajas += parseInt(data.HBBQ);
      totaltallos += parseInt(data.totaltallos + "");
    })

    this.prealert = {
      prealerta: head,
      lstdist: "",
      detalle: detail
    }   
    
    if (!this.editPrealert && this.pralId != "") {
      this.prealert.prealerta.pralId = parseInt(this.pralId)
    }

    this.spinner.show();
    await this.api.registerPrealert(this.prealert, localStorage.getItem("token")).then(async (data) => {
      this.spinner.hide();
      if (data.headerApp.code == 200) {
        /*this.total = 0;
        this.prealert = null;
        this.items = [];
        this.files = [];
        this.idPrealert = 0;
        this.optionSelect == 'manual';
        this.step = 1;*/
        await this.prealertdraft();
        this.pralId = data.data.prealert.pralId;
        this.step = 2;
        //this.prealertForm.get('fecha').setValue(new Date());
        this.messageService.add({ severity: 'success', summary: 'Rosa Mística', detail: 'La prealerta se ha guardado como borrador' });
      }
    }).catch(err => {
      if (err.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    })
    this.utilService.isLoading.next(false);
  }


  editrow(item: any) {
    this.editvisible = true;
    this.activeitembyedit = { ...item };
  }


  eliminaPersonasDuplicadas = (data) => {
    const clients = data.map(clie => {
      return [clie.nombres, clie]
    });
    return [...new Map(clients).values()];
  }

  createstringcodes = (array) => {
    let codearray = ""
    array.forEach(code => {
      codearray += "[" + code + "]"
    })
    return codearray
  }




  get f() {
    return this.prealertForm.controls;
  }



}
