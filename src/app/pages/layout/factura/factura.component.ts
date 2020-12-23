import { Component, OnInit } from "@angular/core";
import * as XLSX from "xlsx";
import { SelectItem } from "primeng";
import { MessageService, ConfirmationService } from "primeng/api";
import { client } from 'src/models/client';
import { delivery } from 'src/models/delivery';
import { mark } from 'src/models/mark';
import { finca } from 'src/models/finca';
import { flower } from 'src/models/flower';
import { Router } from '@angular/router';
import { ApisService } from 'src/services/apis.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { detail } from 'src/models/detail';
import { invoice } from 'src/models/invoice';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UtilService } from 'src/services/util.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { user } from 'src/models/user';
import { environment } from 'src/environments/environment';
import { LoginComponent } from '../../login/login.component';

export interface Item {
    caja: string;
    pieza: number;
    finca: string;
    flor: string;
    numtallos: number;
    tamanio: string;
    totaltallos: number;
    stems: number;
    price: number;
    subtotal: number;
    line: number;
}

export interface Factura {
    client: client;
    city: string;
    mark: string;
    mawba: string;
    freightforwarder: string;
    bounch: string;
    address: string;
    items: Item[];
    tallos: number;
    total: number;
    boxes: number;
}

export interface Draft {
    cabecera: {
        cargcompId: number;
        cargname: string;
        claveacceso: string;
        cliente: client;
        codiesta: string;
        contdocu: number;
        estado: string;
        fecha: string;
        marcId: number;
        mark: string;
        markCiu: string;
        markDir: string;
        mawb: string;
        numeboxes: number;
        numetallos: number;
        pdf: string;
        puntemis: string;
        secuencial: number;
        subtotal1: number;
        total: number;
    },
    detalles: Array<{
        cantidad: number;
        cantidadbch: number;
        cantidadcajas: number;
        farm: string;
        farmId: number;
        florId: number;
        flower: string;
        medidatallo: string;
        preciounitario: number;
        tallosxbch: number;
        tipoempaque: string;
        total: number;
        line: number;
    }>,
    idObjTmp: string;
}
@Component({
    selector: "app-factura",
    templateUrl: "./factura.component.html",
    styleUrls: ["./factura.component.css"],
    providers: [MessageService, ConfirmationService],
})
export class FacturaComponent implements OnInit {


    itemForm: FormGroup;
    facturaForm: FormGroup;
    factura: Factura;
    flowers: string[];
    tamanios: any[];
    selectedtamanio: any;
    manual: boolean;
    automatico: boolean;
    items: Array<Item> = [];
    files: any = [];
    rows: any = [];
    options: boolean;
    itemSelect: number = 0;
    addrow: boolean;
    optionsFactura: SelectItem[];
    select: string;
    flores: Array<flower> = [];
    fincas: Array<finca> = [];
    clientes: Array<client> = [];
    deliveries: Array<delivery> = [];
    marks: Array<mark> = [];
    cajas: any[] = [];
    submitted = false;
    submittedFactura = false;
    selectclient: client;
    invoice: invoice;
    dialogVisible: boolean;
    url: string;
    validate: boolean;
    smsvalidate: string;
    user: user;
    typerol: string;
    invoicesdraft: Array<Draft> = [];
    selectdraft: Draft;
    step: number;
    editInvoice: boolean;
    idFactura: number;
    selectmark: mark;
    line: number;

    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private router: Router, private api: ApisService,
        private formBuilder: FormBuilder, private utilService: UtilService,
        private spinner: NgxSpinnerService
    ) {


        this.itemForm = this.formBuilder.group({
            caja: [null],
            pieza: [''],
            finca: [null, Validators.required],
            flores: [null, [Validators.required]],
            stem: ['25', [Validators.required]],
            tamanio: [null, Validators.required],
            tallos: ['', Validators.required],
            totaltallos: ['', Validators.required],
            precio: ['', Validators.required]
        });

        this.facturaForm = this.formBuilder.group({
            cliente: [null, Validators.required],
            marca: [null, Validators.required],
            mawba: ['', Validators.required],
            empresacargo: [null, Validators.required]
        });

    }

    async ngOnInit() {
        this.user = JSON.parse(localStorage.getItem('user'));
        this.typerol = localStorage.getItem('rolactive');
        this.step = 1;
        this.dialogVisible = false;
        this.inicilizate();
        await this.getinvoicesdraft();
        await this.getServicios();
    }

    add() {
        this.addrow = true;
    }

    async getinvoicesdraft() {
        this.invoicesdraft = [];
        this.utilService.isLoading.next(true);
        await this.api.getinvoicesdraft(localStorage.getItem('token')).then(invoice => {
            if (invoice.headerApp.code == 200) {
                this.invoicesdraft = invoice.data.invoices;
                if (this.invoicesdraft.length <= 0) {
                    this.step = 2;
                }
            }
        }).catch(err => {
            if (err.error.code == 401) {
                localStorage.clear();
                this.router.navigate(['/login']);
            }
        })

        this.utilService.isLoading.next(false);
    }


    inicilizate() {
        this.idFactura = 0;
        this.line = 0;
        this.editInvoice = false;
        this.manual = false;
        this.automatico = false;
        this.options = false;
        this.addrow = false;
        this.submitted = false;
        this.submittedFactura = false;
        this.select = "MN";
        this.validate = false;
        this.selectedtamanio = null;
        this.selectdraft = null;
        this.selectmark = null;
        this.factura = {
            client: null,
            city: "",
            mark: "",
            mawba: "",
            freightforwarder: "",
            bounch: "",
            address: "",
            items: null,
            tallos: 0,
            total: 0.0,
            boxes: 0
        };
        this.tamanios = [
            { name: "CL", code: "CL" },
            { name: "40", code: "40" },
            { name: "50", code: "50" },
            { name: "60", code: "60" },
            { name: "70", code: "70" },
            { name: "80", code: "80" },
            { name: "90", code: "90" },
            { name: "100", code: "100" },
            { name: "110", code: "110" },
            { name: "150", code: "150" }
        ];
        this.cajas = [
            { name: "HB", code: "HB" },
            { name: "QB", code: "QB" },
        ]
    }

    selectOptions(type: string) {
        this.options = true;
        this.files = [];
        if (type == "manual") {
            this.addrow = false;
            this.manual = true;
            this.automatico = false;
            this.rows.push(this.rows.length + 1);
            this.items = [];
            this.factura.total = 0.0;
            this.factura.tallos = 0;
            this.validate = false;
            this.smsvalidate = "";
            this.line = 0;
        } else {
            this.automatico = true;
            this.manual = false;
            this.items = [];
            this.factura.total = 0.0;
            this.factura.tallos = 0;
            this.validate = false;
            this.smsvalidate = "";
            this.line = 0;
        }
    }

    async getClientbyName(name: string): Promise<any> {
        let cliente: client = null;
        await this.api.getObjectbyName('C', name.toUpperCase(), localStorage.getItem("token")).then(data => {
            if (data.headerApp.code == 200) {
                this.facturaForm.get('cliente').setValue(data.data.cliente);
                this.selectclient = data.data.cliente;
            }
        }).catch(err => {
            if (err.error.code == 401) {
                localStorage.clear();
                this.router.navigate(['/login']);
            }
        })
        return cliente;
    }

    uploadFile(event) {
        const target: DataTransfer = <DataTransfer>event.target;

        if (target.files.length !== 1) {
            throw new Error("Cannot use multiple files");
        }
        const reader: FileReader = new FileReader();
        reader.readAsBinaryString(target.files[0]);
        this.spinner.show();
        reader.onload = async (e: any) => {
            /* create workbook */
            const binarystr: string = e.target.result;
            const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: "binary" });
            /* selected the first sheet */
            const wsname: string = wb.SheetNames[0];
            const ws: XLSX.WorkSheet = wb.Sheets[wsname];
            /* save data */
            const data = XLSX.utils.sheet_to_json(ws, { raw: true }); // to get 2d array pass 2nd parameter as object {header: 1}            
            this.utilService.isLoading.next(true);
            let cont = 0;
            for (var i = 7; i < data.length; i++) {
                if (data[i]["__EMPTY_2"] != undefined) {

                    const fincaTemp = await this.getFincabyName(data[i]["__EMPTY_2"]);
                    if (fincaTemp == null) {
                        this.messageService.add({ severity: 'error', summary: 'Rosa Mística', detail: 'La finca ' + data[i]["__EMPTY_2"] + ' no se encuentra ingresada en el sistema.' });
                        this.validate = true;
                        this.spinner.hide();
                        this.smsvalidate = 'La finca ' + data[i]["__EMPTY_2"] + ' no se encuentra registrada en el sistema.'
                        return
                    }

                    const flowerTemp = await this.getFlowerbyName(
                        data[i][
                        "                                       ROSA MISTICA"
                        ]);
                    if (flowerTemp == null) {
                        this.messageService.add({
                            severity: 'error', summary: 'Rosa Mística', detail: 'La flor ' + data[i][
                                "                                       ROSA MISTICA"
                            ] + ' no se encuentra en el sistema.'
                        });
                        this.validate = true;
                        this.spinner.hide();
                        this.smsvalidate = 'La flor ' + data[i][
                            "                                       ROSA MISTICA"
                        ] + ' no se encuentra registrada en el sistema.'
                        return
                    }
                    let numtallos = this.getvalueCelda(data[i]["__EMPTY_4"], data[i]["__EMPTY_5"], data[i]["__EMPTY_6"], data[i]["__EMPTY_7"], data[i]["__EMPTY_8"],
                        data[i]["__EMPTY_9"], data[i]["__EMPTY_10"], data[i]["__EMPTY_11"], data[i]["__EMPTY_12"]);

                    let item = {
                        caja: data[i]["__EMPTY"] == null ? '' : this.getTypeBox(data[i]["__EMPTY"]),
                        pieza: data[i]["__EMPTY_1"],
                        finca: fincaTemp,
                        flor: flowerTemp,
                        numtallos: parseInt(numtallos),
                        claves: "",
                        totaltallos: data[i]["__EMPTY_3"] * parseInt(numtallos),
                        tamanio: this.selectedtamanio,
                        stems: data[i]["__EMPTY_3"],
                        price: data[i]["__EMPTY_14"],
                        subtotal: data[i]["__EMPTY_15"],
                        line: cont
                    };
                    this.factura.tallos += item.totaltallos;
                    this.factura.total += item.subtotal;
                    data[i]["__EMPTY_1"] == null ? '' : this.factura.boxes += parseInt(item.pieza);
                    this.items.push(item);
                    cont += 1;
                }
            }
            this.utilService.isLoading.next(false);
            this.spinner.hide();
            this.messageService.add({ severity: 'success', summary: 'Rosa Mística', detail: 'Se ha cargado todo el archivo correctamente.' });

        };

        this.files.push(target.files[0]);
    }

    getTypeBox(name: string): any {
        let box: any;
        if (name == undefined) {
            box = { name: "HB", code: "HB" };
        } else {
            switch (name.trim()) {
                case 'HB':
                    box = { name: "HB", code: "HB" };
                    break;
                case 'QB':
                    box = { name: "QB", code: "QB" };
                    break;
                default:
                    console.log('No se encuentra la domensión de la caja');
                    break;
            }
        }
        return box;
    }

    getvalueCelda(clave: string, cuare_: string, cincue_: string, sesen_: string, seten_: string, ochen_: string, noven_: string,
        cien_: string, ciendiez_: string): string {

        if (clave != undefined) {
            this.tamanios.filter(tamanio => {
                if (tamanio.code == 'CL') {
                    this.selectedtamanio = tamanio;
                }
            });
            return clave;
        }
        if (cuare_ != undefined) {
            this.tamanios.filter(tamanio => {
                if (tamanio.code == '40') {
                    this.selectedtamanio = tamanio;
                }
            });
            return cuare_;
        }
        if (cincue_ != undefined) {
            this.tamanios.filter(tamanio => {
                if (tamanio.code == '50') {
                    this.selectedtamanio = tamanio;
                }
            });
            return cincue_;
        }
        if (sesen_ != undefined) {
            this.tamanios.filter(tamanio => {
                if (tamanio.code == '60') {
                    this.selectedtamanio = tamanio;
                }
            });
            return sesen_;
        }
        if (seten_ != undefined) {
            this.tamanios.filter(tamanio => {
                if (tamanio.code == '70') {
                    this.selectedtamanio = tamanio;
                }
            });
            return seten_;
        }
        if (ochen_ != undefined) {
            this.tamanios.filter(tamanio => {
                if (tamanio.code == '80') {
                    this.selectedtamanio = tamanio;
                }
            });
            return ochen_;
        }
        if (noven_ != undefined) {
            this.tamanios.filter(tamanio => {
                if (tamanio.code == '90') {
                    this.selectedtamanio = tamanio;
                }
            });
            return noven_;
        }
        if (cien_ != undefined) {
            this.tamanios.filter(tamanio => {
                if (tamanio.code == '100') {
                    this.selectedtamanio = tamanio;
                }
            });
            return cien_;
        }
        if (ciendiez_ != undefined) {
            this.tamanios.filter(tamanio => {
                if (tamanio.code == '110') {
                    this.selectedtamanio = tamanio;
                }
            });
            return ciendiez_;
        }
    }

    deleteAttachment(index) {
        this.files.splice(index, 1);
        this.items = [];
        this.factura.total = 0;
        this.factura.tallos = 0;
        this.validate = false;
        this.smsvalidate = "";
        this.line = 0;
    }

    /**
     * Function the save row of load item manual
     */
    saverow() {
        this.submitted = true;

        if (this.itemForm.invalid) {
            this.messageService.add({ severity: 'error', summary: 'Rosa Mística', detail: 'Los campos son obligatorios' });
            return;
        }

        this.items.push({
            caja: this.itemForm.get('caja').value,
            pieza: this.itemForm.get('pieza').value,
            finca: this.itemForm.get('finca').value,
            flor: this.itemForm.get('flores').value,
            stems: this.itemForm.get('stem').value,
            tamanio: this.itemForm.get('tamanio').value,
            numtallos: this.itemForm.get('tallos').value,
            totaltallos: this.itemForm.get('stem').value * this.itemForm.get('tallos').value,
            price: this.itemForm.get('precio').value,
            subtotal: (this.itemForm.get('stem').value * this.itemForm.get('tallos').value) * this.itemForm.get('precio').value,
            line: this.selectdraft == null ? this.items.length : this.line + 1
        });

        this.selectdraft == null ?'':this.line += 1;
     
        this.factura.total = 0;
        this.factura.tallos = 0;
        this.factura.boxes = 0;

        this.items.forEach((item) => {
            this.factura.total += item.subtotal;
            this.factura.tallos += parseInt(item.totaltallos.toString());
            item.pieza != null ? this.factura.boxes += parseInt(item.pieza.toString()) : '';

        });

        this.addrow = false;
        this.submitted = false;
        this.itemForm.reset();
        this.itemForm.get('stem').setValue('25');

    }


    cancel() {
    }

    hiddenCard(numero: number): boolean {
        let state: boolean = true;
        if (numero == this.itemSelect) {
            state = false;
        } else {
            state = true;
        }
        return state;
    }


    cancelrow() {
        this.addrow = false;
        this.itemForm.reset();
        this.submitted = false;
    }

    deleteItem(item: Item) {
        this.factura.total = 0;
        this.factura.tallos = 0;
        this.factura.boxes = 0;
        this.items = this.items.filter((element) => element != item);
        this.items.forEach((item) => {
            this.factura.total += item.subtotal;
            this.factura.tallos += parseInt(item.stems.toString());
            item.pieza == null ? '' : this.factura.boxes += parseInt(item.pieza.toString())
        });

    }

    onOptionsMarkSelected() {
        this.selectmark = this.facturaForm.get('marca').value;
    }

    async onOptionsSelected() {
        this.marks = [];
        this.selectclient = this.facturaForm.get('cliente').value;
        this.selectclient.paiscity = this.selectclient.pais + ' - ' + this.selectclient.ciudad;
        await this.api.getmarks(this.facturaForm.get('cliente').value.entiId, localStorage.getItem("token")).then(mark => {
            if (mark.headerApp.code == 200) {
                let temp: mark[] = [];
                mark.data.marks.forEach(element => {
                    if (element.estado == 'A')
                        temp.push(element);
                });
                this.marks = temp;
            }
        }).catch(err => {
            if (err.error.code == 401) {
                localStorage.clear();
                this.router.navigate(['/login']);
            }
        })

    }

    /**
     * Function the save the invoice
     */
    save() {

        this.submittedFactura = true;
        if (this.facturaForm.invalid) {
            this.messageService.add({ severity: 'error', summary: 'Rosa Mística', detail: 'Los campos para generar la factura son obligatorios.' });
            return;
        }
        this.factura.items = this.items;
        let head = {
            codiesta: '001',
            puntemis: '001',
            clieId: this.facturaForm.get('cliente').value.entiId,
            cargcompId: this.facturaForm.get('empresacargo').value.entiId,
            marcId: this.facturaForm.get('marca').value.marcId,
            mawb: this.facturaForm.get('mawba').value,
            subtotal0: 0,
            descuento: 0,
            subtotal1: 0,
            ice: 0.00,
            iva: 0.00,
            total: this.factura.total,
            observacion: '-',
            numetallos: this.factura.tallos,
            numeboxes: this.factura.boxes,
            estado: "T",
            fecha: this.selectdraft != null ? this.selectdraft.cabecera.fecha + '.000' : null,
            claveacceso: this.selectdraft != null ? this.selectdraft.cabecera.claveacceso : null,
            secuencial: this.selectdraft != null ? this.selectdraft.cabecera.secuencial : null,
            contdocu: this.selectdraft != null ? this.selectdraft.cabecera.contdocu : 0,
        }

        let detail: detail[] = [];
        this.factura.items.forEach(data => {
            detail.push({
                tipoempaque: data.caja == undefined ? "" : data.caja['code'],
                cantidadcajas: data.pieza == undefined ? "" : String(data.pieza),
                tallosxbch: data.stems,
                medidatallo: data.tamanio['code'],
                cantidadbch: data.numtallos,
                cantidad: data.totaltallos,
                preciounitario: data.price,
                total: data.subtotal,
                farmId: data.finca['entiId'],
                florId: data.flor['florId'] == undefined ? data.flor['flor'].florId : data.flor['florId'],
                line: data.line
            })
        })

       
        let invoice = {
            cabecera: head,
            detalles: detail,
            idObjTmp: this.selectdraft == null ? null : this.selectdraft.idObjTmp,
            fromTemp: this.selectdraft == null ? false : true
        };
        this.confirmationService.confirm({
            message: "Are you sure to send the invoice?",
            accept: async () => {
                this.spinner.show();
                await this.api.registerInvoice(invoice, localStorage.getItem("token")).then(data => {
                    this.spinner.hide();
                    if (data.headerApp.code == 200) {
                        this.dialogVisible = true;
                        this.itemForm.get('stem').setValue('25');
                        this.url = environment.url + data.data.invoice.pdf;
                        this.inicilizate();
                        this.getinvoicesdraft();
                        this.invoice = null;
                        this.facturaForm.reset();
                        this.itemForm.reset();
                        this.selectclient = null;
                        this.messageService.add({ severity: 'success', summary: 'Rosa Mística', detail: 'La factura se ha registrado correctamente' });
                    }
                }).catch(err => {
                    if (err.error.code == 401) {
                        localStorage.clear();
                        this.router.navigate(['/login']);
                    }

                });
            },
        });
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


    /**
     * Function the search services client, flowers, deliveries, fincas
     */
    async getServicios() {
        await this.api.getclients(localStorage.getItem("token")).then(cliente => {
            this.clientes = [];
            if (cliente.headerApp.code === 200) {
                cliente.data.clientes.forEach(data => {
                    if (data.cliente.estado == 'A') {
                        this.clientes.push(data.cliente);
                    }
                });
            }

        }).catch(err => {
             
            if (err.error.code == 401) {
                localStorage.clear();
                this.router.navigate(['/login']);
            }
        })

        await this.api.getfinca(localStorage.getItem("token")).then(finca => {
            this.fincas = [];
            if (finca.headerApp.code === 200) {
                finca.data.farms.forEach(finca => {
                    if (finca.estado == 'A') {
                        this.fincas.push(finca);
                    }
                });
            }

        }).catch(err => {
             
            if (err.error.code == 401) {
                localStorage.clear();
                this.router.navigate(['/login']);
            }
        })

        await this.api.getflowers(localStorage.getItem("token")).then(flor => {
            this.flores = [];
            if (flor.headerApp.code === 200) {
                flor.data.flowers.forEach(flor => {
                    if (flor.flor.estado == 'A') {
                        this.flores.push(flor);
                    }
                });
            }
        }).catch(err => {
             
            if (err.error.code == 401) {
                localStorage.clear();
                this.router.navigate(['/login']);
            }
        })


        await this.api.getdeliveries(localStorage.getItem("token")).then(delivery => {
            this.deliveries = [];
            if (delivery.headerApp.code === 200) {
                delivery.data.cargocompanies.forEach(delivery => {
                    if (delivery.estado == 'A') {
                        this.deliveries.push(delivery);
                    }
                });
            }
        }).catch(err => {
             
            if (err.error.code == 401) {
                localStorage.clear();
                this.router.navigate(['/login']);
            }
        })
    }

    calculate() {
        this.itemForm.get('totaltallos').setValue(this.itemForm.get('stem').value * this.itemForm.get('tallos').value);
    }

    async saveeraser() {
        this.submittedFactura = true;
        if (this.facturaForm.invalid) {
            this.messageService.add({ severity: 'error', summary: 'Rosa Mística', detail: 'Los campos para generar la factura son obligatorios.' });
            return;
        }

        this.factura.items = this.items;
        let head = {
            codiesta: '001',
            puntemis: '001',
            clieId: this.facturaForm.get('cliente').value.entiId,
            cargcompId: this.facturaForm.get('empresacargo').value.entiId,
            marcId: this.facturaForm.get('marca').value.marcId,
            mawb: this.facturaForm.get('mawba').value,
            subtotal0: 0,
            descuento: 0,
            subtotal1: 0,
            ice: 0.00,
            iva: 0.00,
            total: this.factura.total,
            observacion: '-',
            numetallos: this.factura.tallos,
            numeboxes: this.factura.boxes,
            estado: "B",
            fecha: this.selectdraft == null ? null : this.selectdraft.cabecera.fecha + '.000',
            claveacceso: this.selectdraft != null ? this.selectdraft.cabecera.claveacceso : null,
            secuencial: this.selectdraft != null ? this.selectdraft.cabecera.secuencial : null,
            contdocu: this.selectdraft != null ? this.selectdraft.cabecera.contdocu : 0,
        }

        let detail: detail[] = [];
        this.factura.items.forEach(data => {
            detail.push({
                tipoempaque: data.caja == undefined ? "" : data.caja['code'],
                cantidadcajas: data.pieza == undefined ? "" : String(data.pieza),
                tallosxbch: data.stems,
                medidatallo: data.tamanio['code'],
                cantidadbch: data.numtallos,
                cantidad: data.totaltallos,
                preciounitario: data.price,
                total: data.subtotal,
                farmId: data.finca['entiId'],
                florId: data.flor['florId'] == undefined ? data.flor['flor'].florId : data.flor['florId'],
                line: data.line
            })
        })
        this.invoice = {
            cabecera: head,
            detalles: detail,
            idObjTmp: this.selectdraft == null ? null : this.selectdraft.idObjTmp
        };

        this.spinner.show();
        await this.api.registerInvoiceDraft(this.invoice, localStorage.getItem("token")).then(data => {
            this.spinner.hide();
            if (data.headerApp.code == 200) {
                this.inicilizate();
                this.getinvoicesdraft();
                this.invoice = null;
                this.facturaForm.reset();
                this.itemForm.reset();
                this.selectclient = null;
                this.messageService.add({ severity: 'success', summary: 'Rosa Mística', detail: 'El borrador de la factura se guardo correctemante' });
            }
        }).catch(err => {
             
            if (err.error.code == 401) {
                localStorage.clear();
                this.router.navigate(['/login']);
            }

        });


    }

    facturar() {
        this.step = 2;
    }

    async back() {
        await this.getinvoicesdraft();
        this.step = 1;
        this.items = [];
        this.selectclient = null;
        this.facturaForm.reset();
        this.factura.tallos = 0;
        this.factura.total = 0;
        this.factura.boxes=0;
        this.editInvoice = false;
        this.selectdraft = null;
    }

    viewdraft(draft: Draft) {
    }

    finish(draft: Draft) {
    }

    async edit(draft: Draft) {

        this.editInvoice = true;
        this.selectdraft = draft;
        this.step = 2;
        this.idFactura = draft.cabecera.secuencial;
        this.utilService.isLoading.next(true);
        this.facturaForm.get('cliente').setValue(draft.cabecera.cliente);
        this.selectclient = draft.cabecera.cliente;
        const mark = await this.getMarcbyName(draft.cabecera.cliente.entiId, draft.cabecera.mark);
        this.facturaForm.get('marca').setValue(mark);
        this.selectmark = mark;
        const empresacargo = await this.getEmpresaCargabyName(draft.cabecera.cargname);
        this.facturaForm.get('empresacargo').setValue(empresacargo);
        this.facturaForm.get('mawba').setValue(draft.cabecera.mawb);

        this.selectOptions('manual');
        this.items = [];
        await Promise.all(draft.detalles.map(async (item) => {
            let tamanio = await this.tamanios.filter(tamanio => tamanio.code == item.medidatallo);
            let caja = await this.cajas.filter(caja => caja.code == item.tipoempaque);
            let farm = await this.getFincabyName(item.farm);
            let flower = await this.getFlowerbyName(item.flower);
            this.items.push({
                caja: caja[0] == null ? '' : caja[0],
                pieza: item.cantidadcajas,
                finca: farm,
                flor: flower,
                stems: item.tallosxbch,
                tamanio: tamanio[0],
                numtallos: item.cantidadbch,
                totaltallos: item.cantidad,
                price: item.preciounitario,
                subtotal: item.total,
                line: item['line']
            });
        }))

        this.items.sort(function (a, b) {
            if (a.line > b.line) {
                return 1;
            }
            if (a.line < b.line) {
                return -1;
            }
            return 0;
        });

        this.line = this.items[this.items.length -1 ].line;
        this.factura.total = 0;
        this.factura.tallos = 0;
        this.factura.boxes = 0;

        this.items.forEach((item) => {
            this.factura.total += item.subtotal;
            this.factura.tallos += parseInt(item.totaltallos.toString());
            this.factura.boxes += item.pieza != null ? parseInt(item.pieza.toString()) : 0;
        });


        this.utilService.isLoading.next(false);
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

    get f() {
        return this.itemForm.controls;
    }
    get fr() {
        return this.facturaForm.controls;
    }

}
