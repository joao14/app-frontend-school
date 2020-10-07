import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng';
import * as XLSX from "xlsx";

export interface Item {
  embarque: string;
  HBBQ: string;
  cliente: string;
  rosamistica: string;
  finca: string;
  marca: string;
  freightforwader: string;
  variedad: string;
  CM: string;
  tallos: string;
  total: string;
  compra: string;
  venta: string;
  status: string;
}

export interface Prealert {
  items: Item[];
  total: number;
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

  constructor() { }

  ngOnInit(): void {
    this.inicializate()
  }

  inicializate() {
    this.expanded = false;
    this.item = {
      embarque: "",
      HBBQ: "",
      cliente: "",
      rosamistica: "",
      finca: "",
      marca: "",
      freightforwader: "",
      variedad: "",
      CM: "",
      tallos: "",
      total: "",
      compra: "",
      venta: "",
      status: ""
    }

    this.prealert = {
      items: null,
      tallos: 0,
      total: 0
    }

    this.items = [];

    this.status = [
      { name: "Fixed", code: "Fixed" },
      { name: "Confirmed", code: "Confirmed" }];

    this.optionSelect = "manual";
  }

  deleteItem(prealert: any) {
    console.log('PREALERTA');
    console.log(prealert);
    this.prealert.total = 0;
    this.prealert.tallos = 0;
    this.prealert.items = this.items;
    this.items = this.items.filter((element) => element != prealert);
    this.items.forEach(item => {
      this.prealert.total += parseFloat(item.total);
      this.prealert.tallos += parseInt(item.tallos);
    });

  }

  save() {
    console.log('ARRAY HASTA EL MOMENTO');
    console.log(this.items);
    console.log('LONGITUD =[' + this.items.length + "]");
    console.log('Se agrega una nueva fila');
    console.log(this.item);
    this.items.push(this.item);
    console.log('ARRAY NEXT');
    console.log(this.items);
    console.log('LONGITUD PUSH =[ ' + this.items.length);

    this.prealert.total = 0;
    this.prealert.tallos = 0;
    this.prealert.items = this.items;
    this.items.forEach(item => {
      this.prealert.total += parseFloat(item.total);
      this.prealert.tallos += parseInt(item.tallos);
    });
    this.item = {
      embarque: "",
      HBBQ: "",
      cliente: "",
      rosamistica: "",
      finca: "",
      marca: "",
      freightforwader: "",
      variedad: "",
      CM: "",
      tallos: "",
      total: "",
      compra: "",
      venta: "",
      status: ""
    }
    console.log('PREALERTA FINAL');
    console.log(this.prealert);

  }

  rowexpasion(item: any) {
    console.log('ITEM');
    console.log(item);
    this.selectrow = item;
    if (this.expanded) {
      this.expanded = false;
    } else {
      this.expanded = true;
    }

  }

  selectOption(texto: string) {
    console.log('Opcion seleccionado');
    this.optionSelect = texto;
    this.items=[];
    this.prealert={
      items: null,
      tallos: 0,
      total: 0
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
    console.log("Este es el nombre");
    console.log(target.files[0].name);

    reader.onload = (e: any) => {
      /* create workbook */
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: "binary" });
      /* selected the first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      /* save data */
      const data = XLSX.utils.sheet_to_json(ws, { raw: true }); // to get 2d array pass 2nd parameter as object {header: 1}
      //console.log(data); // Data will be logged in array format containing objects

      /*for (var i = 7; i < data.length; i++) {
          if (data[i]["__EMPTY_2"] != undefined) {
              var floower_length = "";
              if (data[i]["__EMPTY_5"] != undefined) {
                  floower_length = "40";
              }
              if (data[i]["__EMPTY_6"] != undefined) {
                  floower_length = "50";
              }
              if (data[i]["__EMPTY_7"] != undefined) {
                  floower_length = "60";
              }
              if (data[i]["__EMPTY_8"] != undefined) {
                  floower_length = "70";
              }
              if (data[i]["__EMPTY_9"] != undefined) {
                  floower_length = "80";
              }
              if (data[i]["__EMPTY_10"] != undefined) {
                  floower_length = "90";
              }
              if (data[i]["__EMPTY_11"] != undefined) {
                  floower_length = "100";
              }
              if (data[i]["__EMPTY_12"] != undefined) {
                  floower_length = "110";
              }

              let item = {
                  pieza: data[i]["__EMPTY_1"],
                  farmacia: data[i]["__EMPTY_2"],
                  flor:
                      data[i][
                          "                                       ROSA MISTICA"
                      ],
                  baucher: data[i]["__EMPTY_13"],
                  claves: "",
                  tamanio: floower_length,
                  stems: data[i]["__EMPTY_13"],
                  price: data[i]["__EMPTY_14"],
                  subtotal: data[i]["__EMPTY_15"],
              };
              this.factura.tallos += item.stems;
              this.factura.total += item.subtotal;
              this.items.push(item);
          }
      }*/

      console.log("ARRAY DE LISTA");
      console.log(this.items);
    };

    this.files.push(target.files[0]);
  }

  deleteAttachment(index) {
    this.files.splice(index, 1);
    this.items = [];
    this.prealert.total = 0;
    this.prealert.tallos = 0;
  }

}
