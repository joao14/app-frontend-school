import { Component, OnInit } from '@angular/core';
import { ApisService } from 'src/services/apis.service';
import { client } from 'src/models/client';
import { Router } from '@angular/router';
import { MessageService, ConfirmationService } from 'primeng';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export interface Factura {
  id: number;
  number: string;
  valor: number;
}

@Component({
  selector: 'app-pagoreclamo',
  templateUrl: './pagoreclamo.component.html',
  styleUrls: ['./pagoreclamo.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class PagoreclamoComponent implements OnInit {

  clientes: Array<client> = [];
  facturas: Array<Factura> = [];
  tipodocumentos: any[] = [];
  selectclient: client;
  selectfactura: Factura;
  client: client;
  factura: Factura;
  files: File[] = [];
  formGroup: FormGroup;
  submit = false;

  constructor(private api: ApisService, private router: Router, private formBuilder: FormBuilder,
    private messageService: MessageService,) {
    this.formGroup = this.formBuilder.group({
      cliente: [null,Validators.required],
      tipodocumento: ['',Validators.required],
      numfactura: [null, Validators.required],
      valor: [null, [Validators.required]],
      fecha: [null, [Validators.required]],
      numdocumento: [null, Validators.required],
      descripcion: ['', Validators.required]
    });
  }



  ngOnInit(): void {
    this.selectclient = null;
    this.tipodocumentos = [
      { name: 'Claim', code: 'Claim' },
      { name: 'Payment', code: 'Payment' },
      { name: 'Debit', code: 'Debit' },
    ]
    this.getClient();
  }

  onOptionsSelectedFactura() {
    this.selectfactura = this.formGroup.get('numfactura').value;
  }

  onOptionsSelected() {
    this.facturas = [];
    this.facturas.push(
      { id: 1, number: '12854-3652-8500001', valor: 52.63 },
      { id: 2, number: '12854-3652-8500002', valor: 18.63 },
      { id: 3, number: '12854-3652-8500003', valor: 22.02 },
      { id: 4, number: '12854-3652-8500004', valor: 13.13 },
      { id: 5, number: '12854-3652-8500005', valor: 118.52 },
      { id: 6, number: '12854-3652-8500006', valor: 49.35 }
    );

    console.log('FACTURAS');
    console.log(this.facturas);
    console.log('CLIENTE SELECCIONADO');
    console.log(this.formGroup.get('cliente').value);
    this.selectclient = this.formGroup.get('cliente').value;
    console.log('DATA');
    console.log(this.selectclient);


  }

  getClient() {
    this.api.getclients(localStorage.getItem("token")).then(cliente => {
      this.clientes = [];
      if (cliente.headerApp.code === 200) {
        cliente.data.clientes.forEach(cliente => {
          if (cliente.estado == 'A') {
            this.clientes.push(cliente);
          }
        });
        console.log('CLIENTES??');
        console.log(this.clientes);
        console.log('FIN**');

      }

    }).catch(err => {
      console.log(err);
      if (err.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    })

  }

  onSelect(event) {
    this.files.push(...event.addedFiles);
    console.log('LISTA FINAL DE DOCUMENTOS');
    console.log(this.files);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
    console.log('REMOVE');
    console.log(this.files);
  }

  save() {
    console.log('Enviando');
    this.submit = true;
    if (this.formGroup.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Rosa Mística', detail: 'Los campos son obligatorios' });
      return;
    }
    console.log('Bien...');


  }

  get f() {
    return this.formGroup.controls;
  }

}
