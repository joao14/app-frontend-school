import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng';
import * as XLSX from "xlsx";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApisService } from 'src/services/apis.service';
import { Flower } from '../crm/flores/flores.component';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { client } from 'src/models/client';
import { finca } from 'src/models/finca';
import { flower } from 'src/models/flower';
import { delivery } from 'src/models/delivery';
import { mark } from 'src/models/mark';

export interface Item {
  cliente: client;
  finca: finca;
  marca: string;
  HBBQ: string;
  rosamistica: flower;
  tamanio: string;
  caja: number;
  tallos: number;
  precio: number;
  carga: string;
  status: string;
}

export interface Prealert {
  items: Item[];
  cajas: number;
  tallos: number;
}

@Component({
  selector: 'app-prealerta',
  templateUrl: './prealerta.component.html',
  styleUrls: ['./prealerta.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class PrealertaComponent implements OnInit {

  item: Item;
  items: Item[] = [];
  lista: Item[] = [];
  prealert: Prealert;
  expanded: boolean;
  selectrow: Item;
  status: any[] = [];
  optionSelect: string;
  files: any = [];
  selectitem: number;
  prealertForm: FormGroup;
  submitted = false;
  flores: Array<Flower> = [];
  fincas: Array<finca> = [];
  clientes: Array<client> = [];
  deliveries: Array<delivery>=[];
  marks: Array<mark>=[];
  selectClient: client;

  test: string[] = [];

  constructor(private messageService: MessageService, private formBuilder: FormBuilder, private confirmationService: ConfirmationService,
    private api: ApisService, private router: Router) {
    this.prealertForm = this.formBuilder.group({
      cliente: ['', Validators.required],
      finca: ['', Validators.required],
      marca: ['', Validators.required],
      HBBQ: ['', [Validators.required]],
      rosamistica: ['', [Validators.required]],
      tamanio: ['', Validators.required],
      caja: ['', Validators.required],
      tallos: ['', Validators.required],
      precio: ['', Validators.required],
      carga: ['', Validators.required],
      estado: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.inicializate();
    this.getServicios();

  }

  inicializate() {
    this.selectitem = -1;
    this.expanded = false;
    this.item = {
      cliente: null,
      finca: null,
      marca: "",
      HBBQ: "",
      rosamistica: "",
      tamanio: "",
      caja: 0,
      tallos: 0,
      precio: 0,
      carga: "",
      status: ""
    }

    this.prealert = {
      items: null,
      tallos: 0,
      cajas: 0
    }

    this.items = [];

    this.status = [
      { name: "Fixed", code: "Fixed" },
      { name: "Confirmed", code: "Confirmed" }];

    this.optionSelect = "manual";
  }

  deleteItem(prealert: any) {
    this.prealert.cajas = 0;
    this.prealert.tallos = 0;
    this.prealert.items = this.items;
    this.items = this.items.filter((element) => element != prealert);
    this.items.forEach(item => {
      this.prealert.cajas += parseInt(item.caja + "");
      this.prealert.tallos += parseInt(item.tallos + "");
    });

  }

  save() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.prealertForm.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Rosa Mística', detail: 'Los campos son obligatorios' });
      return;
    }

    this.item = {
      cliente: this.prealertForm.get('cliente').value,
      finca: this.prealertForm.get('finca').value,
      marca: this.prealertForm.get('marca').value,
      HBBQ: this.prealertForm.get('HBBQ').value,
      rosamistica: this.prealertForm.get('rosamistica').value,
      tamanio: this.prealertForm.get('tamanio').value,
      caja: this.prealertForm.get('caja').value,
      tallos: this.prealertForm.get('tallos').value,
      precio: this.prealertForm.get('precio').value,
      carga: this.prealertForm.get('carga').value,
      status: this.prealertForm.get('estado').value.code
    }

    this.items.push(this.item);
    this.prealert.cajas = 0;
    this.prealert.tallos = 0;
    this.prealert.items = this.items;
    this.items.forEach(item => {
      this.prealert.cajas += parseInt(item.caja + "");
      this.prealert.tallos += parseInt(item.tallos + "");
    });

    this.submitted = false;
    this.prealertForm.reset();
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
      items: null,
      tallos: 0,
      cajas: 0
    }
  }

  uploadFile(event) {
    console.log("UPLOAD");
    console.log(event);
    const target: DataTransfer = <DataTransfer>event.target;
    console.log(target);
    console.log("NEXT ANALISIS");
    if (target.files.length !== 1) {
      throw new Error("Cannot use multiple files");
    }
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(target.files[0]);
    this.items = [];

    reader.onload = (e: any) => {
      /* create workbook */
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: "binary" });
      /* selected the first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      /* save data */
      const data = XLSX.utils.sheet_to_json(ws, { raw: true }); // to get 2d array pass 2nd parameter as object {header: 1}
      console.log(data); // Data will be logged in array format containing objects

      data.forEach(element => {
        let item = {
          cliente: element['CLIENTE'],
          finca: element['FINCA'],
          marca: element['MARCACION'],
          HBBQ: element['HB/QB'],
          rosamistica: element['VARIEDAD'],
          tamanio: element['T/TALLOS'],
          caja: element['CM'],
          tallos: element['TALLOS'],
          precio: element['PRECIO COMPRA'],
          carga: element['CARGUERA'],
          status: element['STATUS']
        }
        this.items.push(item);
        this.prealert.cajas = 0;
        this.prealert.tallos = 0;
        this.prealert.items = this.items;
        this.items.forEach(item => {
          this.prealert.cajas += parseInt(item.caja + "");
          this.prealert.tallos += parseInt(item.tallos + "");
        });

      });

      console.log("ARRAY DE LISTA");
      console.log(this.items);
    };

    this.files.push(target.files[0]);
  }

  deleteAttachment(index) {
    this.files.splice(index, 1);
    this.items = [];
    this.prealert.cajas = 0;
    this.prealert.tallos = 0;
  }

  get f() {
    return this.prealertForm.controls;
  }


  send() {
    this.confirmationService.confirm({
      message: "Are you sure to send the prealert?",
      accept: () => {
        //Actual logic to perform a confirmation
        console.log('Esta todo bien..');

      },
    });
  }
  


  getServicios() {
    this.api.getclients(localStorage.getItem("token")).then(cliente => {
      if (cliente.headerApp.code === 200) {
        this.clientes = cliente.data.clientes;
      }

    }).catch(err => {
      console.log(err);
      if (err.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    })

    this.api.getfinca(localStorage.getItem("token")).then(finca => {
      if (finca.headerApp.code === 200) {
        this.fincas = finca.data.farms;
      }

    }).catch(err => {
      console.log(err);
      if (err.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    })

    this.api.getflowers(localStorage.getItem("token")).then(flor => {
      if (flor.headerApp.code === 200) {
        this.flores = flor.data.flowers;
      }
    }).catch(err => {
      console.log(err);
      if (err.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    })

    this.api.getdeliveries(localStorage.getItem("token")).then(delivery => {
      if (delivery.headerApp.code === 200) {
        this.deliveries = delivery.data.cargocompanies;
      }
    }).catch(err => {
      console.log(err);
      if (err.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    })
  }

  onOptionsSelected() {
    console.log('Consultando las marcas de los clientes');
    console.log(this.prealertForm.get('cliente'));    this.marks=[];
    this.api.getmarks(this.prealertForm.get('cliente').value.entiId, localStorage.getItem("token")).then(mark => {
      console.log(mark);
      if (mark.headerApp.code == 200) {
        this.marks = mark.data.marks;
        console.log('MARCAS..');
        console.log(this.marks);
        
      }
    }).catch(err => {
      console.log(err);
      if (err.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    })
  }


}
