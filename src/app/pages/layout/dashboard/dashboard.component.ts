import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ApisService } from 'src/services/apis.service';
import { Router } from '@angular/router';
import { flower } from 'src/models/flower';
import { UtilService } from 'src/services/util.service';

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
    deliveries: number;
    listaflores: Array<flower> = [];

    constructor(private api: ApisService, private router: Router, private utilservice: UtilService) { }

    ngOnInit(): void {
        this.utilservice.isLoading.next(true);
        this.api.getclients(localStorage.getItem("token")).then(cliente => {
            if (cliente.headerApp.code === 200) {
                this.clientes = cliente.data.clientes.length;
            }
            this.utilservice.isLoading.next(false);
        }).catch(err => {
            console.log(err);
            if (err.error.code == 401) {
                localStorage.clear();
                this.router.navigate(['/login']);
            }
        })
        this.utilservice.isLoading.next(true);
        this.api.getfinca(localStorage.getItem("token")).then(finca => {
            if (finca.headerApp.code === 200) {
                this.fincas = finca.data.farms.length;
            }
            this.utilservice.isLoading.next(false);
        }).catch(err => {
            console.log(err);
            if (err.error.code == 401) {
                localStorage.clear();
                this.router.navigate(['/login']);
            }
        })

        this.utilservice.isLoading.next(true);
        this.api.getdeliveries(localStorage.getItem("token")).then(delivery => {
            if (delivery.headerApp.code === 200) {
                this.deliveries = delivery.data.cargocompanies.length;
            }
            this.utilservice.isLoading.next(false);
        }).catch(err => {
            console.log(err);
            if (err.error.code == 401) {
                localStorage.clear();
                this.router.navigate(['/login']);
            }
        })
        this.utilservice.isLoading.next(true);
        this.api.getflowers(localStorage.getItem("token")).then(flor => {            
            if (flor.headerApp.code === 200) {
                this.flores = flor.data.flowers.length;
                flor.data.flowers.forEach(element => {
                    let images = ['https://c.pxhere.com/photos/55/4e/red_flower_red_flower_rose_macro_bloom-1370874.jpg!d',
                        'https://i.pinimg.com/originals/b6/93/86/b69386593df381cfc0b10831a22f0102.jpg',
                        'https://i.pinimg.com/originals/03/3e/70/033e706ea5af0ec6c32f938bf5794e47.jpg',
                        'https://www.jardineriaon.com/wp-content/uploads/2015/07/flor.jpg',
                        'https://image.freepik.com/foto-gratis/flor-blanca-planta-flor-tropical_33755-6252.jpg',
                        'https://i.pinimg.com/736x/cc/ef/61/ccef61c496ad39f3a85373e9988cf256.jpg']
                    let flower = {
                        id: element.florId,
                        name: element.nombre,
                        state: element.estado,
                        images: images
                    }
                    this.listaflores.push(flower);
                });

                console.log(this.listaflores);
            }
            this.utilservice.isLoading.next(false);

        }).catch(err => {
            console.log(err);
            if (err.error.code == 401) {
                localStorage.clear();
                this.router.navigate(['/login']);
            }
        })
    }


}
