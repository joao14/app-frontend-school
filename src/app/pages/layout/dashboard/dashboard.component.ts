import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ApisService } from 'src/services/apis.service';
import { Router } from '@angular/router';
import { flower } from 'src/models/flower';
import { UtilService } from 'src/services/util.service';
import { user } from 'src/models/user';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';

export interface Languajes {
    name: string;
    code: string;
}

export interface Sales {
    datasets: Array<{
        backgroundColor: string;
        borderColor: string;
        label: string;
        data: number[]
    }>,
    labels: Array<String>
}

export class Graphics {
    //anual_month_sales: Sales;
    anual_sales: Sales;
    count_ent: {
        C: number;
        E: number;
        F: number;
        Z: number;
        FL: number;
    };
    count_inv: {
        FACTS_SUM_T: number;
        FACTS_T: number;
        DEBITO: number;
        CREDITO: number;
        PORC_DEBITO: number;
        POR_CREDITO: number;
    };
    count_pal: number;
    count_trx: {
        TRX_CNT_CL: number;
        TRX_CNT_DB: number;
        TRX_CNT_IN: number;
        TRX_CNT_PA: number;
        TRX_SUM_CL: number;
        TRX_SUM_DB: number;
        TRX_SUM_IN: number;
        TRX_SUM_PA: number;
    };
    day_week_month_sales: {
        labels: string[],
        datasets: Array<{ label: string; backgroundColor: string; borderColor: string; data: string }>
    }
    week_month_sales: {
        labels: string[],
        datasets: Array<{ label: string; backgroundColor: string; borderColor: string; data: string }>
    }
    number_transactions: {
        labels: string[];
        datasets: [
            {
                data: number[],
                backgroundColor: string[],
                hoverBackgroundColor: string[]
            }]
    };
    ammount_transactions: {
        labels: string[];
        datasets: [
            {
                data: number[],
                backgroundColor: string[],
                hoverBackgroundColor: string[]
            }]
    };
    anual_month_sales: {
        labels: string[];
        datasets: Array<
            {
                label: string;
                data: number[];
                fill: boolean;
                borderColor: string;
            }>
    };
    salesbyclient: Array<{
        name: string;
        values: number;
        porcentaje: number;
        estado: boolean;
    }>;

    sales_anual_year: {
        labels: string[],
        datasets: Array<{ label: string; backgroundColor: string; borderColor: string; data: string }>
    };

    prealerts: {
        pralId: number;
        fecha: string;
        pdf: string;
        detalle: Array<{
            cm: string;
            farm: string;
            pvp: string;
            pcomp: string;
            status: string;
            flower: string;
        }>
    }
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
    user: user;
    graphics: Graphics;
    state: boolean;
    actuallydate: Date;
    percentage: number;
    nameMonth: string;
    dialogVisiblePDF: boolean;

    constructor(private api: ApisService, private router: Router, private utilservice: UtilService) {
        this.utilservice.isLoading.subscribe(state => {
            this.state = state;
        })
    }

    async ngOnInit() {
        let date = new Date();
        this.percentage = (100 * date.getHours()) / 24;
        this.user = JSON.parse(localStorage.getItem('user'));
        this.nameMonth = this.getFormatDate(new Date());
        this.dialogVisiblePDF = false;
        this.switchtyperol();
    }

    async switchtyperol() {
        if (!this.user) {
            this.router.navigate(["/login"]);
            return;
        }
        switch (this.user.roles[0].shorcut) {
            case "ADM":
                await this.getRosaMistica();
                break;
            case "CLI":
                await this.getClientRosaMistica();
                break;
            case "COM":
                await this.getRosaMistica();
                break;
            case "FAC":
                await this.getRosaMistica();
                break;
            default:
                console.error('El rol seleccionado es equivocado o no tiene permisos sobre el mismo');
                break;
        }
    }

    async getRosaMistica() {
        this.actuallydate = new Date();
        this.graphics = null;
        this.utilservice.isLoading.next(true);
        await this.api.getcharts(localStorage.getItem('token')).then(data => {            
            this.graphics = new Graphics();
            if (data.headerApp.code == 200) {
                //Transactions
                this.graphics.count_ent = data.data.count_ent;
                this.graphics.count_ent.FL = data.data.count_flower
                this.graphics.number_transactions = {
                    labels: ['Claim', 'Debit', 'Invoices', 'Payment'],
                    datasets: [
                        {
                            data: [data.data.count_trx.TRX_CNT_CL, data.data.count_trx.TRX_CNT_DB, data.data.count_trx.TRX_CNT_IN, data.data.count_trx.TRX_CNT_PA],
                            backgroundColor: [
                                "#FF6384",
                                "#36A2EB",
                                "#7DC931",
                                "#FFCE56"
                            ],
                            hoverBackgroundColor: [
                                "#FF6384",
                                "#36A2EB",
                                "#7DC931",
                                "#FFCE56"
                            ]
                        }]
                },
                    this.graphics.ammount_transactions = {
                        labels: ['Claim', 'Debit', 'Invoices', 'Payment'],
                        datasets: [
                            {
                                data: [data.data.count_trx.TRX_SUM_CL, data.data.count_trx.TRX_SUM_DB, data.data.count_trx.TRX_SUM_IN, data.data.count_trx.TRX_SUM_PA],
                                backgroundColor: [
                                    "#FF6384",
                                    "#36A2EB",
                                    "#7DC931",
                                    "#FFCE56"
                                ],
                                hoverBackgroundColor: [
                                    "#FF6384",
                                    "#36A2EB",
                                    "#7DC931",
                                    "#FFCE56"
                                ]
                            }]
                    }

                //sales per month of year
                if (data.data.anual_month_sales != null) {
                    this.graphics.anual_month_sales = {
                        labels: [data.data.anual_month_sales.labels[0], data.data.anual_month_sales.labels[1], data.data.anual_month_sales.labels[2]],
                        datasets: [
                            {
                                label: data.data.anual_month_sales.datasets[0].label,
                                data: [
                                    data.data.anual_month_sales.datasets[0].data[0],
                                    data.data.anual_month_sales.datasets[0].data[1],
                                    data.data.anual_month_sales.datasets[0].data[2]
                                ],
                                fill: false,
                                borderColor: data.data.anual_month_sales.datasets[0].borderColor
                            }
                        ]
                    }
                }


                this.graphics.count_inv = {
                    FACTS_SUM_T: data.data.count_inv.FACTS_SUM_T,
                    FACTS_T: data.data.count_inv.FACTS_T,
                    DEBITO: data.data.count_trx.TRX_SUM_DB + data.data.count_trx.TRX_SUM_IN,
                    CREDITO: data.data.count_trx.TRX_SUM_PA + data.data.count_trx.TRX_SUM_CL,
                    PORC_DEBITO: ((data.data.count_trx.TRX_SUM_DB + data.data.count_trx.TRX_SUM_IN) - (data.data.count_trx.TRX_SUM_PA + data.data.count_trx.TRX_SUM_CL)) * (100 / (data.data.count_trx.TRX_SUM_DB + data.data.count_trx.TRX_SUM_IN)),
                    POR_CREDITO: (data.data.count_trx.TRX_SUM_PA + data.data.count_trx.TRX_SUM_CL) * (100 / (data.data.count_trx.TRX_SUM_DB + data.data.count_trx.TRX_SUM_IN))
                }

                //Sales per year
                let temp: Array<{ label: string; backgroundColor: string; borderColor: string; data: string }> = [];
                if (data.data.anual_sales != null) {
                    data.data.anual_sales.datasets.forEach(data => {
                        temp.push({
                            label: data.label,
                            backgroundColor: data.backgroundColor,
                            borderColor: data.borderColor,
                            data: data.data
                        })
                    });

                    this.graphics.sales_anual_year = {
                        labels: data.data.anual_sales.labels,
                        datasets: temp
                    }
                }


                //Sales per day of client
                let tempsalesbyclient: Array<{ name: string; values: number; porcentaje: number; estado: boolean; }> = [];
                if (data.data.current_day_sales_by_clients != null) {

                    let total = data.data.current_day_sales_by_clients.total_sale;
                    data.data.current_day_sales_by_clients.data_unified.forEach(data => {
                        tempsalesbyclient.push({
                            name: data.name,
                            values: data.value,
                            porcentaje: (data.value * 100) / total,
                            estado: ((data.value * 100) / total) > 50 ? true : false
                        })
                    });

                    this.graphics.salesbyclient = tempsalesbyclient;
                }

                //Sales per day this week of months
                let temp_day_week_month_sales: Array<{ label: string; backgroundColor: string; borderColor: string; data: string }> = [];
                if (data.data.day_week_month_sales != null) {
                    data.data.day_week_month_sales.datasets.forEach(data => {
                        temp_day_week_month_sales.push({
                            label: data.label,
                            backgroundColor: data.backgroundColor,
                            borderColor: data.borderColor,
                            data: data.data
                        })
                    });

                    this.graphics.day_week_month_sales = {
                        labels: data.data.day_week_month_sales.labels,
                        datasets: temp_day_week_month_sales
                    }
                }


                //Sales per week of months
                let temp_week_month_sales: Array<{ label: string; backgroundColor: string; borderColor: string; data: string }> = [];
                if (data.data.week_month_sales != null) {
                    data.data.week_month_sales.datasets.forEach(data => {
                        temp_week_month_sales.push({
                            label: data.label,
                            backgroundColor: data.backgroundColor,
                            borderColor: data.borderColor,
                            data: data.data
                        })
                    });

                    this.graphics.week_month_sales = {
                        labels: data.data.week_month_sales.labels,
                        datasets: temp_week_month_sales
                    }
                }

            }
        }).catch(err => {
            if (err.error.code == 401) {
                localStorage.clear();
                this.router.navigate(['/login']);
            }
        })
        this.utilservice.isLoading.next(false);
    }

    async getClientRosaMistica() {
        this.actuallydate = new Date();
        this.graphics = null;
        this.utilservice.isLoading.next(true);
        await this.api.getchartsbyclient(this.user.empresa.entiid, localStorage.getItem('token')).then(data => {
       
            this.graphics = new Graphics();
            if (data.headerApp.code == 200) {
                //Transactions
                this.graphics.count_ent = data.data.count_ent;

                this.graphics.count_trx = {
                    TRX_CNT_CL: data.data.count_trx.TRX_CNT_CL,
                    TRX_CNT_DB: data.data.count_trx.TRX_CNT_DB,
                    TRX_CNT_IN: data.data.count_trx.TRX_CNT_IN,
                    TRX_CNT_PA: data.data.count_trx.TRX_CNT_PA,
                    TRX_SUM_CL: data.data.count_trx.TRX_SUM_CL,
                    TRX_SUM_DB: data.data.count_trx.TRX_SUM_DB,
                    TRX_SUM_IN: data.data.count_trx.TRX_SUM_IN,
                    TRX_SUM_PA: data.data.count_trx.TRX_SUM_PA
                }

                this.graphics.ammount_transactions = {
                    labels: ['Claim', 'Debit', 'Invoices', 'Payment'],
                    datasets: [
                        {
                            data: [data.data.count_trx.TRX_SUM_CL, data.data.count_trx.TRX_SUM_DB, data.data.count_trx.TRX_SUM_IN, data.data.count_trx.TRX_SUM_PA],
                            backgroundColor: [
                                "#FF6384",
                                "#36A2EB",
                                "#7DC931",
                                "#FFCE56"
                            ],
                            hoverBackgroundColor: [
                                "#FF6384",
                                "#36A2EB",
                                "#7DC931",
                                "#FFCE56"
                            ]
                        }]
                }

                //sales per month of year
                if (data.data.anual_month_sales != null) {
                    this.graphics.anual_month_sales = {
                        labels: [data.data.anual_month_sales.labels[0], data.data.anual_month_sales.labels[1], data.data.anual_month_sales.labels[2]],
                        datasets: [
                            {
                                label: data.data.anual_month_sales.datasets[0].label,
                                data: [
                                    data.data.anual_month_sales.datasets[0].data[0],
                                    data.data.anual_month_sales.datasets[0].data[1],
                                    data.data.anual_month_sales.datasets[0].data[2]
                                ],
                                fill: false,
                                borderColor: data.data.anual_month_sales.datasets[0].borderColor
                            }
                        ]
                    }

                }

                this.graphics.count_inv = {
                    FACTS_SUM_T: data.data.count_inv.FACTS_SUM_T,
                    FACTS_T: data.data.count_inv.FACTS_T,
                    DEBITO: data.data.count_trx.TRX_SUM_DB + data.data.count_trx.TRX_SUM_IN,
                    CREDITO: data.data.count_trx.TRX_SUM_PA + data.data.count_trx.TRX_SUM_CL,
                    PORC_DEBITO: ((data.data.count_trx.TRX_SUM_DB + data.data.count_trx.TRX_SUM_IN) -
                        (data.data.count_trx.TRX_SUM_PA + data.data.count_trx.TRX_SUM_CL)) * (100 / (data.data.count_trx.TRX_SUM_DB + data.data.count_trx.TRX_SUM_IN)),
                    POR_CREDITO: (data.data.count_trx.TRX_SUM_PA + data.data.count_trx.TRX_SUM_CL) * (100 / (data.data.count_trx.TRX_SUM_DB + data.data.count_trx.TRX_SUM_IN))
                }

                //Sales per year
                let temp: Array<{ label: string; backgroundColor: string; borderColor: string; data: string }> = [];
                if (data.data.anual_sales != null) {
                    data.data.anual_sales.datasets.forEach(data => {
                        temp.push({
                            label: data.label,
                            backgroundColor: data.backgroundColor,
                            borderColor: data.borderColor,
                            data: data.data
                        })
                    });

                    this.graphics.sales_anual_year = {
                        labels: data.data.anual_sales.labels,
                        datasets: temp
                    }
                }

                //Sales per day of client
                let tempsalesbyclient: Array<{ name: string; values: number; porcentaje: number; estado: boolean; }> = [];
                if (data.data.current_day_sales_by_clients != null) {
                    let total = data.data.current_day_sales_by_clients.total_sale;
                    data.data.current_day_sales_by_clients.data_unified.forEach(data => {
                        tempsalesbyclient.push({
                            name: data.name,
                            values: data.value,
                            porcentaje: (data.value * 100) / total,
                            estado: ((data.value * 100) / total) > 50 ? true : false
                        })
                    });
                }
                this.graphics.salesbyclient = tempsalesbyclient;

                //Sales per day this week of months
                let temp_day_week_month_sales: Array<{ label: string; backgroundColor: string; borderColor: string; data: string }> = [];
                if (data.data.day_week_month_sales != null) {
                    data.data.day_week_month_sales.datasets.forEach(data => {
                        temp_day_week_month_sales.push({
                            label: data.label,
                            backgroundColor: data.backgroundColor,
                            borderColor: data.borderColor,
                            data: data.data
                        })
                    });

                    this.graphics.day_week_month_sales = {
                        labels: data.data.day_week_month_sales.labels,
                        datasets: temp_day_week_month_sales
                    }
                }


                //Sales per week of months
                let temp_week_month_sales: Array<{ label: string; backgroundColor: string; borderColor: string; data: string }> = [];
                if (data.data.week_month_sales != null) {
                    data.data.week_month_sales.datasets.forEach(data => {
                        temp_week_month_sales.push({
                            label: data.label,
                            backgroundColor: data.backgroundColor,
                            borderColor: data.borderColor,
                            data: data.data
                        })
                    });

                    this.graphics.week_month_sales = {
                        labels: data.data.week_month_sales.labels,
                        datasets: temp_week_month_sales
                    }
                }

                if (data.data.prealert != null) {
                    let detalle: Array<{ cm: string; farm: string; pvp: string; pcomp: string; status: string; flower: string; }> = [];
                    data.data.prealert.detalle.forEach(element => {
                        detalle.push({
                            cm: element.cm,
                            farm: element.farm,
                            pvp: element.pvp,
                            pcomp: element.pcomp,
                            status: element.status,
                            flower: element.flower
                        })
                    });
                    this.graphics.prealerts = {
                        pralId: data.data.prealert.pralId,
                        fecha: data.data.prealert.fecha,
                        pdf: environment.url + data.data.prealert.pdf,
                        detalle: detalle
                    }

                }

            }
        }).catch(err => {
            if (err.error.code == 401) {
                localStorage.clear();
                this.router.navigate(['/login']);
            }
        })
        this.utilservice.isLoading.next(false);
    }

    viewprealert() {
        this.dialogVisiblePDF = true;
    }

    getFormatDate(date: Date): string {
        return (moment(date)).format('MM');
    }


}
