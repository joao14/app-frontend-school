import { Component, OnInit, ViewChild } from '@angular/core';
import { client } from 'src/models/client';
import { ApisService } from 'src/services/apis.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, DialogService, DynamicDialogRef, Table } from 'primeng';
import * as moment from 'moment';
/*import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable'

interface jsPDFWithPlugin extends jsPDF{
  autoTable:(options: UserOptions) => jsPDF;
}*/
/*import * as faker from 'faker';
declare var jsPDF: any;*/

import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { TranslateService } from '@ngx-translate/core';


export interface Document {
  numDocument: string;
  tipoDocument: string;
  fecha: Date;
  debito: number;
  credito: number;
  saldo: number;
}

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css'],
  providers: [MessageService, ConfirmationService, DialogService, TranslateService],
})
export class BalanceComponent implements OnInit {

  selectClient: client;
  date: Date;
  filterMobile: Date;
  clientes: Array<client> = [];
  documentos: Array<Document> = [];
  cols: any[];
  exportColumns: any[];
  totalcredito: number;
  totaldebito: number;
  total: number;
  saldoinicial: number;
  ref: DynamicDialogRef;
  dialogVisible: boolean;
  selectDocument: Document;
  numDocument: string;

  constructor(private api: ApisService, private router: Router, public dialogService: DialogService,private messageService: MessageService) { }

  ngOnInit(): void {
    this.numDocument="";
    this.dialogVisible = false;
    this.date=new Date();
    this.total = 0;
    this.totalcredito = 0;
    this.totaldebito = 0;
    this.saldoinicial = 0;
    this.cols = [
      { field: 'documento', header: 'Documento' },
      { field: 'tipo documento', header: 'Tipo Documento' },
      { field: 'fecha', header: 'Fecha' },
      { field: 'debito', header: 'Débito' },
      { field: 'credito', header: 'Crédito' },
      { field: 'saldo', header: 'Saldo' }
    ];

    this.exportColumns = this.cols.map(col => ({ title: col.header, dataKey: col.field }));
    this.getClient();
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

  onDateSelect(event) {
    console.log('Seleccionar');
    console.log(event);
    //Debe volver a consultar
    console.log(this.documentos);
    console.log('TEST');
    this.documentos = this.documentos.filter(documento => this.getFormatDate(documento.fecha) == this.getFormatDate(event));
    console.log('RESULTADO FINAL');
    console.log(this.documentos);
  }

  close(){
    console.log('Cerrar..');
    this.total = 0;
    this.totalcredito = 0;
    this.totaldebito = 0;
    this.documentos = [];
    for (var i = 1; i < 20; i++) {
      let documento = {
        numDocument: 'Document ' + i,
        tipoDocument: 'Variable ' + i,
        fecha: new Date(),
        debito: i * 2.2,
        credito: i * 3.6,
        saldo: i * 3.2
      }
      this.documentos.push(documento);
      this.totalcredito += documento.credito;
      this.totaldebito += documento.debito;
      this.total += documento.saldo;
    }
    this.saldoinicial = this.total * this.totalcredito;
  }

  consultar() {
    console.log('Consultar..');
    console.log(this.selectClient);
    console.log(this.date);
    this.total = 0;
    this.totalcredito = 0;
    this.totaldebito = 0;
    this.documentos = [];
    for (var i = 1; i < 20; i++) {
      let documento = {
        numDocument: 'Document ' + i,
        tipoDocument: 'Variable ' + i,
        fecha: new Date(),
        debito: i * 2.2,
        credito: i * 3.6,
        saldo: i * 3.2
      }
      this.documentos.push(documento);
      this.totalcredito += documento.credito;
      this.totaldebito += documento.debito;
      this.total += documento.saldo;
    }
    this.saldoinicial = this.total * this.totalcredito;
  }


  exportPdf() {
    /*var doc = new jsPDF('p','pt','a4');

    doc.setFontSize(18);
    doc.text('With content', 14, 22);
    doc.setFontSize(11);
    doc.setTextColor(100);

    // jsPDF 1.4+ uses getWidth, <1.4 uses .width
    /*var pageSize = doc.internal.pageSize;
    var pageWidth = pageSize.width ? pageSize.width : pageSize.getWidth();
    var text = doc.splitTextToSize(faker.lorem.sentence(45), pageWidth - 35, {});
    doc.text(text, 14, 30);*/

    /*(doc as any).autoTable({
      head: this.cols,
      body: this.documentos,
      them: 'plain'
    });

    //doc.text(text, 14, doc.autoTable.previous.finalY + 10);

     // Open PDF document in new tab
     doc.output('dataurlnewwindow')

     // Download PDF document  
     doc.save('table.pdf');
    /*let doc: any = new jsPDF('l', 'pt');
    doc.autoTable(this.cols, this.documentos)
    doc.save('table.pdf')*/
    /*var doc= new jsPDF();   
    doc.autoTable(this.cols,this.documentos,{ startY: 10 });
    doc.save("Inici.pdf");*/
    /*const doc = new jsPDF.default(0, 0);
    doc.autoTable(this.exportColumns, this.documentos);
    doc.save('balance_export_' + new Date().getTime() + '.pdf');*/
    //var doc = new jsPDF.default('p','pt');
    //const doc = new jspdf('p','px','a4') as jsPDFWithPlugin;
    /*doc.autoTable(
      head: [['Name','Hola','apellidos']], 
      body:[
        ['ojo','cien','123'],
        ['ojo','cien','123']
      ]);

    doc.save('table.pdf')*/

    /*autoTable(this.cols, this.documentos);
    doc.save('balance_export_' + new Date().getTime() + '.pdf');*/
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

  view(document: Document) {
    console.log('Esta es la interface');
    console.log(document);
    this.selectDocument = document;
    this.dialogVisible = true;
  }

  getFormatDate(date: Date): string {
    return (moment(date)).format('DD-MMM-YYYY');
  }

  consultarMobile(){
    console.log('Consultando las facturas..');
    console.log(this.filterMobile);
    console.log(this.numDocument);
    if(this.filterMobile == undefined && this.numDocument == ""){
      this.messageService.add({severity:'error', summary:'Rosa Mística', detail:'Debe ingresar datos en el filtro de consulta.'});
      return;
    }
    //Llamamos nuevamente a la api de consulta

  }

}
