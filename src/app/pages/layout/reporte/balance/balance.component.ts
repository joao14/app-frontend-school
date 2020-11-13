import { Component, OnInit, ViewChild } from '@angular/core';
import { client } from 'src/models/client';
import { ApisService } from 'src/services/apis.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService, DialogService, DynamicDialogRef, Table } from 'primeng';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { UtilService } from 'src/services/util.service';

export interface Invoice {
  tranId: string;
  fecha: string;
  tipo: string;
  monto: number;
  balance: number;
  numedocu: string;
  tipotran: string;
  documento: string;
}

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css'],
  providers: [MessageService, ConfirmationService, DialogService, TranslateService],
})
export class BalanceComponent implements OnInit {

  selectClient: client;
  clientes: Array<client> = [];
  dialogVisible: boolean;
  dateIni: Date = new Date();
  dateFin: Date = new Date();
  invoices: Array<Invoice> = [];
  url: string;
  numedocu: string;

  constructor(private api: ApisService, private router: Router, public dialogService: DialogService, private messageService: MessageService,
    private utilService: UtilService) { }

  ngOnInit(){
    this.dialogVisible = false;
    this.selectClient = null;
    this.getClient();
  }

  async getClient() {
    this.utilService.isLoading.next(true);
    this.clientes = [];
    await this.api.getclients(localStorage.getItem("token")).then(cliente => {
      console.log(cliente);
      let temp: client[] = [];
      if (cliente.headerApp.code === 200) {
        cliente.data.clientes.forEach(element => {
          if (element.cliente.estado == 'A') {
            temp.push(element.cliente);
          }
        });
      }
      this.clientes = temp;

    }).catch(err => {
      console.log(err);
      if (err.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    })
    this.utilService.isLoading.next(false);
  }

  onDateSelect(event) {
    console.log('Seleccionar');
    console.log(event);
    /*this.documentos = this.documentos.filter(documento => this.getFormatDate(documento.fecha) == this.getFormatDate(event));
    console.log('RESULTADO FINAL');
    console.log(this.documentos);*/
  }

  close() {
    console.log('Cerrar..');
    this.consultar();
  }

  async consultar() {
    this.utilService.isLoading.next(true);
    this.invoices=[];
    await this.api.getInvoicesbyClient(this.selectClient.entiId, this.getFormatDate(this.dateIni).replace(/-/g, ''), this.getFormatDate(this.dateFin).replace(/-/g, ''), localStorage.getItem("token")).then(data => {
      console.log(data);
      if (data.headerApp.code == 200) {
        this.invoices = data.data.transacciones;
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

  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.invoices);
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

  view(invoice: Invoice) {
    console.log('Seleccionar');
    this.url = 'https://addsoft-tech.com:8443/rmi/' + invoice.documento;
    console.log(this.url);
    this.numedocu= invoice.numedocu;
    this.dialogVisible = true;
  }

  getFormatDate(date: Date): string {
    return (moment(date)).format('YYYY-MM-DD');
  }

}
