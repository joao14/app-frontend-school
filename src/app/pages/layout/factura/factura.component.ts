import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import * as XLSX from 'xlsx';

export interface Item {
  pieza: string;
  farmacia: string;
  flor: string;
  baucher: number;
  claves: string;
  tamanio: string;
  stems: number;
  price: number;
  subtotal: number;
}

export interface Factura {
  client: string;
  city: string;
  mark: string;
  mawba: string;
  freightforwarder: string;
  bounch: string;
  address: string;
  items: Item[];
  tallos: number;
  total: number;
}

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css'],
  animations: [
    trigger('animation', [
      state('visible', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('void => *', [
        style({ transform: 'translateX(50%)', opacity: 0 }),
        animate('300ms ease-out')
      ]),
      transition('* => void', [
        animate(('250ms ease-in'), style({
          height: 0,
          opacity: 0,
          transform: 'translateX(50%)'
        }))
      ])
    ])
  ]
})
export class FacturaComponent implements OnInit {

  factura: Factura;
  flowers: string[];
  tamanios: string[];
  manual: boolean;
  automatico: boolean;
  items: Array<Item> = [];
  files: any = [];

  constructor() { }

  numero: number[];
  contador: number = 1;
  importContacts: string[] = [];

  ngOnInit(): void {
    console.log('Se esta convirtiendo la factutración');
    //this.numero.push(1); 
    this.inicilizate();
  }

  add() {
    console.log('Se agrega nuevos registros');
    this.contador++;
    console.log(this.contador);
    this.numero.push(this.contador);
  }

  search(event) {
    this.flowers = ['Alex', 'Barcelona', 'Buenos Aires', 'Bogota', 'Ecuador', 'Escudo', 'Loja'];
    console.log(this.flowers);
    console.log('Data de busqueda en el input');
    console.log(event);
    this.flowers = this.flowers.filter(data => data.toLocaleUpperCase().indexOf(event.query) > -1);
    console.log(this.flowers);
  }

  inicilizate() {
    this.manual = false;
    this.automatico = false;
    console.log('NEXT...');
    this.factura = {
      client: '',
      city: '',
      mark: '',
      mawba: '',
      freightforwarder: '',
      bounch: '',
      address: '',
      items: null,
      tallos:0,
      total: 0.00
    }
    this.tamanios = ['40', '50', '60', '70', '80', '90', '100', '110']
  }

  selectOptions(type: string) {
    console.log('Esto llega');
    console.log(type);
    if (type == 'manual') {
      this.manual = true
      this.automatico = false
    } else {
      this.automatico = true
      this.manual = false
    }

  }


  uploadFile(event) {
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(target.files[0]);

    reader.onload = (e: any) => {
      /* create workbook */
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });
      /* selected the first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      /* save data */
      const data = XLSX.utils.sheet_to_json(ws, { raw: true }); // to get 2d array pass 2nd parameter as object {header: 1}
      //console.log(data); // Data will be logged in array format containing objects
      //console.log('ARRAY DATA');
      for (var i = 7; i < data.length; i++) {
        if (data[i]['__EMPTY_2'] != undefined) {
          var floower_length = '';
          if (data[i]['__EMPTY_5'] != undefined) {
            floower_length = '40'
          }
          if (data[i]['__EMPTY_6'] != undefined) {
            floower_length = '50'
          }
          if (data[i]['__EMPTY_7'] != undefined) {
            floower_length = '60'
          }
          if (data[i]['__EMPTY_8'] != undefined) {
            floower_length = '70'
          }
          if (data[i]['__EMPTY_9'] != undefined) {
            floower_length = '80'
          }
          if (data[i]['__EMPTY_10'] != undefined) {
            floower_length = '90'
          }
          if (data[i]['__EMPTY_11'] != undefined) {
            floower_length = '100'
          }
          if (data[i]['__EMPTY_12'] != undefined) {
            floower_length = '110'
          }

          let item = {
            pieza: data[i]['__EMPTY_1'],
            farmacia: data[i]['__EMPTY_2'],
            flor: data[i]['                                       ROSA MISTICA'],
            baucher: data[i]['__EMPTY_13'],
            claves: '',
            tamanio: floower_length,
            stems: data[i]['__EMPTY_13'],
            price: data[i]['__EMPTY_14'],
            subtotal: data[i]['__EMPTY_15']
          }  
          this.factura.tallos += item.stems;        
          this.factura.total += item.subtotal;
          this.items.push(item);
        }
      }

      console.log('ARRAY DE LISTA');
      console.log(this.items);

    }

    this.files.push(target.files[0]);
  }


  deleteAttachment(index) {
    this.files.splice(index, 1)
    this.items=[]
  }

}
