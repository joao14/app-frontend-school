import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ApisService } from 'src/services/apis.service';
import { Router } from '@angular/router';
import { flower } from 'src/models/flower';
import { UtilService } from 'src/services/util.service';
import { user } from 'src/models/user';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    providers: [TranslateService]
})
export class DashboardComponent implements OnInit {

    state: boolean;
    user: user;
    clientes: number = 0;
    courses: number = 0;

    constructor(private api: ApisService, private router: Router, private utilservice: UtilService) {
        this.utilservice.isLoading.subscribe(state => {
            this.state = state;
        })
    }

    async ngOnInit() {
        await this.getClients()
        await this.getCourses()
    }

    async getClients() {
        this.utilservice.isLoading.next(true);
        await this.api.getusuarios(localStorage.getItem("token")).then(async data => {
            this.clientes = data.length;  
            this.utilservice.isLoading.next(false);
        }).catch(error => {
            this.utilservice.isLoading.next(false);
        })
    }

    async getCourses() {
        this.utilservice.isLoading.next(true);
        await this.api.getcourses(localStorage.getItem("token")).then(async data => {
            this.courses = data.length;
            this.utilservice.isLoading.next(false);
        }).catch(error => {
            this.utilservice.isLoading.next(false);
        })
    }

    getFormatDate(date: Date): string {
        return (moment(date)).format('MM');
    }


}
