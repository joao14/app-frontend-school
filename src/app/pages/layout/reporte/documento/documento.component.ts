import { Component, OnInit } from '@angular/core';
import { MessageService, ConfirmationService, DialogService } from 'primeng';
import { TranslateService } from '@ngx-translate/core';
import { ApisService } from 'src/services/apis.service';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { client } from 'src/models/client';
import { NgxSpinnerService } from 'ngx-spinner';
import { UtilService } from 'src/services/util.service';


export interface Head {
  fecha: string;
  pdf: string;
  pralCerrado: string;
  pralId: number;
}

export interface Information {
  clieId: number;
  email: string;
  nombres: string;
  pdf: string;
}

export interface Item {
  /*pdf:string;
  nombreCliente: string;
  clieId: number;*/
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
} 
export interface Client {
  info: Information;
  items: Array<Item>;
}

export interface Report {
  clients: Array<Client>;
  head: Head;
}


@Component({
  selector: 'app-documento',
  templateUrl: './documento.component.html',
  styleUrls: ['./documento.component.css'],
  providers: [MessageService, ConfirmationService, DialogService, TranslateService],
})
export class DocumentoComponent implements OnInit {

  documentos: Array<Document> = [];
  clientes: Array<client> = [];
  selectDocument: Document;
  numDocument: string;
  date: Date;
  filterMobile: Date;
  dialogVisible: boolean;
  selectClient: client;
  prealerts: Array<Report> = [];
  url: string;
  titledialog: string;
  row: number;

  constructor(private api: ApisService, private router: Router, public dialogService: DialogService,
    private messageService: MessageService, private spinner: NgxSpinnerService, private utilService: UtilService) { }

  ngOnInit(): void {
    this.date = new Date();
    this.numDocument = "";
    this.filterMobile = new Date();
    this.getData();
  }

  async getData() {
    console.log('DATA...');
    
    this.utilService.isLoading.next(true);
    await this.api.getPrealertActive(localStorage.getItem("token")).then(data => {
      console.log(data);
      if (data.headerApp.code == 200) {
        this.prealerts = data.data.prealerts;
        console.log('Ejecutando...');
        console.log(this.prealerts);
      }
    }).catch(err => {
      if (err.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    })
    this.utilService.isLoading.next(false);

  }

  selectItem(information: Information) {
    this.url = 'https://addsoft-tech.com:8443/rmi/' + information.pdf;
    this.dialogVisible = true;
    this.titledialog = information.nombres;
  }

  sendEmail(information: Information) {
    console.log('Se enviara el correo electrónico');
    console.log(information.email);
  }

  sendGeneral(head: Head) {
    console.log('Se enviara el correo electrónico general');
    
  }

  downlaodTotal(head: Head) {
    this.url = 'https://addsoft-tech.com:8443/rmi/' + head.pdf;
    this.dialogVisible = true;
    this.titledialog = 'Prealerta ID [' + head.pralId+']'
  }

  consultar() {
    console.log('Consultar..');
    this.documentos = [];

  }

  onDateSelect(event) {
    console.log('Seleccionar');
    console.log(event);
    //Debe volver a consultar
    console.log(this.documentos);
    console.log('TEST');
    //this.documentos = this.documentos.filter(documento => this.getFormatDate(documento.fechaTransaccion) == this.getFormatDate(event));
    console.log('RESULTADO FINAL');
    console.log(this.documentos);
  }

  getFormatDate(date: Date): string {
    return (moment(date)).format('DD-MMM-YYYY');
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

  selectRow(info: Information){
    if(this.row==info.clieId){
      this.row=null;
    }else{
      this.row= info.clieId
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
