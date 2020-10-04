import { Component, OnInit } from "@angular/core";
import * as XLSX from "xlsx";
import { SelectItem } from "primeng";
import { MessageService, ConfirmationService } from "primeng/api";

export interface Item {
    pieza: string;
    farmacia: string;
    flor: string;
    baucher: number;
    claves: string;
    tamanio: string;
    stems: number;
    price: number;
    subtotal: number;
}

export interface Factura {
    client: string;
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
    temp: any;
    addrow: boolean;
    optionsFactura: SelectItem[];
    select: string;

    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.inicilizate();
    }

    add() {
        this.addrow = true;
    }

    search(event) {
        this.flowers = [
            "Alex",
            "Barcelona",
            "Buenos Aires",
            "Bogota",
            "Ecuador",
            "Escudo",
            "Loja",
        ];
        console.log(this.flowers);
        console.log("Data de busqueda en el input");
        console.log(event);
        this.flowers = this.flowers.filter(
            (data) => data.toLocaleUpperCase().indexOf(event.query) > -1
        );
        console.log(this.flowers);
    }

    inicilizate() {
        this.manual = false;
        this.automatico = false;
        this.options = false;
        this.addrow = false;
        this.select = "MN";
        this.factura = {
            client: "",
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
        this.temp = {
            caja: "",
            pieza: "",
            finca: "",
            flores: "",
            tallos: "",
            tamanio: "",
            cantidad: "",
        };
        this.tamanios = [
            { name: "40 mm", code: "40" },
            { name: "50 mm", code: "50" },
            { name: "60 mm", code: "60" },
            { name: "70 mm", code: "70" },
            { name: "80 mm", code: "80" },
            { name: "90 mm", code: "90" },
            { name: "100 mm", code: "100" },
            { name: "110 mm", code: "110" },
        ];
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

    save() {
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

    saverow() {
        if (
            this.temp.pieza == "" ||
            this.temp.finca == "" ||
            this.temp.flores == "" ||
            this.temp.tallos == "" ||
            this.temp.tallos == "" ||
            this.temp.tamanio == ""
        ) {
            this.messageService.add({
                severity: "error",
                summary: "Rosa Mística",
                detail:
                    "Todos los campos son obligatorios para agregar un nuevo item a la factura",
            });
            return false;
        }
        this.items.push({
            pieza: this.temp.pieza,
            farmacia: this.temp.finca,
            flor: this.temp.flores,
            baucher: this.temp.tallos,
            claves: this.temp.tallos,
            tamanio: this.temp.tamanio,
            stems: this.temp.tallos * this.temp.cantidad,
            price: 0.4,
            subtotal: this.temp.tallos * this.temp.cantidad * 0.4,
        });

        this.factura.total = 0;
        this.factura.tallos = 0;
        this.items.forEach((item) => {
            this.factura.total += item.subtotal;
            this.factura.tallos += item.stems;
            console.log(this.factura.total);
        });

        this.addrow = false;
        this.temp = [];
    }

    cancelrow() {
        this.addrow = false;
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
}
