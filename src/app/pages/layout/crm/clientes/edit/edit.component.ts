import { Router } from '@angular/router';
import { SelectItem } from 'primeng/primeng';
import { ApisService } from './../../../../../../services/apis.service';
import { Component, OnInit, Input } from '@angular/core';
import { ShareReplayConfig } from 'rxjs/internal/operators/shareReplay';
import { MessageService } from 'primeng/api';

export interface client {
    entiId: string;
    entiDni: string;
    estado: string;
    ciudad: string;
    direccion: string;
    nombres: string;
    apellidos: string;
    razosoci: string;
    tipo: string;
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


    constructor(private api: ApisService, private router: Router, private messageService: MessageService) {
        console.log('Obteniendo data...');
        if (this.router.getCurrentNavigation().extras.state != null) {
            console.log('EDITAR..');
            this.client_ = JSON.parse(this.router.getCurrentNavigation().extras.state.user);
            console.log(this.client_);
            this.edit = true;
        } else {
            console.log('CREATE');
            this.edit = false;
        }
        this.inicializateValores();
    }

    ngOnInit(): void {

    }

    save() {
        console.log('[Guardando el usuario]');
        console.log(this.client);
        this.api.addclient(this.client, localStorage.getItem("token")).then(data => {
            console.log("Guardar cliente");
            if (data.headerApp.code === 200) {
                this.router.navigate(['clientes']);
                this.inicializateValores();
            }
            console.log(data);

        }).catch(err => {
            console.log(err);
            if(err.error.code==401){
                localStorage.clear();
                this.router.navigate(['/login']);
            }
        })

    }

    cancelar() {
        this.router.navigate(['clientes']);
    }

    selecttipo(event) {
        this.client.tipo = event.value.code;
    }

    inicializateValores() {
        this.client = {
            entiId: this.client_ != null ? this.client_['id'] : "",
            entiDni: this.client_ != null ? this.client_['identification'] : "",
            estado: this.client_ != null ? this.client_['status'] ? "A" : "I" : "A",
            ciudad: this.client_ != null ? this.client_['city'] : "",
            direccion: this.client_ != null ? this.client_['direction'] : "",
            nombres: this.client_ != null ? this.client_['name'] : "",
            apellidos: this.client_ != null ? this.client_['lastname'] : "",
            razosoci: this.client_ != null ? this.client_['razosoci'] : "",
            tipo: this.client_ != null ? this.client_['tipo'] : "",
            email: this.client_ != null ? this.client_['email'] : "",
            phone: this.client_ != null ? this.client_['phone'] : "",
            tipoenti: "C"
        };
        this.options = [{ label: 'Activo', value: 'A' }, { label: 'Inactivo', value: 'I' }];
        this.tipos = [
            { name: 'Persona Natural', code: 'N' },
            { name: 'Persona Jurídica', code: 'J' }
        ];

        /*if (this.client_ != null) {
            this.validateSelect(this.client.tipo);
        }*/
    }

    modificar() {
        this.blockedPanel = true;
        this.messageService.clear();
        this.messageService.add({ key: 'c', sticky: true, severity: 'warn', summary: 'Are you sure?', detail: 'Confirm to proceed' });
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

}
