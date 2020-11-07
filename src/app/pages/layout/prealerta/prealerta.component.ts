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
  marca: mark;
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
  deliveries: Array<delivery> = [];
  marks: Array<mark> = [];
  selectClient: client;
  tamanios: any[] = [];
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
      marca: null,
      HBBQ: "",
      rosamistica: null,
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

    this.tamanios = [
      { name: '40', code: '40' },
      { name: '50', code: '50' },
      { name: '60', code: '60' },
      { name: '70', code: '70' },
      { name: '80', code: '80' },
      { name: '90', code: '90' },
      { name: '100', code: '100' },
      { name: '110', code: '110' }
    ]

    this.optionSelect = "manual";

    console.log(this.tamanios);

  }


  delay(number) {
    console.log('PARAMETRO : ' + number);
    setTimeout(() => {
      console.log('NUMERO: ' + number);
      return number * 10;
    }, 5000)
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

    console.log(this.item);

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

  async uploadFile(event) {
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

    reader.onload = async (e: any) => {
      /* create workbook */
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: "binary" });
      /* selected the first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];
      /* save data */
      const data = XLSX.utils.sheet_to_json(ws, { raw: true }); // to get 2d array pass 2nd parameter as object {header: 1}      
      const read = await this.readAllrowsfile(data);
      console.log('****DOCUMENTOS FINALES****');
      console.log(read);
      if (read) {
        this.messageService.add({ severity: 'success', summary: 'Rosa Mística', detail: 'Todos los registros han sido cargos satisfactoriamente' });
      } else {
        this.messageService.add({ severity: 'error', summary: 'Rosa Mística', detail: 'El archivo no tiene el formato adecuado o tiene valores en los campos que no han sido ingresado en el sistema.' });
      }

      /*data.forEach(element => {
        console.log(element);
        let client = await this.searchclient(element['CLIENTE']);
        let farm = await this.searchfinca(element['FINCA']);
        console.log('DATA');
        console.log(element['MARCACION']);
        console.log(client);
        console.log('???');
        let mark = await this.searchMark(element['MARCACION'], client);
        if (client == null || farm == null || mark == null) {
          read = false;
          return;
        }
        let item = {
          cliente: client,
          finca: farm,
          marca: mark,
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

      });*/

      /*if (!read) {
        this.messageService.add({ severity: 'error', summary: 'Rosa Mística', detail: 'El archivo no tiene el formato adecuado o tiene valores en los campos que no han sido ingresado en el sistema.' });
        return;
      }*/

    };

    this.files.push(target.files[0]);
  }

  async readAllrowsfile(data: any) {
    console.log('READ SHEETS [i]');
    data.forEach(async element => {
      await this.readColumforRow(element);
      /*if (client == null || farm == null || mark == null) {
        return false;
      }
      let item = {
        cliente: client,
        finca: farm,
        marca: mark,
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
      });*/

    });
    return true;
  }

  async readColumforRow(element: any) {
    console.log('NEXT');
    console.log(element);
    //console.log('[ ' + element['CLIENTE'] + ' ] [' + element['FINCA'] + ' ] [' + element['MARCACION'] + ' ]');
    console.log('[CLIENTE]');
    let client = this.searchclient(element['CLIENTE']);
    console.log(client);
    /*console.log('[FINCA]');
    var farm = this.searchfinca(element['FINCA']);
    console.log(farm);
    console.log('MARCA');
    var mark = await this.searchMark(element['MARCACION'], client).then(dato => {
      console.log('DATO');
      console.log(dato);
    });
    console.log(mark);*/
    console.log('*** ITERACION ***');

  }

  /**   
   * Search a client an array list of client's
   * @param name 
   */
  async searchclient(name: string) {
    let clientTemp: client = null;
    this.clientes.filter(async client => {
      console.log('LEX');
      if (client.nombres.toLocaleLowerCase().indexOf(name.toLocaleLowerCase()) > -1) {
        clientTemp = client;
        console.log('Consultando las marcas del cliente' + client.entiId);
        await this.api.getmarks(client.entiId, localStorage.getItem("token")).then(mark => {
          console.log('Mira las marcas del cliente ' + client.entiId);
          console.log(mark);
        }).catch(err => {
          console.log(err);
          if (err.error.code == 401) {
            localStorage.clear();
            this.router.navigate(['/login']);
          }
        })
      }
    })
    console.log('MIRA VE ... ');
    console.log(clientTemp);
    return clientTemp;
  }

  /**
   * Search a farm an array list of farms
   * @param name 
   */
  searchfinca(name: string) {
    let fincaTemp: finca = null;
    this.fincas.filter(finca => {
      //console.log('FINCA => ' + finca.nombres.toLocaleLowerCase() + '=' + name.toLocaleLowerCase());
      if (finca.nombres.toLocaleLowerCase().indexOf(name.toLocaleLowerCase()) > -1) {
        fincaTemp = finca;
      }
    })
    return fincaTemp;
  }

  /**
   * Search a mark of client
   * @param name 
   * @param client 
   */
  async searchMark(name: string, client: client): Promise<any> {
    console.log('¿¿ESTE CLIENTE???');
    console.log(client);
    //let markTemp: mark = null;
    let markTemp = await this.api.getmarks(client.entiId, localStorage.getItem('token')).then(mark => {
      console.log('MARCAS CONSULTADAS');
      console.log(mark);
      console.log('NAME MARK: ' + name);
      if (mark.headerApp.code == 200) {
        console.log(mark.data.marks);
        /*mark.data.mark.filter(mark => {
          console.log('MARCA => ' + mark.nombre.toLocaleLowerCase() + '=' + name.toLocaleLowerCase());
          if (mark.nombre.toLocaleLowerCase().indexOf(name.toLocaleLowerCase()) > -1) {
            return mark;
          }
        })*/
      }
    }).catch(err => {
      console.log(err);
      if (err.error.code == 401) {
        localStorage.clear();
        this.router.navigate(['/login']);
      }
    })
    console.log('CONSULTA FINAL');
    console.log(markTemp);
    return markTemp;
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


  async onOptionsSelected() {
    console.log(this.prealertForm.get('cliente'));
    this.marks = [];
    await this.api.getmarks(this.prealertForm.get('cliente').value.entiId, localStorage.getItem("token")).then(mark => {
      console.log(mark);
      if (mark.headerApp.code == 200) {
        let temp: mark[] = [];
        mark.data.marks.forEach(element => {
          if (element.estado == 'A')
            temp.push(element);
        });
        this.marks = temp;
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
