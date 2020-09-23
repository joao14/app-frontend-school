import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { FilterMetadata } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
export interface User {
    identification: string;
    name: string;
    lastname: string;
    photo: string;
    email: string;
    status: boolean;
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

    constructor() { }

    ngOnInit(): void {
        this.users = [
            {
                identification: '1720009057',
                name: 'Alexander',
                lastname: 'Merino',
                photo: 'https://icons-for-free.com/iconfiles/png/512/business+costume+male+man+office+user+icon-1320196264882354682.png',
                email: 'alexmerino67@gmail.com',
                status: true
            },
            {
                identification: '1720009056',
                name: 'Joao',
                lastname: 'Romero',
                photo: 'https://icons-for-free.com/iconfiles/png/512/business+costume+male+man+office+user+icon-1320196264882354682.png',
                email: 'alexmer895@gmail.com',
                status: false
            },
            {
                identification: '1720009053',
                name: 'Cristiano',
                lastname: 'Ronaldo',
                photo: 'https://icons-for-free.com/iconfiles/png/512/business+costume+male+man+office+user+icon-1320196264882354682.png',
                email: 'alexmer895@gmail.com',
                status: false
            },
            {
                identification: '1726609056',
                name: 'Leonel',
                lastname: 'Messi',
                photo: 'https://icons-for-free.com/iconfiles/png/512/business+costume+male+man+office+user+icon-1320196264882354682.png',
                email: 'alexmer895@gmail.com',
                status: false
            },
            {
                identification: '1720119056',
                name: 'Juan',
                lastname: 'Mata',
                photo: 'https://icons-for-free.com/iconfiles/png/512/business+costume+male+man+office+user+icon-1320196264882354682.png',
                email: 'alexmer895@gmail.com',
                status: false
            },
            {
                identification: '172089056',
                name: 'Maricicio',
                lastname: 'Isla',
                photo: 'https://icons-for-free.com/iconfiles/png/512/business+costume+male+man+office+user+icon-1320196264882354682.png',
                email: 'alexmer895@gmail.com',
                status: false
            },
            {
                identification: '1420009056',
                name: 'Abriñ',
                lastname: 'Sendero',
                photo: 'https://icons-for-free.com/iconfiles/png/512/business+costume+male+man+office+user+icon-1320196264882354682.png',
                email: 'alexmer895@gmail.com',
                status: false
            },
            {
                identification: '1120009056',
                name: 'Paulina',
                lastname: 'Tamayo',
                photo: 'https://icons-for-free.com/iconfiles/png/512/business+costume+male+man+office+user+icon-1320196264882354682.png',
                email: 'alexmer895@gmail.com',
                status: false
            },
            {
                identification: '1350009056',
                name: 'Sabrina',
                lastname: 'Gutierrez',
                photo: 'https://icons-for-free.com/iconfiles/png/512/business+costume+male+man+office+user+icon-1320196264882354682.png',
                email: 'alexmer895@gmail.com',
                status: false
            },
            {
                identification: '1330009056',
                name: 'Priscila',
                lastname: 'Arreaga',
                photo: 'https://icons-for-free.com/iconfiles/png/512/business+costume+male+man+office+user+icon-1320196264882354682.png',
                email: 'alexmer895@gmail.com',
                status: false
            },
            {
                identification: '1100009056',
                name: ' Luis',
                lastname: 'Morantes',
                photo: 'https://icons-for-free.com/iconfiles/png/512/business+costume+male+man+office+user+icon-1320196264882354682.png',
                email: 'alexmer895@gmail.com',
                status: false
            },
            {
                identification: '1770009056',
                name: 'Carlos ',
                lastname: 'Villaran',
                photo: 'https://icons-for-free.com/iconfiles/png/512/business+costume+male+man+office+user+icon-1320196264882354682.png',
                email: 'alexmer895@gmail.com',
                status: false
            }
        ]

        this.loading = false;
    }

}
