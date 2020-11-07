import { Router } from '@angular/router';
import { SelectItem } from 'primeng/primeng';
import { ApisService } from './../../../../../../services/apis.service';
import { Component, OnInit, Input } from '@angular/core';
import { ShareReplayConfig } from 'rxjs/internal/operators/shareReplay';
import { MessageService } from 'primeng/api';
import { mark } from 'src/models/mark';

export interface client {
    entiId: string;
    entiDni: string;
    estado: string;
    ciudad: string;
    direccion: string;
    nombres: string;
    apellidos: string;
    razosoci: string;
    tipo: any;
    email: string;
    phone: string;
    tipoenti: string;
}

export interface Tipo {
    name: string;
    code: string;
}

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.css'],
    providers: [MessageService]
})
export class EditComponent implements OnInit {

    client: client;
    options: SelectItem[];
    tipos: Tipo[] = [];
    client_: client;
    edit: boolean;
    blockedPanel: boolean = false;
    marks: mark[] = [];
    marksdisabled: mark[] = [];
    selectmark: mark;
    name: string;

    constructor(private api: ApisService, private router: Router, private messageService: MessageService) {
        if (this.router.getCurrentNavigation().extras.state != null) {
            console.log('EDITAR..');
            this.client_ = JSON.parse(this.router.getCurrentNavigation().extras.state.user);
            console.log(this.client_);
            this.edit = true;
            this.getMarcks();
        } else {
            console.log('CREATE');
            this.edit = false;
        }
        this.inicializateValores();
    }

    ngOnInit(): void {

    }

    modificarclient() {
        console.log('[Modificar el cliente]');
        console.log(this.client);
        this.client.tipo = this.client.tipo.code;
        this.client.tipo == 'J' ? this.client.nombres = this.client.razosoci : '';
        this.api.updateclient(this.client, localStorage.getItem("token")).then(data => {
            console.log("Modificando el cliente");
            if (data.headerApp.code === 200) {
                this.router.navigate(['clientes']);
                this.inicializateValores();
            }
            console.log(data);

        }).catch(err => {
            console.log(err);
            if (err.error.code == 401) {
                localStorage.clear();
                this.router.navigate(['/login']);
            }
        })

    }

    saveclient() {
        console.log('[Guardando el usuario]');
        this.client.tipo = this.client.tipo.code;
        this.client.tipo == 'J' ? this.client.nombres = this.client.razosoci : '';
        this.api.addclient(this.client, localStorage.getItem("token")).then(data => {
            console.log("Guardar cliente");
            if (data.headerApp.code === 200) {
                this.router.navigate(['clientes']);
                this.inicializateValores();
            }
            console.log(data);

        }).catch(err => {
            console.log(err);
            if (err.error.code == 401) {
                localStorage.clear();
                this.router.navigate(['/login']);
            }
        })
    }

    cancelar() {
        this.router.navigate(['clientes']);
    }

    selecttipo(event) {
        this.getType(event.value.code)
    }

    inicializateValores() {
        this.client = {
            entiId: this.client_ != null ? this.client_['id'] : "",
            entiDni: this.client_ != null ? this.client_['identification'] : "",
            estado: this.client_ != null ? this.client_['status'] == 'Activo' ? "A" : "I" : "A",
            ciudad: this.client_ != null ? this.client_['city'] : "",
            direccion: this.client_ != null ? this.client_['direction'] : "",
            nombres: this.client_ != null ? this.client_['name'] : "",
            apellidos: this.client_ != null ? this.client_['lastname'] : "",
            razosoci: this.client_ != null ? this.client_['razosoci'] : "",
            tipo: this.client_ != null ? this.getType(this.client_['tipo'])[0] : { name: 'Persona Natural', code: 'N' },
            email: this.client_ != null ? this.client_['email'] : "",
            phone: this.client_ != null ? this.client_['phone'] : "",
            tipoenti: "C"
        };

        console.log('ESTE ES EL CLIENTE');
        console.log(this.client);

        this.options = [{ label: 'Activo', value: 'A' }, { label: 'Inactivo', value: 'I' }];
        this.tipos = [
            { name: 'Persona Natural', code: 'N' },
            { name: 'Persona Jurídica', code: 'J' }
        ];
    }

    getType(tipo: string) {
        return (
            [
                { name: 'Persona Natural', code: 'N' },
                { name: 'Persona Jurídica', code: 'J' }
            ].filter(element => tipo == element.code)
        )
    }


    onConfirm() {
        this.blockedPanel = false;
        console.log('[Modificando el usuario]');
        console.log(this.client);
        this.api.updateclient(this.client, localStorage.getItem("token")).then(data => {
            console.log("Actualizar cliente");
            if (data.headerApp.code === 200) {
                this.router.navigate(['clientes']);
                this.inicializateValores();
            }
            console.log(data);
        }).catch(err => {
            console.log(err);
        })
        this.messageService.clear('c');

    }

    onReject() {
        this.blockedPanel = false;
        this.messageService.clear('c');
    }

    async getMarcks() {
        this.marks = [];
        this.marksdisabled = [];
        await this.api.getmarks(parseInt(this.client_['id']), localStorage.getItem("token")).then(mark => {
            console.log(mark);
            if (mark.headerApp.code == 200) {
                mark.data.marks.forEach(element => {
                    if (element.estado == 'A') {
                        this.marks.push(element);
                    }
                    if (element.estado == 'I') {
                        this.marksdisabled.push(element);
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

    guardar() {
        let mark: mark = {
            nombre: this.name,
            estado: 'A',
            entiId: this.client_['id']
        }
        this.api.addmark(mark, localStorage.getItem("token")).then(data => {
            console.log(data);
            if (data.headerApp.code === 200) {
                this.messageService.add({ severity: 'success', summary: 'Rosa Mística', detail: 'Se ha agregado una nueva marca al cliente' });
                this.getMarcks();
                this.name = "";

            }
        }).catch(err => {
            console.log(err);
            if (err.error.code == 401) {
                localStorage.clear();
                this.router.navigate(['/login']);
            }
        })
    }

    async enabled(event: any) {
        await event.items.forEach(async element => {
            let mark = {
                entiId: element.entiId,
                marcId: element.marcId,
                nombre: element.nombre,
                estado: 'A'
            }
            await this.api.updatemark(mark, localStorage.getItem("token")).then((data) => {
                if (data.headerApp.code === 200) {
                    console.log('Actualizado correctamente');
                }
            }).catch(err => {
                console.log(err);
                if (err.error.code == 401) {
                    localStorage.clear();
                    this.router.navigate(['/login']);
                }
            })

        });
        await this.getMarcks();
        this.messageService.add({ severity: 'success', summary: 'Rosa Mística', detail: 'Se han habilitado algunas marcas ' });
    }

    async disabled(event: any) {

        await event.items.forEach(async element => {
            let mark = {
                entiId: element.entiId,
                marcId: element.marcId,
                nombre: element.nombre,
                estado: 'I'
            }
            this.api.updatemark(mark, localStorage.getItem("token")).then((data) => {
                if (data.headerApp.code === 200) {
                    console.log('Actualizado correctamente');
                }
            }).catch(err => {
                console.log(err);
                if (err.error.code == 401) {
                    localStorage.clear();
                    this.router.navigate(['/login']);
                }
            })

        });

        await this.getMarcks();
        this.messageService.add({ severity: 'success', summary: 'Rosa Mística', detail: 'Se han desabilitado algunas marcas ' });
    }

    /**
     * Function update name this mark of client
     */
    async modificar() {
        let mark = {
            entiId: this.selectmark.entiId,
            marcId: this.selectmark.marcId,
            nombre: this.name,
            estado: this.selectmark.estado
        }
        await this.api.updatemark(mark, localStorage.getItem("token")).then((data) => {
            if (data.headerApp.code === 200) {
                console.log('Actualizado correctamente');
            }
        }).catch(err => {
            console.log(err);
            if (err.error.code == 401) {
                localStorage.clear();
                this.router.navigate(['/login']);
            }
        })

        await this.getMarcks();
        this.messageService.add({ severity: 'success', summary: 'Rosa Mística', detail: 'Se actualizado la marca ' + this.selectmark.nombre });
        this.selectmark = null;
        this.name = "";
    }

    selected(mark: mark) {
        if (mark == this.selectmark) {
            this.selectmark = null;
        } else {
            this.selectmark = mark;
            this.name = this.selectmark.nombre;
        }
    }

    cancelarmark() {
        this.selectmark = null;
        this.name = "";
    }

}
