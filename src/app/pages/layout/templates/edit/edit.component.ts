import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService, SelectItem } from 'primeng';
import { user } from 'src/models/user';
import { ApisService } from 'src/services/apis.service';
import * as moment from 'moment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { flower } from 'src/models/flower';
import { finca } from 'src/models/finca';
import { client } from 'src/models/client';
import { delivery } from 'src/models/delivery';
import { UtilService } from 'src/services/util.service';

export interface Cabecera {
  tempId: string,
  fechcrea: string,
  nombre: string,
  estado: string,
  usuario: string,
  fechactu: string
}

export interface Detalle {
  deteId: string,
  tipoempaque: string,
  cantidadcajas: string,
  tallosxbch: string,
  medidatallo: string,
  cantidadbch: string,
  cantidad: string,
  preciounitario: string,
  total: string,
  farm: string,
  farmId: string,
  florId: string,
  flor: string,
  line: string
}

export interface Template {
  cabecera: Cabecera;
  detalle: Array<Detalle>
}

export interface Item {
  deteId: string;
  caja: string;
  pieza: string;
  finca: string;
  flor: string;
  numtallos: number;
  tamanio: string;
  totaltallos: number;
  stems: number;
  price: string;
  subtotal: string;
  line: number;
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [MessageService]
})
export class EditComponent implements OnInit {

  edit: boolean;
  template: Template;
  templateTemp: Template;
  options: SelectItem[];
  user: user;
  itemForm: FormGroup;
  items: Array<Item> = [];
  submitted: boolean;
  addrow: boolean;
  flores: Array<flower> = [];
  fincas: Array<finca> = [];
  clientes: Array<client> = [];
  deliveries: Array<delivery> = [];
  cajas: any[] = [];
  tamanios: any[];
  totcajas: number;
  tottallos: number;
  total: number;

  constructor(private api: ApisService, private router: Router, private utilService: UtilService,
    private formBuilder: FormBuilder, private messageService: MessageService) {
    this.itemForm = this.formBuilder.group({
      caja: [null],
      pieza: [''],
      finca: [null, Validators.required],
      flores: [null, [Validators.required]],
      stem: ['25', [Validators.required]],
      tamanio: [null, Validators.required],
      tallos: ['', Validators.required],
      totaltallos: ['', Validators.required],
      precio: ['', Validators.required],
      line: [null]
    });
    if (this.router.getCurrentNavigation().extras.state != null) {
      console.log("Editando..");
      this.templateTemp = JSON.parse(this.router.getCurrentNavigation().extras.state.template);
      this.edit = true;
    } else {
      console.log('Created');
      this.edit = false;
    }
    this.inicializateValores();
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.totcajas = 0;
    this.tottallos = 0;
    this.total = 0;
  }

  async inicializateValores() {

    let cabecera = {
      tempId: this.templateTemp != null ? this.templateTemp.cabecera['tempId'] : "",
      fechcrea: this.templateTemp != null ? this.templateTemp.cabecera['fechcrea'] : "",
      nombre: this.templateTemp != null ? this.templateTemp.cabecera['nombre'] : "",
      estado: this.templateTemp != null ? this.templateTemp.cabecera['estado'] == "A" ? "A" : "I" : "A",
      usuario: this.templateTemp != null ? this.templateTemp.cabecera['usuario'] : "",
      fechactu: this.templateTemp != null ? this.templateTemp.cabecera['fechactu'] : ""
    }
    let detalles: Detalle[] = [];
    if (this.templateTemp != null && this.templateTemp.detalle != null) {
      await this.templateTemp.detalle.forEach(async (element) => {
        console.log('ELEMENT');
        console.log(element);
        const finca = await this.getFincabyName(element.farm);
        const flower = await this.getFlowerbyName(element.flor);
        let item = {
          deteId: element.deteId,
          caja: this.getTypeBox(element.tipoempaque),
          pieza: element.cantidadcajas != null ? element.cantidadcajas : "",
          finca: finca,
          flor: flower,
          numtallos: parseInt(element.cantidadbch),
          tamanio: element.medidatallo,
          totaltallos: parseInt(element.cantidad),
          stems: parseInt(element.tallosxbch),
          price: element.preciounitario,
          subtotal: element.total,
          line: parseInt(element.line),
        }
        this.items.push(item);
        console.log('Items');
        console.log(this.items);
        element.cantidadcajas != null ? this.totcajas += parseInt(element.cantidadcajas) : 0;
        element.cantidad != null ? this.tottallos += parseInt(element.cantidad) : 0;
        element.total != null ? this.total += parseFloat(element.total) : 0;
      });

      this.items.sort(function (a, b) {
        if (a.line > b.line) {
          return 1;
        }
        if (a.line < b.line) {
          return -1;
        }
        return 0;
      });

    }

    this.template = {
      cabecera: cabecera,
      detalle: detalles
    };

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
    this.cajas = [
      { name: "HB", code: "HB" },
      { name: "QB", code: "QB" },
    ]


    this.options = [{ label: 'Activo', value: 'A' }, { label: 'Inactivo', value: 'I' }];

    await this.getServicios();
  }

  save() {
    console.log('..Guardando el template..');

    let head = {
      fechcrea: this.getFormatDate(new Date()),
      nombre: this.template.cabecera.nombre,
      estado: this.template.cabecera.estado,
      usuario: this.user.nickname
    }
    console.log('HEAD');
    console.log(head);

    this.api.addTemplateHead(head, localStorage.getItem('token')).then(data => {
      console.log(data);
      if (data.headerApp.code == 200) {
        console.log('Se guardo correctamente..');
        this.router.navigate(['template']);
      }

    }).catch(err => {
      console.log(err);
      if (err.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    })
  }

  /**
     * Function the search services client, flowers, deliveries, fincas
     */
  async getServicios() {
    await this.api.getclients(localStorage.getItem("token")).then(cliente => {
      this.clientes = [];
      if (cliente.headerApp.code === 200) {
        cliente.data.clientes.forEach(data => {
          if (data.cliente.estado == 'A') {
            this.clientes.push(data.cliente);
          }
        });
      }

    }).catch(err => {

      if (err.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    })

    await this.api.getfinca(localStorage.getItem("token")).then(finca => {
      this.fincas = [];
      if (finca.headerApp.code === 200) {
        finca.data.farms.forEach(finca => {
          if (finca.estado == 'A') {
            this.fincas.push(finca);
          }
        });
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


    await this.api.getdeliveries(localStorage.getItem("token")).then(delivery => {
      this.deliveries = [];
      if (delivery.headerApp.code === 200) {
        delivery.data.cargocompanies.forEach(delivery => {
          if (delivery.estado == 'A') {
            this.deliveries.push(delivery);
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

  calculate() {
    this.itemForm.get('totaltallos').setValue(this.itemForm.get('stem').value * this.itemForm.get('tallos').value);
  }

  modificar() {

  }

  cancelar() {
    this.router.navigate(['template']);
  }

  addItemm() {

  }

  add() {
    this.addrow = true;
  }

  async deleteItem(item: Item) {
    console.log('Eliminando el ITEM');
    console.log(item);
    await this.api.deleteTemplateDetalle(item.deteId, localStorage.getItem('token')).then(async (data) => {
      console.log(data);
      if (data.headerApp.code == 200) {
        this.totcajas = 0;
        this.tottallos = 0;
        this.total = 0;
        this.items = await this.items.filter((element) => element != item);
        this.items.forEach((item) => {
          console.log(item);
          console.log('Validacion');
          console.log(item.pieza);
          this.total += parseFloat(item.subtotal);
          this.tottallos += parseInt(item.totaltallos.toString());
          item.pieza != '' ? this.totcajas += parseInt(item.pieza) : '';
          console.log(this.total);
          console.log(this.tottallos);
          console.log(this.totcajas);
        });
        this.messageService.add({ severity: 'success', summary: 'Rosa Mística', detail: 'Eliminacion satisfactoria' });
      }
    }).catch(err => {
      console.log(err);
      if (err.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    })

  }

  async saverow() {
    this.submitted = true;
    if (this.itemForm.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Rosa Mística', detail: 'Los campos son obligatorios' });
      return;
    }
    let itemTemplate = {
      tempId: this.template.cabecera.tempId,
      tipoempaque: this.itemForm.get('caja').value != null ? this.itemForm.get('caja').value.name : '',
      cantidadcajas: this.itemForm.get('pieza').value != '' ? this.itemForm.get('pieza').value : '',
      tallosxbch: this.itemForm.get('stem').value,
      medidatallo: this.itemForm.get('tamanio').value.name,
      cantidadbch: this.itemForm.get('tallos').value,
      cantidad: this.itemForm.get('totaltallos').value,
      preciounitario: this.itemForm.get('precio').value,
      total: this.itemForm.get('totaltallos').value * this.itemForm.get('precio').value,
      farmId: this.itemForm.get('finca').value.entiId,
      florId: this.itemForm.get('flores').value.flor.florId,
      line: this.items.length > 0 ? (this.items[this.items.length - 1].line) + 1 : 0
    }
    console.log('Agregando nueva fila');
    console.log(itemTemplate);
    this.utilService.isLoading.next(true);
    await this.api.addTemplateDetaill(itemTemplate, localStorage.getItem('token')).then(data => {
      console.log(data);
      if (data.headerApp.code == 200) {
        this.itemForm.reset();
        this.submitted = false;
        this.addrow = false;
        this.messageService.add({ severity: 'success', summary: 'Rosa Mística', detail: 'Item guardado correctamente' });
        this.items.push({
          deteId: data.data.detatemp.deteId,
          caja: data.data.detatemp.tipoempaque,
          pieza: data.data.detatemp.cantidadcajas,
          finca: data.data.detatemp.farmId,
          flor: data.data.detatemp.florId,
          numtallos: data.data.detatemp.cantidadbch,
          tamanio: data.data.detatemp.medidatallo,
          totaltallos: data.data.detatemp.cantidad,
          stems: data.data.detatemp.tallosxbch,
          price: data.data.detatemp.preciounitario,
          subtotal: data.data.detatemp.total,
          line: data.data.detatemp.line
        })
        this.totcajas = 0;
        this.tottallos = 0;
        this.total = 0;
        this.items.forEach((item) => {
          this.total += parseFloat(item.subtotal);
          this.tottallos += parseInt(item.totaltallos.toString());
          item.pieza != '' ? this.totcajas += parseInt(item.pieza) : '';
        });
      } else {
        this.messageService.add({ severity: 'error', summary: 'Rosa Mística', detail: 'Salio algo mal, no se pudo guardar' });
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

  getTypeBox(name: string): any {
    let box: any;
    if (name == undefined) {
      box = { name: "HB", code: "HB" };
    } else {
      switch (name.trim()) {
        case 'HB':
          box = { name: "HB", code: "HB" };
          break;
        case 'QB':
          box = { name: "QB", code: "QB" };
          break;
        default:
          console.log('No se encuentra la domensión de la caja');
          break;
      }
    }
    return box;
  }

  cancelrow() {
    this.addrow = false;
    this.itemForm.reset();
    this.submitted = false;
  }

  getFormatDate(date: Date): string {
    return (moment(date)).format('yyyy-MM-DD HH:mm:ss.SSS');
  }

  get f() {
    return this.itemForm.controls;
  }

}
