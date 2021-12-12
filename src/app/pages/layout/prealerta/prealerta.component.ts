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



@Component({
  selector: 'app-prealerta',
  templateUrl: './prealerta.component.html',
  styleUrls: ['./prealerta.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class PrealertaComponent implements OnInit {
  
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


  expanded: boolean;
  total: number;
  validate: boolean;
  smsvalidate: string;
  dialogVisible: boolean;
  response: Response;
  step: number;
  url: string;
  dialogVisiblePDF: boolean;
  editPrealert: boolean;
  idPrealert: number;
  minDateValue: Date = new Date();
  hbqb: number;
  editvisible: boolean = false;

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
    await this.inicializate();
    await this.getServicios();
  }


  inicializate() {

  }



  save(){

  }


  selectOption(texto: string) {
    this.submitted = false;
    this.prealertForm.reset();
    this.optionSelect = texto;
    this.files = [];
   
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
    
    this.utilService.isLoading.next(false)
    let clientstemporal: any = ""
    this.clients = clientstemporal
    this.arraycodes = []
    await this.clients.forEach(async (element) => {
      this.arraycodes.push(element.code)
    });
    this.dialogVisibleClients = true

  }

  send() {
    this.dialogVisibleClients = false
    /*let head: Cabecera = {
      fecha: this.getFormatDate(new Date()),
      //usuaId: this.user.usuaid,
      pralCerrado: "N",
      estado: "T",
      pralId: this.idPrealert == undefined ? 0 : this.idPrealert
    }*/

    
  }

  async getStatusObject(name: string): Promise<any> {
    /*let status: Status = null;
    await this.status.filter(state => {
      if (state.nombre.toUpperCase() == name.toUpperCase()) {
        status = state;
      }
    });
    return status;*/
  }

  async getStatus(nombre: string) {
    /*await this.api.getstatusprealert(localStorage.getItem("token")).then(status => {
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
    })*/
  }



  async getServicios() {
    this.utilService.isLoading.next(true);
    this.clientes = [];
    /*await this.api.getclients(localStorage.getItem("token")).then(cliente => {
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
    })*/
    this.utilService.isLoading.next(false);
  }


  


  add() {

    

  }

  remove(cantidad: any) {
    
  }

  getFormatDate(date: Date): string {
    return (moment(date)).format('yyyy-MM-DD HH:mm:ss.SSS');
  }




  async edit(draft: any) {
  
  
  }





  get f() {
    return this.prealertForm.controls;
  }



}
