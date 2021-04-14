import { Injectable } from "@angular/core";
import { BehaviorSubject, throwError, Observable } from "rxjs";
import { retry, catchError } from "rxjs/operators";
import { environment } from "src/environments/environment";
import {
    HttpClient,
    HttpHeaders,
    HttpErrorResponse,
} from "@angular/common/http";
export class AuthInfo {
    constructor(public $uid: string) { }

    isLoggedIn() {
        return !!this.$uid;
    }
}

@Injectable({
    providedIn: "root",
})
export class ApisService {
    static UNKNOWN_USER = new AuthInfo(null);

    public authInfo$: BehaviorSubject<AuthInfo> = new BehaviorSubject<AuthInfo>(
        ApisService.UNKNOWN_USER
    );
    constructor(
        private http: HttpClient
    ) { }

    /** Http Options */
    httpOptions = {
        headers: new HttpHeaders({
            "Content-Type": "application/json",
        }),
    };

    /** Captura de errores */
    handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error("An error occurred:", error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` + `body was: ${error.error}`
            );
        }
        // return an observable with a user-facing error message
        return throwError("Something bad happened; please try again later.");
    }


    public login(email: string, password: string): Promise<any> {
        let credential = {
            user: email,
            pass: password,
        };;
        return this.http
            .post<any>(
                environment.login,
                JSON.stringify(credential),
                this.httpOptions
            )
            .pipe(retry(2), catchError(this.handleError)).toPromise();
    }

    public resetpassword(email: string, token: string): Promise<any> {
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.get<any>(environment.resetpassword + email, opt).toPromise().then(email => {
                resolve(email);
            }).catch(error => {
                reject(error);
            })
        });
    }

    public getUsers(token: string): Promise<any> {
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.get<any>(environment.users, opt).toPromise().then(users => {
                resolve(users);
            }).catch(error => {
                reject(error);
            })
        });
    }

    public addUser(user: any, token: string): Promise<any> {
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.post<any>(environment.adduser, user, opt).toPromise().then(users => {
                resolve(users);
            }).catch(error => {
                reject(error);
            })
        });
    }

    public updateUser(user: any, token: string): Promise<any> {
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.put<any>(environment.updateuser, user, opt).toPromise().then(users => {
                resolve(users);
            }).catch(error => {
                reject(error);
            })
        });
    }

    public getRoles(token: string): Promise<any> {
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.get<any>(environment.roles, opt).toPromise().then(roles => {
                resolve(roles);
            }).catch(error => {
                reject(error);
            })
        });

    }

    public addRolesByUser(rol: any, token: string): Promise<any> {
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.post<any>(environment.rolesbyuser, rol, opt).toPromise().then(roles => {
                resolve(roles);
            }).catch(error => {
                reject(error);
            })
        });

    }

    public removeRolesByUser(rol: any, token: string): Promise<any> {
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.post<any>(environment.removeroles, rol, opt).toPromise().then(roles => {
                resolve(roles);
            }).catch(error => {
                reject(error);
            })
        });

    }


    public getclients(token: string): Promise<any> {
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.get<any>(environment.client, opt).toPromise().then(users => {
                resolve(users);
            }).catch(error => {
                reject(error);
            })
        });

    }

    public addclient(client: any, token: string): Promise<any> {
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.post<any>(environment.addclient, client, opt).toPromise().then(users => {
                resolve(users);
            }).catch(error => {
                reject(error);
            })
        });
    }

    public updateclient(client: any, token: string): Promise<any> {
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.put<any>(environment.updateclient, client, opt).toPromise().then(users => {
                resolve(users);
            }).catch(error => {
                reject(error);
            })
        });
    }


    public getflowers(token: string): Promise<any> {
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.get<any>(environment.flowers, opt).toPromise().then(flowers => {
                resolve(flowers);
            }).catch(error => {
                reject(error);
            })
        });

    }

    public addflowers(flower: any, token: string): Promise<any> {
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.post<any>(environment.addflowers, flower, opt).toPromise().then(flower => {
                resolve(flower);
            }).catch(error => {
                reject(error);
            })
        });
    }

    public updateflower(flower: any, token: string): Promise<any> {
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.put<any>(environment.updateflowers, flower, opt).toPromise().then(flower => {
                resolve(flower);
            }).catch(error => {
                reject(error);
            })
        });
    }

    public getflowerbyname(name_: string, token: string): Promise<any> {
        let json = {
            name: name_
        }
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.post<any>(environment.searchflower, json, opt).toPromise().then(flowers => {
                resolve(flowers);
            }).catch(error => {
                reject(error);
            })
        });

    }

    public addResourcesflowers(flower: any, token: string): Promise<any> {
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.post<any>(environment.addresourcesflower, flower, opt).toPromise().then(flower => {
                resolve(flower);
            }).catch(error => {
                reject(error);
            })
        });
    }

    public removeResourcesflowers(idResource: number, token: string): Promise<any> {
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.post<any>(environment.removeresourcesflower + idResource, null, opt).toPromise().then(flower => {
                resolve(flower);
            }).catch(error => {
                reject(error);
            })
        });
    }


    public getfinca(token: string): Promise<any> {
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.get<any>(environment.finca, opt).toPromise().then(finca => {
                resolve(finca);
            }).catch(error => {
                reject(error);
            })
        });

    }

    public addfinca(finca: any, token: string): Promise<any> {
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.post<any>(environment.addfinca, finca, opt).toPromise().then(finca => {
                resolve(finca);
            }).catch(error => {
                reject(error);
            })
        });
    }

    public updatefinca(finca: any, token: string): Promise<any> {
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.put<any>(environment.updatefinca, finca, opt).toPromise().then(finca => {
                resolve(finca);
            }).catch(error => {
                reject(error);
            })
        });
    }

    public getdeliveries(token: string): Promise<any> {
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.get<any>(environment.empresaCargo, opt).toPromise().then(delivery => {
                resolve(delivery);
            }).catch(error => {
                reject(error);
            })
        });

    }

    public adddelivery(delivery: any, token: string): Promise<any> {
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.post<any>(environment.addempresaCargo, delivery, opt).toPromise().then(delivery => {
                resolve(delivery);
            }).catch(error => {
                reject(error);
            })
        });
    }

    public updatedelivery(delivery: any, token: string): Promise<any> {
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.put<any>(environment.updateempresaCargo, delivery, opt).toPromise().then(delivery => {
                resolve(delivery);
            }).catch(error => {
                reject(error);
            })
        });
    }

    async getmarks(idCliente: number, token: string): Promise<any> {
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.get<any>(environment.marcaciones + idCliente, opt).toPromise().then(mark => {
                resolve(mark);
            }).catch(error => {
                reject(error);
            })
        });

    }

    public addmark(mark: any, token: string): Promise<any> {
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.post<any>(environment.addmarcaciones, mark, opt).toPromise().then(mark => {
                resolve(mark);
            }).catch(error => {
                reject(error);
            })
        });
    }

    public updatemark(mark: any, token: string): Promise<any> {
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.put<any>(environment.updatemarcaciones, mark, opt).toPromise().then(mark => {
                resolve(mark);
            }).catch(error => {
                reject(error);
            })
        });
    }

    public registerInvoice(invoice: any, token: string): Promise<any> {
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.post<any>(environment.registerinvoice, invoice, opt).toPromise().then(invoice => {
                resolve(invoice);
            }).catch(error => {
                reject(error);
            })
        });
    }

    public registerInvoiceDraft(invoice: any, token: string): Promise<any> {
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.post<any>(environment.registerinvoicedraft, invoice, opt).toPromise().then(invoice => {
                resolve(invoice);
            }).catch(error => {
                reject(error);
            })
        });
    }


    public registerPaymentClaim(payment: any, token: string): Promise<any> {
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.post<any>(environment.registerpaymentandclaim, payment, opt).toPromise().then(invoice => {
                resolve(invoice);
            }).catch(error => {
                reject(error);
            })
        });
    }

    public registerPrealert(prealert: any, token: string): Promise<any> {
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.post<any>(environment.registerprealert, prealert, opt).toPromise().then(prealert => {
                resolve(prealert);
            }).catch(error => {
                reject(error);
            })
        });
    }

    public getObjectbyName(type: string, name: string, token: string): Promise<any> {
        let json = {
            name: name
        }
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.post<any>(environment.searchtype + type, json, opt).toPromise().then(invoice => {
                resolve(invoice);
            }).catch(error => {
                reject(error);
            })
        });
    }

    public getsales(dateIni: string, dateFin: string, token: string): Promise<any> {
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.get<any>(environment.getsales + dateIni + '/' + dateFin, opt).toPromise().then(sales => {
                resolve(sales);
            }).catch(error => {
                reject(error);
            })
        });

    }

    public getInvoicesbyClient(idClient: number, dateIni: string, dateFin: string, token: string): Promise<any> {
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.get<any>(environment.getinvoicesbyclient + idClient + '/' + dateIni + '/' + dateFin, opt).toPromise().then(sales => {
                resolve(sales);
            }).catch(error => {
                reject(error);
            })
        });

    }

    public getBalanceGeneralbyClient(idClient: number, dateIni: string, dateFin: string, token: string): Promise<any> {
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.get<any>(environment.getbalancegenral + idClient + '/' + dateIni + '/' + dateFin, opt).toPromise().then(sales => {
                resolve(sales);
            }).catch(error => {
                reject(error);
            })
        });

    }

    public getMarcbyName(idClient: number, name_: string, token: string): Promise<any> {
        let json = {
            name: name_
        }
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.post<any>(environment.getmarcsbyname + idClient, json, opt).toPromise().then(marc => {
                resolve(marc);
            }).catch(error => {
                reject(error);
            })
        });

    }

    public getPrealertActive(token: string): Promise<any> {
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.get<any>(environment.getprealertactive, opt).toPromise().then(prealert => {
                resolve(prealert);
            }).catch(error => {
                reject(error);
            })
        });

    }

    public getPrealertActivebyClient(idClient: number, token: string): Promise<any> {
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.get<any>(environment.getprealertactivebyClient + idClient, opt).toPromise().then(prealert => {
                resolve(prealert);
            }).catch(error => {
                reject(error);
            })
        });

    }


    public sendEmail(email: any, token: string): Promise<any> {
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.post<any>(environment.sendEmail, email, opt).toPromise().then(email => {
                resolve(email);
            }).catch(error => {
                reject(error);
            })
        });
    }

    public getinvoicesdraft(token: string): Promise<any> {
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.get<any>(environment.invoicesdrafts, opt).toPromise().then(invoice => {
                resolve(invoice);
            }).catch(error => {
                reject(error);
            })
        });

    }

    public getcharts(token: string): Promise<any> {
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.get<any>(environment.charts, opt).toPromise().then(invoice => {
                resolve(invoice);
            }).catch(error => {
                reject(error);
            })
        });

    }

    public getchartsbyclient(idClient: number, token: string): Promise<any> {
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.get<any>(environment.chartsbyclient + idClient, opt).toPromise().then(invoice => {
                resolve(invoice);
            }).catch(error => {
                reject(error);
            })
        });

    }

    public getprealertsdraft(token: string): Promise<any> {
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.get<any>(environment.prealertdrafts, opt).toPromise().then(prealert => {
                resolve(prealert);
            }).catch(error => {
                reject(error);
            })
        });

    }

    public generatePdfInvoiceDraft(invoices: any, token: string): Promise<any> {
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.post<any>(environment.viewdraft, invoices, opt).toPromise().then(invoice => {
                resolve(invoice);
            }).catch(error => {
                reject(error);
            })
        });

    }

    public getExcelPrealertDraft(prealert: any, token: string): Promise<any> {
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.post<any>(environment.getXlsPrealert, prealert, opt).toPromise().then(prealert => {
                resolve(prealert);
            }).catch(error => {
                reject(error);
            })
        });

    }

    public getstatusprealert(token: string): Promise<any> {
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.get<any>(environment.getstatusprealert, opt).toPromise().then(prealert => {
                resolve(prealert);
            }).catch(error => {
                reject(error);
            })
        });

    }

    public addstatusprealert(status: any, token: string): Promise<any> {
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.post<any>(environment.addstatusprealert, status, opt).toPromise().then(prealert => {
                resolve(prealert);
            }).catch(error => {
                reject(error);
            })
        });

    }

    public updatestatusprealert(status: any, token: string): Promise<any> {
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.put<any>(environment.updatestatusprealert, status, opt).toPromise().then(prealert => {
                resolve(prealert);
            }).catch(error => {
                reject(error);
            })
        });

    }

    public deletestatusprealert(status: any, token: string): Promise<any> {
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.put<any>(environment.deletestatusprealert, status, opt).toPromise().then(prealert => {
                resolve(prealert);
            }).catch(error => {
                reject(error);
            })
        });

    }

    public getTemplates(token: string): Promise<any> {
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.get<any>(environment.templates, opt).toPromise().then(template => {
                resolve(template);
            }).catch(error => {
                reject(error);
            })
        });

    }

    public addTemplateHead(headTemplate: any, token: string): Promise<any> {
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.post<any>(environment.addtemplateshead, headTemplate, opt).toPromise().then(template => {
                resolve(template);
            }).catch(error => {
                reject(error);
            })
        });

    }

    public addTemplateDetaill(detailTemplate: any, token: string): Promise<any> {
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.post<any>(environment.addtemplatesdetaill, detailTemplate, opt).toPromise().then(template => {
                resolve(template);
            }).catch(error => {
                reject(error);
            })
        });

    }


    public deleteTemplate(idTemplate: string, token: string): Promise<any> {
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.post<any>(environment.deletetemplate + idTemplate, null, opt).toPromise().then(template => {
                resolve(template);
            }).catch(error => {
                reject(error);
            })
        });

    }

    public deleteTemplateDetalle(idDetalle: string, token: string): Promise<any> {
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.post<any>(environment.deletetemplatedetalle + idDetalle, null, opt).toPromise().then(template => {
                resolve(template);
            }).catch(error => {
                reject(error);
            })
        });

    }


    public updateTemplateDetalle(detaill: any, token: string): Promise<any> {
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.put<any>(environment.updatetemplatedetalle, detaill, opt).toPromise().then(template => {
                resolve(template);
            }).catch(error => {
                reject(error);
            })
        });

    }

    public pedidos(token: string): Promise<any> {
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.get<any>(environment.pedidos, opt).toPromise().then(pedidos => {
                resolve(pedidos);
            }).catch(error => {
                reject(error);
            })
        });

    }

    public addpedido(pedido: any, token: string): Promise<any> {
        let opt = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            })
        }
        return new Promise<any>((resolve, reject) => {
            this.http.post<any>(environment.pedidoregister, pedido, opt).toPromise().then(pedido => {
                resolve(pedido);
            }).catch(error => {
                reject(error);
            })
        });
    }



    httpPost(url, body) {
        const header = {
            headers: new HttpHeaders()
                .set("Content-Type", "application/x-www-form-urlencoded")
            //.set("Authorization", `Bearer ${environment.stripe.sk}`),
        };
        const order = this.JSON_to_URLEncoded(body);
        return this.http.post(url, order, header);
    }

    httpGet(url) {
        const header = {
            headers: new HttpHeaders()
                .set("Content-Type", "application/x-www-form-urlencoded")
            //.set("Authorization", `Bearer ${environment.stripe.sk}`),
        };

        return this.http.get(url, header);
    }

    JSON_to_URLEncoded(element, key?, list?) {
        let new_list = list || [];
        if (typeof element == "object") {
            for (let idx in element) {
                this.JSON_to_URLEncoded(
                    element[idx],
                    key ? key + "[" + idx + "]" : idx,
                    new_list
                );
            }
        } else {
            new_list.push(key + "=" + encodeURIComponent(element));
        }
        return new_list.join("&");
    }
}
