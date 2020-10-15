import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ApisService } from 'src/services/apis.service';
import { Router } from '@angular/router';

export interface Languajes {
    name: string;
    code: string;
}

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    providers: [TranslateService]
})
export class DashboardComponent implements OnInit {

    clientes: number;
    fincas: number;
    flores: number;

    constructor(private api: ApisService, private router: Router) { }

    ngOnInit(): void {
        this.api.getclients(localStorage.getItem("token")).then(cliente => {
            if (cliente.headerApp.code === 200) {
                this.clientes = cliente.data.clientes.length;
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
                this.fincas = finca.data.farms.length;
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
                this.flores = flor.data.flowers.length;
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
