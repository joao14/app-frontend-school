import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService, DialogService } from 'primeng';
import { TranslateService } from '@ngx-translate/core';
import { ApisService } from 'src/services/apis.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { client } from 'src/models/client';


export interface Document {
  tipoTransaccion: string;
  fechaTransaccion: Date;
  valor: number;
  numDocum: string;
  numFactura: string;
  descripcion: string;
}

@Component({
  selector: 'app-documento',
  templateUrl: './documento.component.html',
  styleUrls: ['./documento.component.css'],
  providers: [MessageService, ConfirmationService, DialogService, TranslateService],
})
export class DocumentoComponent implements OnInit {

  documentos: Array<Document> = [];
  clientes: Array<client>=[];
  selectDocument: Document;
  numDocument: string;
  date: Date;
  filterMobile: Date;
  dialogVisible: boolean;
  selectClient: client;

  constructor(private api: ApisService, private router: Router, public dialogService: DialogService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.date= new Date();   
    this.numDocument = "";
    this.filterMobile = new Date();
    this.getClient();
  }

  consultar() {
    console.log('Consultar..');
    this.documentos = [];
    for (var i = 1; i < 20; i++) {
      let documento = {
        tipoTransaccion: 'Document ' + i,
        fechaTransaccion: new Date(),
        valor: i * 2.2,
        numDocum: i + 'DOC',
        numFactura: i + 'FACT',
        descripcion: 'Descripcion ' + i
      }
      this.documentos.push(documento);
    }
  }

  onDateSelect(event) {
    console.log('Seleccionar');
    console.log(event);
    //Debe volver a consultar
    console.log(this.documentos);
    console.log('TEST');
    this.documentos = this.documentos.filter(documento => this.getFormatDate(documento.fechaTransaccion) == this.getFormatDate(event));
    console.log('RESULTADO FINAL');
    console.log(this.documentos);
  }

  getFormatDate(date: Date): string {
    return (moment(date)).format('DD-MMM-YYYY');
  }

  close() {
    console.log('Cerrar..');
    this.documentos = [];
    for (var i = 1; i < 20; i++) {
      let documento = {
        tipoTransaccion: 'Document ' + i,
        fechaTransaccion: new Date(),
        valor: i * 2.2,
        numDocum: 3 * i + 'DOC',
        numFactura: i * 5 + 'FACT',
        descripcion: 'Descripcion ' + i
      }
      this.documentos.push(documento);
    }
  }

  view(document: Document) {
    console.log('Esta es la interface');
    console.log(document);
    this.selectDocument = document;
    this.dialogVisible = true;
  }

  consultarMobile() {
    console.log('Consultando las facturas..');
    console.log(this.filterMobile);
    console.log(this.numDocument);
    if (this.filterMobile == undefined && this.numDocument == "") {
      this.messageService.add({ severity: 'error', summary: 'Rosa Mística', detail: 'Debe ingresar datos en el filtro de consulta.' });
      return;
    }
  }

  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.documentos);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "balance");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    import("file-saver").then(FileSaver => {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
    });
  }

  getClient() {
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
  }

}
