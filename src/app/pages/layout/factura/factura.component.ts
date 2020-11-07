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

export interface Item {
    caja: string;
    pieza: string;
    finca: string;
    flor: string;
    numtallos: number;
    tamanio: string;
    totaltallos: number;
    stems: number;
    price: number;
    subtotal: number;
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


    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService,
        private router: Router, private api: ApisService,
        private formBuilder: FormBuilder
    ) {
        this.itemForm = this.formBuilder.group({
            caja: [null],
            pieza: [''],
            finca: [null, Validators.required],
            flores: [null, [Validators.required]],
            stem: ['', [Validators.required]],
            tamanio: [null, Validators.required],
            tallos: ['', Validators.required],
            precio: ['', Validators.required]
        });

        this.facturaForm = this.formBuilder.group({
            cliente: [null, Validators.required],
            marca: [null, Validators.required],
            mawba: ['', Validators.required],
            empresacargo: [null, Validators.required]
        });

    }

    ngOnInit(): void {
        this.inicilizate();
        this.getServicios();
    }

    add() {
        this.addrow = true;
    }

    inicilizate() {
        this.manual = false;
        this.automatico = false;
        this.options = false;
        this.addrow = false;
        this.submitted = false;
        this.submittedFactura = false;
        this.select = "MN";
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
        } else {
            this.automatico = true;
            this.manual = false;
            this.items = [];
            this.factura.total = 0.0;
            this.factura.tallos = 0;
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
            //console.log('ARRAY DATA');
            for (var i = 7; i < data.length; i++) {
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
                        caja: '',
                        pieza: data[i]["__EMPTY_1"],
                        finca: data[i]["__EMPTY_2"],
                        flor:
                            data[i][
                            "                                       ROSA MISTICA"
                            ],
                        numtallos: data[i]["__EMPTY_13"],
                        claves: "",
                        totaltallos: 0,
                        tamanio: floower_length,
                        stems: data[i]["__EMPTY_13"],
                        price: data[i]["__EMPTY_14"],
                        subtotal: data[i]["__EMPTY_15"],
                    };
                    this.factura.tallos += item.stems;
                    this.factura.total += item.subtotal;
                    this.items.push(item);
                }
            }

            console.log("ARRAY DE LISTA");
            console.log(this.items);
        };

        this.files.push(target.files[0]);
    }

    deleteAttachment(index) {
        this.files.splice(index, 1);
        this.items = [];
        this.factura.total = 0;
        this.factura.tallos = 0;
    }

    saverow() {
        console.log('Validando Row...');

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
        });

        this.factura.total = 0;
        this.factura.tallos = 0;
        this.items.forEach((item) => {
            this.factura.total += item.subtotal;
            this.factura.tallos += item.stems;
            console.log(this.factura.total);
        });

        this.addrow = false;
        this.submitted = false;
        this.itemForm.reset();

    }

    get f() {
        return this.itemForm.controls;
    }
    get fr() {
        return this.facturaForm.controls;
    }

    save() {
        console.log('Save factura...');

        this.submittedFactura = true;
        if (this.facturaForm.invalid) {
            this.messageService.add({ severity: 'error', summary: 'Rosa Mística', detail: 'Los campos para generar la factura son obligatorios.' });
            return;
        }
        console.log("Va a guardar los registros");
        console.log("FACTURA");
        this.factura.items = this.items;
        console.log(this.factura);
        this.confirmationService.confirm({
            message: "Are you sure to send the invoice?",
            accept: () => {
                //Actual logic to perform a confirmation
                console.log('Esta todo bien');

            },
        });
    }

    cancel() {
        console.log("Va a cancelar los registros");
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
        this.items = this.items.filter((element) => element != item);
        this.items.forEach((item) => {
            this.factura.total += item.subtotal;
            this.factura.tallos += item.stems;
        });
    }

    onOptionsSelected() {
        this.marks = [];
        this.selectclient = this.facturaForm.get('cliente').value;
        this.api.getmarks(this.facturaForm.get('cliente').value.entiId, localStorage.getItem("token")).then(mark => {
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
        console.log('Inicializando los valores');

    }


    getServicios() {
        this.api.getclients(localStorage.getItem("token")).then(cliente => {
            this.clientes = [];
            if (cliente.headerApp.code === 200) {
                cliente.data.clientes.forEach(cliente => {
                    if (cliente.estado == 'A') {
                        this.clientes.push(cliente);
                    }
                });
            }

        }).catch(err => {
            console.log(err);
            if (err.error.code == 401) {
                localStorage.clear();
                this.router.navigate(['/login']);
            }
        })

        this.api.getfinca(localStorage.getItem("token")).then(finca => {
            this.fincas = [];
            if (finca.headerApp.code === 200) {
                finca.data.farms.forEach(finca => {
                    if (finca.estado == 'A') {
                        this.fincas.push(finca);
                    }
                });
            }

        }).catch(err => {
            console.log(err);
            if (err.error.code == 401) {
                localStorage.clear();
                this.router.navigate(['/login']);
            }
        })

        this.api.getflowers(localStorage.getItem("token")).then(flor => {
            this.flores = [];
            if (flor.headerApp.code === 200) {
                flor.data.flowers.forEach(flor => {
                    if (flor.flor.estado == 'A') {
                        this.flores.push(flor);
                    }
                });
            }
        }).catch(err => {
            console.log('ERROR');
            console.log(err);
            if (err.error.code == 401) {
                localStorage.clear();
                this.router.navigate(['/login']);
            }
        })

        this.api.getdeliveries(localStorage.getItem("token")).then(delivery => {
            this.deliveries = [];
            if (delivery.headerApp.code === 200) {
                delivery.data.cargocompanies.forEach(delivery => {
                    if (delivery.estado == 'A') {
                        console.log('ESTE SI');
                        console.log(delivery);
                        this.deliveries.push(delivery);
                    }
                });
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
