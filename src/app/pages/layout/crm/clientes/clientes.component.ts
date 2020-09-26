import { SelectItem } from 'primeng/primeng';
import { Router } from '@angular/router';
import { ApisService } from './../../../../../services/apis.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';

export interface User {
    id: string;
    identification: string;
    name: string;
    lastname: string;
    phone: string;
    direction: string;
    city: string;
    photo: string;
    email: string;
    status: boolean;
    razosoci: string;
    tipo: string;
}

@Component({
    selector: 'app-clientes',
    templateUrl: './clientes.component.html',
    styleUrls: ['./clientes.component.css'],
    providers: [TranslateService, MessageService],
})
export class ClientesComponent implements OnInit {

    users: Array<User> = [];
    selectedUsers: Array<User> = [];
    flag: boolean = true;
    loading: boolean;
    options: SelectItem[];
    selectoptions: any;

    constructor(private api: ApisService, private router: Router) { }

    ngOnInit(): void {
        this.options = [{ label: 'Todos', value: null }, { label: 'Activo', value: 'A' }, { label: 'Inactivo', value: 'I' }];
        this.api.getclients(localStorage.getItem('token')).then(users => {
            console.log('Data');
            console.log(users);
            if (users.headerApp.code === 200) {
                users.data.clientes.forEach(element => {
                    let userTemp = {
                        id: element.entiId,
                        identification: element.entiDni,
                        name: element.nombres,
                        lastname: element.apellidos,
                        phone: element.phone,
                        direction: element.direccion,
                        city: element.ciudad,
                        photo: 'https://icons-for-free.com/iconfiles/png/512/business+costume+male+man+office+user+icon-1320196264882354682.png',
                        email: element.email,
                        status: element.estado === 'A' ? true : false,
                        razosoci: element.razosoci,
                        tipo: element.tipo
                    }
                    this.users.push(userTemp);
                });
                console.log('LISTA DE USUARIOS');
                console.log(this.users);

            }
        }).catch(error => {
            console.log('Error consulta de usuarios');
            console.log(error);
        })


        this.loading = false;
    }

    addClient() {
        console.log('Editando el cliente');
        this.router.navigate(['/edit']);
    }

    desactivate(user: User) {
        console.log('Se esta desactivando ek usuario');
        console.log(user);
        this.router.navigate(['/edit'], { state: { user: JSON.stringify(user) } });
    }

    onRepresentativeChange(event) {
        console.log('Se selecciono otro evento');
        console.log(event);
        console.log(event.value);
        console.log(this.users);
        this.users = [];
        this.api.getclients(localStorage.getItem('token')).then(users => {
            if (users.headerApp.code === 200) {
                users.data.clientes.forEach(element => {
                    if (event.value == null) {
                        let userTemp = {
                            id: element.entiId,
                            identification: element.entiDni,
                            name: element.nombres,
                            lastname: element.apellidos,
                            phone: element.phone,
                            direction: element.direccion,
                            city: element.ciudad,
                            photo: 'https://icons-for-free.com/iconfiles/png/512/business+costume+male+man+office+user+icon-1320196264882354682.png',
                            email: element.email,
                            status: element.estado === 'A' ? true : false,
                            razosoci: element.razosoci,
                            tipo: element.tipo
                        }
                        this.users.push(userTemp);
                    } else
                        if (element.estado === event.value) {
                            let userTemp = {
                                id: element.entiId,
                                identification: element.entiDni,
                                name: element.nombres,
                                lastname: element.apellidos,
                                phone: element.phone,
                                direction: element.direccion,
                                city: element.ciudad,
                                photo: 'https://icons-for-free.com/iconfiles/png/512/business+costume+male+man+office+user+icon-1320196264882354682.png',
                                email: element.email,
                                status: element.estado === 'A' ? true : false,
                                razosoci: element.razosoci,
                                tipo: element.tipo
                            }
                            this.users.push(userTemp);
                        }
                });
                console.log('LISTA DE USUARIOS');
                console.log(this.users);

            }
        }).catch(err => {
            console.log('consultando los errores');
            console.log(err);

        })

    }

}
